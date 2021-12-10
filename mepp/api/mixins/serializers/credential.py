# coding: utf-8
import django.contrib.auth.password_validation as validators

from django.core import exceptions
from rest_framework import serializers

from mepp.api.models.user import User


class CredentialsMixin:

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        request = self.context.get('request', None)
        if request and getattr(request, 'method', None) == 'POST':
            fields['new_password'].required = False
        return fields

    def validate_email(self, email):
        user_email = None
        user_pk = None
        # Avoid a DB query if email has not been changed
        if self.instance:
            user_email = self.instance.email
            user_pk = self.instance.pk

        if email == user_email:
            return email

        if User.objects.filter(email=email).exclude(pk=user_pk).exists():
            raise serializers.ValidationError('E-mail address already in use')

        return email

    def validate_new_password(self, password):
        errors = []

        try:
            validators.validate_password(password=password)
            # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return password

    def update(self, instance, validated_data):
        generate_new_token = False
        try:
            new_password = validated_data['new_password']
        except KeyError:
            try:
                generate_new_token = validated_data['email'] != instance.email
            except KeyError:
                pass
        else:
            instance.set_password(new_password)
            instance.save()
            generate_new_token = True

        if generate_new_token:
            instance.generate_new_token()

        # Do not overwrite encoded password
        validated_data.pop('password', None)
        return super().update(instance, validated_data)
