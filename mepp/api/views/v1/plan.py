# coding: utf-8
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
    ]
