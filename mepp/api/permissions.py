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

from django.http import Http404
from django.utils.timezone import now
from rest_framework.permissions import SAFE_METHODS, BasePermission

from mepp.api.mixins import Template
from mepp.api.models.expiring_token import ExpiringToken


class MeppAPIPermission(BasePermission):

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        user = request.user
        # Super users can do everything
        if user.is_superuser:
            return True

        # Users can see:
        #   - their own objects
        #   - system objects
        # User can modify/delete:
        #   - their own objects
        if obj.clinician != user:
            if request.method not in SAFE_METHODS:
                return False

            if isinstance(obj, Template) and not obj.is_system:
                return False

        return True


class MeppStaffProfilePermission(BasePermission):

    def has_permission(self, request, view):
        """
        Superusers can do whatever they want.
        Staff can only read/edit themselves

        Otherwise, access if forbidden
        """
        if request.user.is_superuser:
            return True

        if not request.user.is_staff:
            return False

        return view.action in ['retrieve', 'partial_update', 'update']

    def has_object_permission(self, request, view, obj):

        user = request.user
        # Superusers can do everything
        if user.is_superuser:
            return True

        return user.uid == obj.uid


class MeppExportPermission(BasePermission):
    """
    Allow actions based on a token when header cannot be set.
    """
    def has_permission(self, request, view):
        try:
            token = request.query_params['t']
        except KeyError:
            return False

        if ExpiringToken.objects.filter(
            key=token, expiry_date__gte=now()
        ).exists():
            return True

        return False

    def has_object_permission(self, request, view, obj):
        """
        Exports should only process from list endpoint.
        No need to give permissions at the object level.
        """
        return False


class MeppMirrorPermission(BasePermission):
    """
    Only the patient can access its own related objects
    """
    def has_permission(self, request, view):
        if request.user.is_staff or request.user.is_anonymous:
            raise Http404

        return True

    def has_object_permission(self, request, view, obj):
        if obj.patient != request.user:
            raise Http404

        return True


class MeppMirrorSettingPermission(BasePermission):

    def has_permission(self, request, view):
        if not request.auth:
            return False

        return ExpiringToken.objects.filter(
            key=request.auth.key, temporary=True
        ).exists()


class MeppSuperUserPermission(BasePermission):

    def has_permission(self, request, view):
        """
        Return `True` if permission is granted, `False` otherwise.
        """
        return request.user.is_superuser

    def has_object_permission(self, request, view, obj):

        return request.user.is_superuser
