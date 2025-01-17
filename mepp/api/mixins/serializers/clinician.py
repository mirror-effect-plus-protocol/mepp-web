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

from rest_framework import serializers

from mepp.api.models.user import User


class ClinicianValidatorMixin:

    def validate_clinician_uid(self, attrs):
        request = self.context['request']

        def _get_clinician_uid():
            try:
                return request.data['clinician_uid']
            except KeyError:
                return None

        clinician_uid = _get_clinician_uid()

        if request.user.is_superuser:
            if (
                self.instance
                and self.instance.pk is not None
                and not clinician_uid
            ):
                return attrs

            if not clinician_uid:
                attrs['clinician_id'] = request.user.pk
            else:
                try:
                    clinician = User.objects.get(uid=clinician_uid, is_staff=True)
                except User.DoesNotExist:
                    raise serializers.ValidationError({
                        'clinician_uid': 'This user does not exist'
                    })

                attrs['clinician_id'] = clinician.pk
        else:
            if (
                clinician_uid
                and self.instance
                and self.instance.pk is not None
                and clinician_uid != self.instance.clinician.uid
            ):
                raise serializers.ValidationError({
                    'clinician_uid': 'Action forbidden'
                })
            else:
                if not self.instance or self.instance.pk is None:
                    attrs['clinician_id'] = request.user.pk

        return attrs
