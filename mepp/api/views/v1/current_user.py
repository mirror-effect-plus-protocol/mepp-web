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

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from django.http import Http404
from rest_framework import viewsets, mixins
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_201_CREATED

from mepp.api.enums.action import ActionEnum
from mepp.api.enums.role import RoleEnum
from mepp.api.models import (
    ExpiringToken,
    Log,
    Session,
)
from mepp.api.permissions import MeppMirrorPermission
from mepp.api.serializers.v1.log import UserLogSerializer
from mepp.api.serializers.v1.patient import PatientSettingsSerializer
from mepp.api.serializers.v1.session import UserSessionSerializer


class CurrentUserViewSet(
    ObtainAuthToken,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    User = get_user_model()  # noqa
    queryset = User.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user.last_login = now()
        user.save()
        return Response(self.__detail(user))

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        try:
            kwargs['pk']
        except KeyError:
            pass
        else:
            raise Http404

        user = request.user
        if user.is_anonymous:
            return Response(
                {'detail': 'You are not authenticated'},
                status=HTTP_403_FORBIDDEN,
            )
        return Response(self.__detail(user))

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    @action(
        detail=False,
        methods=['GET'],
        permission_classes=[MeppMirrorPermission],
        url_path='session',
    )
    def user_session_view(self, request, *args, **kwargs):
        user_session = request.user.active_session
        if not user_session:
            raise Http404
        Log.objects.create(session=user_session, action=ActionEnum.LOGIN.value)
        serializer = UserSessionSerializer(user_session)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=['POST'],
        permission_classes=[MeppMirrorPermission],
        url_path='session/(?P<session_uid>[a-z0-9]*)/logs',
    )
    def user_logs_view(self, request, session_uid, *args, **kwargs):
        user_session = get_object_or_404(Session, active=True, uid=session_uid)
        # May raise a permission denied
        self.check_object_permissions(request, user_session)
        context = {
            'request': request,
            'user_session': user_session,
        }
        serializer = UserLogSerializer(data=request.data, context=context)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED,
                        headers=headers)

    @action(
        detail=False,
        methods=['GET'],
        permission_classes=[IsAuthenticated],
        url_path='permissions',
    )
    def user_permissions(self, request, *args, **kwargs):
        return Response({
            'permissions': RoleEnum.get_role(request.user)
        })

    @action(
        detail=False,
        methods=['PATCH'],
        url_path='profile',
    )
    def user_profile(self, request, *args, **kwargs):
        user = request.user
        serializer = PatientSettingsSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def __detail(self, user):
        return {
            'token': user.token,
            'profile': {
                'uid': user.uid,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'full_name': user.get_full_name(),
                'email': user.email,
                'language': user.language,
                'use_audio': user.use_audio,
                'side': user.side,
            },
            'permissions': RoleEnum.get_role(user),
        }

