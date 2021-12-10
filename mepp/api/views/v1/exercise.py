# coding: utf-8
from mepp.api.filters.base import MeppAPIFilter
from mepp.api.filters.exercise import (
    ExerciseFilter,
    ExerciseOrderingFilter,
)
from mepp.api.models.exercise import Exercise
from mepp.api.serializers.v1.exercise import ExerciseSerializer
from mepp.api.views import UUIDLookupFieldViewSet


class ExerciseViewSet(UUIDLookupFieldViewSet):
    """
    API endpoint that allows exercises to be viewed or edited.
    """
    serializer_class = ExerciseSerializer

    def get_queryset(self):
        queryset = Exercise.objects.all()
        return queryset

    filter_backends = [
        MeppAPIFilter,
        ExerciseFilter,
        ExerciseOrderingFilter,
    ]
    ordering = 'i18n__description'
    ordering_fields = [
        'i18n__description',
        'movement_duration',
        'pause',
        'repeat',
        'clinician__first_name',
        'clinician__last_name',
    ]
