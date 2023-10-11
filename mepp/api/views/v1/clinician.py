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

from rest_framework.decorators import action
from rest_framework.response import Response

from mepp.api.filters.clinician import ClinicianFilter
from mepp.api.filters.patient import PatientOrderingFilter
from mepp.api.helpers.emails import send_onboarding_email
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

    @action(detail=True, methods=['POST'])
    def resend(self, request, uid, *args, **kwargs) -> Response:
        if request.data.get('confirm', False):
            if send_onboarding_email(self.get_object()):
                return Response({'send', 'ok'})

        return Response({'send', 'ko'})
