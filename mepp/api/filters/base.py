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

from distutils.util import strtobool

from django.db.models import Q
from rest_framework.filters import BaseFilterBackend

from mepp.api.helpers.strings import normalize
from mepp.api.mixins.models.archivable import Archivable
from mepp.api.mixins.models.searchable import Searchable
from mepp.api.mixins import Template


class MeppAPIFilter(BaseFilterBackend):

    LIST_ENDPOINTS = [
        'list',
        'export',
        'widget_daily_repeats',
        'widget_sessions',
    ]

    def filter_queryset(self, request, queryset, view):
        """
        Return a filtered queryset.
        """
        # ToDo handle searches. Superusers should see only
        #  their data + users' data they are updating

        if request.user.is_staff and not request.user.is_superuser:
            if hasattr(queryset.model, 'clinician'):
                if issubclass(queryset.model, Template):
                    queryset = queryset.filter(
                        Q(clinician=request.user) | Q(is_system=True)
                    )
                else:
                    queryset = queryset.filter(clinician=request.user)

        # Filter patients
        try:
            patient_id = request.query_params['patient_id']
        except KeyError:
            pass
        else:
            queryset = queryset.filter(patient__uid=patient_id)

        # Filter clinicians
        try:
            clinician_uid = request.query_params['clinician_uid']
        except KeyError:
            pass
        else:
            queryset = queryset.filter(clinician__uid=clinician_uid)

        # Filter templates
        if view.action == 'list' and issubclass(queryset.model, Template):

            try:
                is_template = request.query_params['is_template']
            except KeyError:
                pass
            else:
                queryset = queryset.filter(is_template=strtobool(is_template))

            try:
                is_system = request.query_params['is_system']
            except KeyError:
                pass
            else:
                queryset = queryset.filter(is_system=strtobool(is_system))

        # Filter archives
        if (
            view.action in self.LIST_ENDPOINTS
            and issubclass(queryset.model, Archivable)
        ):
            show_archives = strtobool(
                request.query_params.get('archived', 'false')
            )
            queryset = queryset.filter(archived=show_archives)

        # Filter on fulltext search
        if (
            view.action in self.LIST_ENDPOINTS
            and issubclass(queryset.model, Searchable)
        ):

            try:
                fulltext_search = request.query_params['fulltext_search']
            except KeyError:
                pass
            else:
                for term in normalize(fulltext_search).split(' '):
                    queryset = queryset.filter(fulltext_search__contains=f' {term} ')

        return queryset
