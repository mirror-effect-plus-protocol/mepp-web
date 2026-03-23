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

from rest_framework import status

from mepp.api.models.expiring_token import ExpiringToken
from mepp.api.models.session import Session

from . import BaseV1TestCase


class AnonymizePatientAPITestCase(BaseV1TestCase):
    """
    patient_john (john.smith) has clinician=john
    patient_tim (tim.degner) has clinician=john
    """

    def test_anonymize_patient_as_clinician(self):
        # john is patient_john's clinician
        token = self.login(self.john.username, self.common_password)
        patient = self.patient_john

        response = self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        patient.refresh_from_db()
        self.assertTrue(patient.is_anonymized)
        self.assertTrue(patient.archived)
        self.assertFalse(patient.is_active)
        self.assertEqual(patient.first_name, 'Anonymized')
        self.assertTrue(patient.last_name.startswith('User-'))
        self.assertTrue(patient.email.endswith('@anonymized.invalid'))
        self.assertIsNone(patient.side)
        self.assertIsNone(patient.mirror_settings)
        self.assertIsNone(patient.clinician)
        self.assertIsNone(patient.use_audio)
        self.assertFalse(patient.has_usable_password())
        self.assertFalse(
            ExpiringToken.objects.filter(user=patient).exists()
        )

    def test_anonymize_patient_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        patient = self.patient_tim

        response = self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        patient.refresh_from_db()
        self.assertTrue(patient.is_anonymized)

    def test_anonymize_patient_as_wrong_clinician(self):
        # helen is NOT patient_john's clinician
        token = self.login(self.helen.username, self.common_password)
        patient = self.patient_john

        response = self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )
        # Returns 404 because the queryset filters by clinician=helen
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_anonymize_without_confirm(self):
        token = self.login(self.john.username, self.common_password)
        patient = self.patient_john

        response = self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_anonymize_already_anonymized(self):
        # Use admin (superuser) to bypass the archived filter
        token = self.login(self.admin.username, self.common_password)
        patient = self.patient_john

        self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )
        response = self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_anonymize_preserves_sessions(self):
        token = self.login(self.john.username, self.common_password)
        patient = self.patient_john
        session_count = Session.objects.filter(patient=patient).count()

        self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(
            Session.objects.filter(patient=patient).count(),
            session_count,
        )

    def test_login_after_anonymization(self):
        token = self.login(self.john.username, self.common_password)
        patient = self.patient_john
        original_username = patient.username

        self.client.post(
            self.reverse('patient-anonymize', kwargs={'uid': patient.uid}),
            data={'confirm': True},
            format='json',
            **self.get_token_header(token),
        )

        response = self.client.post(
            self.reverse('current-user-profile-list'),
            data={
                'username': original_username,
                'password': self.common_password,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AnonymizeSelfAPITestCase(BaseV1TestCase):

    def test_anonymize_self_as_patient(self):
        token = self.login(
            self.patient_john.username, self.common_password
        )
        response = self.client.post(
            self.reverse('current-user-profile-anonymize-self'),
            data={'password': self.common_password},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.patient_john.refresh_from_db()
        self.assertTrue(self.patient_john.is_anonymized)

    def test_anonymize_self_wrong_password(self):
        token = self.login(
            self.patient_john.username, self.common_password
        )
        response = self.client.post(
            self.reverse('current-user-profile-anonymize-self'),
            data={'password': 'wrong_password'},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_anonymize_self_staff_blocked(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('current-user-profile-anonymize-self'),
            data={'password': self.common_password},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
