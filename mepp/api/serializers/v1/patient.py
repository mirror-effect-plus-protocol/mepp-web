# coding: utf-8

# MEPP - A web application to guide patients and clinicians in the process of
# facial palsy rehabilitation, with the help of the mirror effect and principles
# of motor learning
# Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
#
# This file is part of MEPP.
#
# MEPP is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# MEPP is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with MEPP.  If not, see <http://www.gnu.org/licenses/>.

import jsonschema
from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.fields import empty
from rest_framework.reverse import reverse

from mepp.api.fields.uuid import HyperlinkedUUIDIdentityField
from mepp.api.helpers.mirror import default_settings
from mepp.api.mixins.serializers.clinician import ClinicianValidatorMixin
from mepp.api.mixins.serializers.credential import CredentialsMixin
from mepp.api.models.user import User
from mepp.api.serializers import HyperlinkedModelUUIDSerializer


class PatientSerializer(
    ClinicianValidatorMixin, CredentialsMixin, HyperlinkedModelUUIDSerializer
):

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
            'use_video_only',
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


class NestedPatientSerializer(PatientSerializer):

    class Meta:
        model = User
        fields = [
            'url',
            'full_name',
        ]


class PatientSettingsSerializer(CredentialsMixin, serializers.ModelSerializer):
    """
    This serializer should be only use to update user's settings.
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
                'mirror_settings': instance.mirror_settings,
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


class PatientMirrorSettingsSerializer(serializers.ModelSerializer):
    """
    This serializer should be only use to update user's mirror settings.
    Creation is not supported.
    """

    rotation = serializers.JSONField(write_only=True, required=True)
    position = serializers.JSONField(write_only=True, required=True)
    scale = serializers.JSONField(write_only=True, required=True)

    JSON_SCHEMA = {
        'type': 'object',
        'uniqueItems': True,
        'properties': {
            'x': {'type': 'number'},
            'y': {'type': 'number'},
            'z': {'type': 'number'},
        },
        'required': [
            'x',
            'y',
            'z',
        ],
        'additionalProperties': False,
    }

    class Meta:
        model = User
        fields = [
            'rotation',
            'position',
            'scale',
        ]

    def __init__(self, instance=None, data=empty, **kwargs):
        if instance is None:
            raise NotImplementedError('Model creation not supported')
        super().__init__(instance=instance, data=data, **kwargs)

    def to_representation(self, instance):
        return instance.mirror_settings

    def validate_position(self, value):
        self._validate_setting(value)
        return value

    def validate_rotation(self, value):
        self._validate_setting(value)
        return value

    def validate_scale(self, value):
        self._validate_setting(value)
        return value

    def validate(self, attrs):
        mirror_default_settings = default_settings()
        attrs['mirror_settings'] = (
            self.instance.mirror_settings or mirror_default_settings
        )
        position = attrs.pop('position', None) or attrs['mirror_settings']['position']
        rotation = attrs.pop('rotation', None) or attrs['mirror_settings']['rotation']
        scale = attrs.pop('scale', None) or attrs['mirror_settings']['scale']
        attrs['mirror_settings'] = {
            'position': position,
            'rotation': rotation,
            'scale': scale,
        }
        return attrs

    def _validate_setting(self, setting):
        try:
            jsonschema.validate(instance=setting, schema=self.JSON_SCHEMA)
        except jsonschema.exceptions.ValidationError:
            raise serializers.ValidationError(_(
                'Wrong format: expected {"x": <float>, "y": <float>, "z": <float>}'
            ))
