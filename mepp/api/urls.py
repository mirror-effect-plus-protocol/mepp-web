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

from django.urls import include, path
from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from mepp.api.views.v1 import (
    CategoryViewSet,
    ClinicianViewSet,
    CurrentUserViewSet,
    ExerciseViewSet,
    LogViewSet,
    PatientViewSet,
    SessionViewSet,
    TemporaryTokenViewSet,
    TreatmentPlanViewSet,
)


class DefaultRouterWithNesting(NestedRouterMixin, routers.DefaultRouter):
    pass


api_v1_router = DefaultRouterWithNesting()
api_v1_router.register(r'categories', CategoryViewSet, basename='category')
api_v1_router.register(r'clinicians', ClinicianViewSet, basename='clinician')
api_v1_router.register(r'exercises', ExerciseViewSet, basename='exercise')
api_v1_router.register(r'plans', TreatmentPlanViewSet, basename='treatmentplan')
api_v1_router.register(r'token', TemporaryTokenViewSet, basename='temporarytoken')
api_v1_router.register(r'me', CurrentUserViewSet, basename='current-user-profile')
patient_routes = api_v1_router.register(r'patients', PatientViewSet, basename='patient')
patient_routes.register(
    r'sessions',
    SessionViewSet,
    basename='session',
    parents_query_lookups=['patient'],
).register(
    r'logs',
    LogViewSet,
    basename='log',
    parents_query_lookups=['patient', 'session'],
)

current_user_profile = CurrentUserViewSet.as_view({'get': 'get', 'post': 'post'})
current_user_session = CurrentUserViewSet.as_view({'get': 'get_session'})

urlpatterns = [
    path('v1/', include((api_v1_router.urls, 'api_v1'))),
]
