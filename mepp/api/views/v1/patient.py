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

import io

import xlsxwriter
from django.db.models import F
from django.http import HttpResponse
from django.utils import timezone, translation
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.reverse import reverse

from mepp.api.enums.action import ActionEnum
from mepp.api.enums.language import LanguageEnum
from mepp.api.filters.base import MeppAPIFilter
from mepp.api.filters.patient import (
    PatientFilter,
    PatientOrderingFilter,
)
from mepp.api.helpers.emails import send_onboarding_email
from mepp.api.models.log import Log
from mepp.api.models.user import User
from mepp.api.permissions import MeppExportPermission
from mepp.api.serializers.v1.patient import PatientSerializer
from mepp.api.serializers.v1.plan import PatientTreatmentPlanSerializer
from mepp.api.serializers.v1.widget import (
    DailyRepeatWidgetSerializer,
    SessionsWidgetSerializer,
)
from mepp.api.views import UUIDLookupFieldViewSet


class PatientViewSet(UUIDLookupFieldViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.exclude(is_staff=True)
    serializer_class = PatientSerializer
    filter_backends = [
        MeppAPIFilter,
        PatientFilter,
        PatientOrderingFilter,
    ]
    ordering = '-date_joined'
    ordering_fields = [
        'first_name',
        'last_name',
        'date_joined',
        'clinician__first_name',
        'clinician__last_name',
    ]

    @action(detail=True, methods=['POST'])
    def assign_plan(self, request, uid, *args, **kwargs) -> Response:
        serializer_context = {
            'request': request,
            'clinician': request.user
        }
        data = {
            'patient': reverse('patient-detail', args=[uid], request=request),
            'treatment_plan': reverse(
                'treatmentplan-detail',
                args=[request.data.get('treatment_plan_uid', '-1')],
                request=request
            )
        }
        serializer = PatientTreatmentPlanSerializer(
            data=data, context=serializer_context
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    @action(detail=False, methods=['GET'],
            permission_classes=[MeppExportPermission])
    def export(self, request, *args, **kwargs) -> HttpResponse:
        output = io.BytesIO()
        language = request.query_params.get(
            'language', LanguageEnum.default.value
        )

        params = request.query_params.dict()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()

        translation.activate(language)
        # These lines are only there to be detected by PO editor
        # because string are dynamically created later based on record values
        translation.gettext('side:0')
        translation.gettext('side:1')
        translation.gettext('use_audio:False')
        translation.gettext('use_audio:True')
        translation.gettext('language:fr')
        translation.gettext('language:en')

        header_data = [
            translation.gettext('Patient'),
            translation.gettext('Treatment plan'),
            translation.gettext('Side'),
            translation.gettext('Audio'),
            translation.gettext('Language'),
            translation.gettext('Clinician'),
            translation.gettext('Session'),
            translation.gettext('Exercise'),
            translation.gettext('Action'),
            translation.gettext('Date/Time (UTC)'),
        ]

        header_format = workbook.add_format(
            {
                'bold': True,
                'bottom': 2,
                'bg_color': '#232525',
                'font_color': 'white',
            }
        )

        for col_num, data in enumerate(header_data):
            worksheet.write(0, col_num, data, header_format)

        # Get some data to write to the spreadsheet.
        queryset = (
            Log.objects.annotate(
                exercises=F('session__exercises'),
                first_name=F('session__patient__first_name'),
                last_name=F('session__patient__last_name'),
                language=F('session__patient__language'),
                side=F('session__patient__side'),
                use_audio=F('session__patient__use_audio'),
                c_first_name=F('session__patient__clinician__first_name'),
                c_last_name=F('session__patient__clinician__last_name'),
                tp_name=F('session__treatment_plan__i18n__name'),
                tp_language=F('session__treatment_plan__i18n__language')
            )
            .values(
                'action',
                'created_at',
                'exercise_index',
                'session_id',
                'exercises',
                'first_name',
                'last_name',
                'language',
                'side',
                'use_audio',
                'c_first_name',
                'c_last_name',
                'tp_name',
                'tp_language'
            )
            .filter(tp_language=language)
        )

        selected_ids = params.get('selectedIds')
        if selected_ids:
            patient_uids = selected_ids.split(',')
        else:
            filtered_queryset = self.filter_queryset(self.get_queryset()).order_by()
            patient_uids = filtered_queryset.values_list('uid', flat=True)

        queryset = queryset.filter(session__patient__uid__in=patient_uids)

        queryset = queryset.distinct().order_by(
            'first_name',
            'last_name',
            'tp_name',
            'created_at'
        )

        row_num = 1
        for record in queryset.all():
            # Patient's full name
            value = f"{record['first_name']} {record['last_name']}"
            worksheet.write(row_num, 0, value)
            # Treatment plan
            worksheet.write(row_num, 1, record['tp_name'])
            # Patient's side
            value = translation.gettext(f"side:{record['side']}")
            worksheet.write(row_num, 2, value)
            # Can patient use audio?
            value = translation.gettext(f"use_audio:{record['use_audio']}")
            worksheet.write(row_num, 3, value)
            # Patient's language
            value = translation.gettext(f"language:{record['language']}")
            worksheet.write(row_num, 4, value)
            # Clinician's language
            value = f"{record['c_first_name']} {record['c_last_name']}"
            worksheet.write(row_num, 5, value)
            # Session PK
            worksheet.write(row_num, 6, record['session_id'])

            # Exercise
            if record['exercise_index'] is not None:
                index = record['exercise_index']
                value = record['exercises'][index]['i18n'][language]
            else:
                value = ''
            worksheet.write(row_num, 7, value)
            # Action
            worksheet.write(row_num, 8, ActionEnum(record['action']).name)
            # Date
            worksheet.write(row_num, 9, str(record['created_at']))
            row_num += 1
        # Close the workbook before sending the data.
        workbook.close()

        # Rewind the buffer.
        output.seek(0)

        # Set up the Http response.
        now = timezone.now().strftime('%Y%d%m-%H%M%S')
        filename = f'mepp-patients.{now}.xlsx'
        response = HttpResponse(
            output,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=%s' % filename

        return response

    @action(detail=True, methods=['POST'])
    def resend(self, request, uid, *args, **kwargs) -> Response:
        if request.data.get('confirm', False):
            if send_onboarding_email(self.get_object()):
                return Response({'send', 'ok'})

        return Response({'send', 'ko'})

    @action(
        detail=False,
        methods=['GET'],
        url_path='widgets/daily_repeats',
    )
    def widget_daily_repeats(
        self, request, *args, **kwargs
    ) -> Response:
        return Response(
            self._get_widget_serialized_data(
                request, DailyRepeatWidgetSerializer
            )
        )

    @action(
        detail=False,
        methods=['GET'],
        url_path='widgets/sessions',
    )
    def widget_sessions(self, request, *args, **kwargs) -> Response:
        return Response(
            self._get_widget_serialized_data(request, SessionsWidgetSerializer)
        )

    def _get_widget_serialized_data(self, request, widget_serializer) -> dict:
        queryset = self.filter_queryset(self.get_queryset())
        context = {
            'request': request,
            'week_range': request.query_params.get('week_range'),
        }
        serializer = widget_serializer(
            queryset, context=context, many=True
        )
        return serializer.data
