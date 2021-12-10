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
from rest_framework.reverse import reverse

from mepp.api.enums.status import StatusEnum
from mepp.api.models.session import Session
from mepp.api.serializers import HyperlinkedModelUUIDSerializer


class SessionSerializer(HyperlinkedModelUUIDSerializer):

    status = serializers.SerializerMethodField()
    logs = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = Session
        fields = [
            'id',
            'url',
            'status',
            'exercises',
            'logs',
            'created_at',
            'modified_at',
        ]
        read_only_fields = [
            'created_at',
            'modified_at',
        ]

    def create(self, validated_data):
        request = self.context['request']
        validated_data['patient'] = request.user
        return super().create(validated_data=validated_data)

    def get_status(self, session):
        return StatusEnum(session.status).name

    def get_url(self, session):
        request = self.context['request']
        return reverse(
            'session-detail',
            args=(session.patient.uid, session.uid),
            request=request,
        )

    def get_logs(self, session):
        request = self.context['request']
        return reverse(
            'log-list',
            args=(session.patient.uid, session.uid),
            request=request,
        )


class UserSessionSerializer(serializers.ModelSerializer):

    id = serializers.ReadOnlyField(source='uid')
    status = serializers.SerializerMethodField(source='uid')

    class Meta:
        model = Session
        fields = [
            'id',
            'status',
            'exercises',
            'created_at',
            'modified_at',
        ]
        read_only_fields = [
            'id',
            'status',
            'exercises',
            'created_at',
            'modified_at',
        ]

    def get_status(self, session):
        return StatusEnum(session.status).name
