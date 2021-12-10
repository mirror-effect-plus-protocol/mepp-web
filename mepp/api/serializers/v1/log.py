# coding: utf-8
from rest_framework import serializers
from rest_framework.reverse import reverse

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
        log = Log.objects.create(
            session=self.context['user_session'],
            action=ActionEnum[validated_data['action']].value,
            exercise_index=validated_data['exercise_index'],
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
