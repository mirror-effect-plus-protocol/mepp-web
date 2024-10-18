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

from django.db.models import Case, Value, When
from rest_framework.filters import BaseFilterBackend
from .patient import PatientOrderingFilter


class ClinicianFilter(BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):

        if request.user.is_superuser:
            # Remove user from the list. No need to expose them to the front end.
            # Update profile would happen through the settings route
            if view.action == 'list' and request.query_params.get('me') == 'false':
                queryset = queryset.exclude(uid=request.user.uid)

            return queryset

        queryset = queryset.filter(uid=request.user.uid)
        return queryset


class ClinicianOrderingFilter(PatientOrderingFilter):

    def filter_queryset(self, request, queryset, view):
        params = request.query_params.get(self.ordering_param)
        if params:
            fields = [param.strip() for param in params.split(',')]
            if 'profile' in fields:
                current_clinician_uid = request.query_params.get('clinician_uid')
                if request.user.uid == current_clinician_uid:
                    queryset = queryset.alias(
                        ordering_priority=Case(
                            When(pk=request.user.id, then=Value(2)),
                            When(uid=current_clinician_uid, then=Value(1)),
                            default=Value(0),
                        ),
                    )
                else:
                    queryset = queryset.alias(
                        ordering_priority=Case(
                            When(pk=request.user.id, then=Value(1)),
                            default=Value(0),
                        ),
                    )

        return super().filter_queryset(
            request=request, queryset=queryset, view=view
        )

    def get_ordering(self, request, queryset, view):
        """
        Override parent class to support front-end ordering
        """
        ordering = super().get_ordering(
            request=request, queryset=queryset, view=view
        )
        params = request.query_params.get(self.ordering_param)
        if params:
            fields = [param.strip() for param in params.split(',')]
            if 'profile' in fields:
                if not ordering:
                    ordering = ['-ordering_priority', 'first_name', 'last_name']
                else:
                    ordering.insert(0, '-ordering_priority')

        return ordering
