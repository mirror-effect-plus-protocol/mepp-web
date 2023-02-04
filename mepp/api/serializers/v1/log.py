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

import logging

from rest_framework import serializers
from rest_framework.reverse import reverse
from user_agents import parse

from mepp.api.enums.action import ActionEnum
from mepp.api.models.log import Log


class LogSerializer(serializers.ModelSerializer):

    action = serializers.SerializerMethodField()

    class Meta:
        model = Log
        fields = [
            'action',
            'exercise_index',
            'created_at',
        ]
        read_only_fields = [
            'created_at',
        ]

    def get_action(self, log):
        return ActionEnum(log.action).name

    def get_url(self, session):
        request = self.context['request']
        return reverse(
            'session-detail',
            args=(session.patient.uid, session.uid),
            request=request,
        )


class UserLogSerializer(serializers.ModelSerializer):
    action = serializers.ChoiceField(choices=ActionEnum.choices(reverse=True))
    exercise_index = serializers.IntegerField(required=False)

    class Meta:
        model = Log
        fields = [
            'action',
            'exercise_index',
        ]
        read_only_fields = [
            'created_at',
        ]

    def create(self, validated_data):

        request = self.context['request']

        try:
            ua_string = request.META.get('HTTP_USER_AGENT', '')
            user_agent = parse(ua_string)
        except Exception as e:
            logging.error(f'UserLogSerializer.create(): {str(e)}')
            user_agent = ''

        log = Log.objects.create(
            session=self.context['user_session'],
            action=ActionEnum[validated_data['action']].value,
            exercise_index=validated_data['exercise_index'],
            user_agent=user_agent
        )
        return log

    def validate(self, attrs):
        self._validate_exercise_index(attrs)
        return attrs

    def to_representation(self, instance):
        exercise = {}
        if instance.exercise_index is not None:
            exercise = {
                'index': instance.exercise_index,
                'i18n': instance.session.exercises[instance.exercise_index]['i18n'],
            }

        return {
            'action': ActionEnum(instance.action).name,
            'exercise': exercise,
            'created_at': instance.created_at.strftime('%Y-%m-%dT%H:%M:%SZ')
        }

    def _validate_exercise_index(self, attrs):
        if (
            attrs['action'] in Log.CONNECTION_ACTIONS
            or attrs['action'] in Log.SESSION_ACTIONS
        ):
            attrs['exercise_index'] = None
        else:
            try:
                exercise_index = attrs['exercise_index']
            except KeyError:
                raise serializers.ValidationError('Exercise index is required')
            else:
                user_session = self.context['user_session']
                if exercise_index >= len(user_session.exercises):
                    raise serializers.ValidationError(
                        'Exercise index out of range'
                    )
        return attrs
