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
from django.core import mail
from rest_framework import status

from mepp.api.models.user import User

from . import BaseV1TestCase


class AdminPatientListAPITestCase(BaseV1TestCase):

    def test_list_patients_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        users_count = User.objects.filter(clinician__isnull=False).count()
        response = self.client.get(
            self.reverse('patient-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], users_count)

    def test_list_patients_as_clinician(self):
        url = self.reverse('patient-list') + '?is_system=false'
        token = self.login(self.helen.username, self.common_password)
        patients_count = User.objects.filter(clinician=self.helen).count()
        all_patients_count = User.objects.filter(clinician__isnull=False).count()
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], patients_count)
        self.assertNotEqual(response.data['count'], all_patients_count)

        # Create one patient
        User.objects.create(clinician=self.helen)
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], patients_count + 1)

    def test_list_patients_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.get(
            self.reverse('patient-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AdminPatientCreateAPITestCase(BaseV1TestCase):

    def get_patient_dict(self, **kwargs):
        return {
            'first_name': 'Foo',
            'last_name': 'Bar',
            'email': 'foo@bar.org',
            'new_password': 'foo.bar!',
            'confirm_password': 'foo.bar!'
        }

    def test_create_patient_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('patient-list'),
            data=self.get_patient_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['clinician_uid'], self.admin.uid)
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Your profile has been activated')
        return response.data['id']

    def test_cannot_access_other_clinician_patient(self):
        patient_uid = self.test_create_patient_as_admin()
        token = self.login(self.helen.username, self.common_password)
        response = self.client.get(
            self.reverse('patient-detail', kwargs={'uid': patient_uid}),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_create_patient_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.post(
            self.reverse('patient-list'),
            data=self.get_patient_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_not_valid_patient(self):
        patient = self.get_patient_dict()
        del patient['email']
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('patient-list'),
            data=patient,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AdminPatientUpdateAPITestCase(BaseV1TestCase):

    def test_update_patient_as_clinician(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )

        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('patient-detail', args=(patient.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_other_clinician_patient_as_clinician(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )
        token = self.login(self.john.username, self.common_password)
        response = self.client.patch(
            self.reverse('patient-detail', args=(patient.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_other_clinician_patient_as_admin(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )
        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('patient-detail', args=(patient.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_patient_as_patient(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.patch(
            self.reverse('patient-detail', args=(patient.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_update_not_valid_patient(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )
        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('patient-detail', args=(patient.uid,)),
            data={'email': 'john.smith@example.org'},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AdminPatientDeleteAPITestCase(BaseV1TestCase):

    def test_delete_patient_as_admin(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )

        token = self.login(self.admin.username, self.common_password)
        response = self.client.delete(
            self.reverse('patient-detail', args=(patient.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_patient_as_clinician(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )

        token = self.login(self.helen.username, self.common_password)
        response = self.client.delete(
            self.reverse('patient-detail', args=(patient.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_cannot_delete_patient_as_patient(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.delete(
            self.reverse('patient-detail', args=(patient.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_delete_not_owned_patient(self):
        patient = User.objects.create(
            first_name='Foo',
            last_name='Bar',
            email='foo.bar@example.org',
            clinician=self.helen,
        )
        token = self.login(self.john.username, self.common_password)
        response = self.client.delete(
            self.reverse('patient-detail', args=(patient.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
