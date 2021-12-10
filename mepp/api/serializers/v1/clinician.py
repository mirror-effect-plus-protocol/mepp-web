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

from rest_framework import serializers

from mepp.api.fields.uuid import HyperlinkedUUIDIdentityField
from mepp.api.mixins.serializers.credential import CredentialsMixin
from mepp.api.models.user import User
from mepp.api.serializers import HyperlinkedModelUUIDSerializer
from mepp.api.serializers.v1.patient import NestedPatientSerializer


class ClinicianSerializer(CredentialsMixin, HyperlinkedModelUUIDSerializer):

    url = HyperlinkedUUIDIdentityField(
        lookup_field='uid',
        view_name='clinician-detail'
    )
    full_name = serializers.SerializerMethodField()
    patients = NestedPatientSerializer(many=True, read_only=True)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id',
            'url',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'patients',
            'archived',
            'is_superuser',
            'new_password',
            'language',
        ]
        read_only_fields = [
            'patients',
        ]

    def create(self, validated_data):
        validated_data['username'] = validated_data['email']
        password = validated_data.pop('new_password')
        return User.objects.create_user(
            password=password, is_staff=True, **validated_data
        )

    def get_full_name(self, user):
        return user.get_full_name()

