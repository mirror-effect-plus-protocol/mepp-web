# coding: utf-8
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
