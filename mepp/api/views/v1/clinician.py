# coding: utf-8
from mepp.api.filters.clinician import ClinicianFilter
from mepp.api.filters.patient import PatientOrderingFilter
from mepp.api.models.user import User
from mepp.api.permissions import (
    MeppStaffProfilePermission,
)
from mepp.api.serializers.v1.clinician import ClinicianSerializer
from mepp.api.views import UUIDLookupFieldViewSet


class ClinicianViewSet(UUIDLookupFieldViewSet):
    """
    API endpoint that allows clinicians to be viewed or edited.
    """
    queryset = User.objects.filter(is_staff=True)
    serializer_class = ClinicianSerializer
    permission_classes = [MeppStaffProfilePermission]
    filter_backends = [
        ClinicianFilter,
        PatientOrderingFilter,
    ]
