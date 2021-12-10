# coding: utf-8
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
