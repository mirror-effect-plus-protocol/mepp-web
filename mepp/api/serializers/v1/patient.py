# coding: utf-8
from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework.fields import empty

from mepp.api.fields.uuid import HyperlinkedUUIDIdentityField
from mepp.api.mixins.serializers.credential import CredentialsMixin
from mepp.api.models.user import User
from mepp.api.serializers import HyperlinkedModelUUIDSerializer


class PatientSerializer(CredentialsMixin, HyperlinkedModelUUIDSerializer):

    url = HyperlinkedUUIDIdentityField(
        lookup_field='uid',
        view_name='patient-detail'
    )
    sessions = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    clinician_uid = serializers.SerializerMethodField()
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id',
            'url',
            'sessions',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'use_audio',
            'side',
            'clinician_uid',
            'archived',
            'new_password',
            'language',
        ]

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        password = validated_data.pop('new_password')
        return User.objects.create_user(password=password, **validated_data)

    def get_clinician_uid(self, user):
        if user.clinician:
            return user.clinician.uid
        return None

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        request = self.context.get('request', None)
        if request and getattr(request, 'method', None) == 'POST':
            fields['new_password'].required = False
        return fields

    def get_full_name(self, user):
        return user.get_full_name()

    def get_sessions(self, user):
        request = self.context['request']
        return reverse('session-list', args=(user.uid,), request=request)

    def validate(self, attrs):
        self.validate_clinician_uid(attrs)
        return attrs

    def validate_clinician_uid(self, attrs):
        request = self.context['request']

        def _get_clinician_uid():
            try:
                return request.data['clinician_uid']
            except KeyError:
                return None

        clinician_uid = _get_clinician_uid()

        if request.user.is_superuser:
            if (
                self.instance
                and self.instance.pk is not None
                and not clinician_uid
            ):
                return attrs

            if not clinician_uid:
                raise serializers.ValidationError({
                    'clinician_uid': 'This field is required'
                })
            else:
                try:
                    clinician = User.objects.get(uid=clinician_uid, is_staff=True)
                except User.DoesNotExist:
                    raise serializers.ValidationError({
                        'clinician_uid': 'This user does not exist'
                    })

                attrs['clinician_id'] = clinician.pk
        else:
            if (
                clinician_uid
                and self.instance
                and self.instance.pk is not None
                and clinician_uid != self.instance.clinician.uid
            ):
                raise serializers.ValidationError({
                    'clinician_uid': 'Action forbidden'
                })
            else:
                if not self.instance or self.instance.pk is None:
                    attrs['clinician_id'] = request.user.pk

        return attrs


class NestedPatientSerializer(PatientSerializer):

    class Meta:
        model = User
        fields = [
            'url',
            'full_name',
        ]


class PatientSettingsSerializer(CredentialsMixin, serializers.ModelSerializer):
    """
    This serializer should be only use to update settings.
    Creation is not supported.
    """

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'email',
            'language',
            'password',
            'new_password',
        ]

    def __init__(self, instance=None, data=empty, **kwargs):
        if instance is None:
            raise NotImplementedError('Model creation not supported')
        super().__init__(instance=instance, data=data, **kwargs)

    def to_representation(self, instance):
        return {
            'token': instance.token,
            'profile': {
                'email': instance.email,
                'language': instance.language,
            }
        }

    def validate(self, attrs):
        fields = attrs.keys()
        secured_fields = ['email', 'new_password']
        if (
            [f for f in secured_fields if f in fields]
            and 'password' not in fields
        ):
            raise serializers.ValidationError(
                {'password': 'This field is required'}
            )
        return attrs

    def validate_password(self, password):
        if not self.instance.check_password(password):
            raise serializers.ValidationError('Invalid password')

        return password
