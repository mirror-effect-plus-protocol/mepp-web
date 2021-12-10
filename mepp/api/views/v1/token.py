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

from datetime import timedelta

from django.conf import settings
from django.utils.timezone import now
from rest_framework import serializers
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from rest_framework.viewsets import GenericViewSet

from mepp.api.models.expiring_token import ExpiringToken
from mepp.api.models.user import User


class TemporaryTokenViewSet(CreateModelMixin, GenericViewSet):
    """
    API endpoint to get temporary token.

    This viewset is pretty simple, no need to use a serializer.
    Validation takes places within this class.
    """
    MIRROR_TYPE = 'mirror'
    EXPORT_TYPE = 'export'

    TEMPORARY_TOKEN_TYPES = [
        EXPORT_TYPE,
        MIRROR_TYPE,
    ]

    def get_queryset(self):
        queryset = ExpiringToken.objects.filter(temporary=True).all()
        return queryset

    def create(self, request, *args, **kwargs):
        type_, requesting_user = self._validate(request)

        # Delete user's temporary token
        ExpiringToken.objects.filter(
            user=requesting_user,
            temporary=True,
        ).delete()

        expiry_date = now() + timedelta(
            seconds=settings.TOKEN_EXPIRY_TTLS[type_]
        )
        token = ExpiringToken.objects.create(
            user=requesting_user,
            temporary=True,
            expiry_date=expiry_date
        )
        return Response({'token': token.key}, status=HTTP_201_CREATED)

    def _validate(self, request) -> tuple:
        """
        Validate sent parameters:
        - Cannot ask for a temporary token if a valid type is not provided
        - If the token is to open the mirror on behalf of a patient,
          the clinician must be allowed to see the patient.
        """
        try:
            type_ = request.data['type']
        except KeyError:
            raise serializers.ValidationError({
                'type': 'Field is required'
            })

        if type_ not in self.TEMPORARY_TOKEN_TYPES:
            raise serializers.ValidationError({
                'type': 'Invalid value'
            })

        if type_ == self.MIRROR_TYPE:
            try:
                patient_uid = request.data['patient_uid']
            except KeyError:
                raise serializers.ValidationError({
                    'patient_uid': 'Field is required'
                })

            try:
                requesting_user = User.objects.get(uid=patient_uid)
            except User.DoesNotExist:
                raise serializers.ValidationError({
                    'patient_uid': 'Patient not found'
                })
            else:
                if (
                    not request.user.is_superuser
                    and requesting_user.clinician != request.user
                ):
                    raise serializers.ValidationError(
                        {'patient_uid': 'Patient not found'}
                    )
        else:
            requesting_user = request.user

        return type_, requesting_user
