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

from mepp.api.filters.base import MeppAPIFilter
from mepp.api.filters.plan import (
    PlanFilter,
    PlanOrderingFilter,
)
from mepp.api.models.plan import TreatmentPlan
from mepp.api.serializers.v1.plan import TreatmentPlanSerializer
from mepp.api.views import UUIDLookupFieldViewSet


class TreatmentPlanViewSet(UUIDLookupFieldViewSet):
    """
    API endpoint that allows treatment plans to be viewed or edited.
    """
    serializer_class = TreatmentPlanSerializer

    def get_queryset(self):
        queryset = TreatmentPlan.objects.all()
        return queryset

    filter_backends = [
        MeppAPIFilter,
        PlanFilter,
        PlanOrderingFilter,
    ]
    ordering = 'i18n__name'
    ordering_fields = [
        'i18n__name',
        'daily_repeat',
        'clinician__first_name',
        'clinician__last_name',
        'randomize'
    ]
