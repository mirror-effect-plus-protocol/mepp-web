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

from mepp.api.models.exercise import Exercise
from mepp.api.models.plan import TreatmentPlan, TreatmentPlanI18n

from . import BaseV1TestCase


class AdminTreatmentPlanListAPITestCase(BaseV1TestCase):

    def test_list_plans_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        plans_count = TreatmentPlan.objects.all().count()
        response = self.client.get(
            self.reverse('treatmentplan-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], plans_count)

    def test_list_plans_as_clinician_not_system(self):
        url = self.reverse('treatmentplan-list') + '?is_system=false'
        token = self.login(self.helen.username, self.common_password)
        plans_count = TreatmentPlan.objects.filter(
            clinician=self.helen, is_system=False
        ).count()
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], plans_count)
        self.assertEqual(response.data['count'], 1)

        # Create one plan
        treatment_plan = TreatmentPlan.objects.create(clinician=self.helen)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], plans_count + 1)

    def test_list_plans_as_clinician_with_system(self):
        token = self.login(self.helen.username, self.common_password)
        system_plans_count = TreatmentPlan.objects.filter(is_system=True).count()
        response = self.client.get(
            self.reverse('treatmentplan-list') + '?is_system=true',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], system_plans_count)

    def test_list_plans_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.get(
            self.reverse('treatmentplan-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AdminTreatmentPlanCreateAPITestCase(BaseV1TestCase):

    def create_treatment_plan(self, user, **kwargs):
        exercise = Exercise.objects.first()
        return {
            'archived': False,
            'exercises': [
                {
                    'id': exercise.uid,
                    'index': 0,
                    'movement_duration': 1,
                    'pause': 1,
                    'repetition': 1,
                    'video_url': '',
                }
            ],
            'i18n': {
                'name': {
                    'fr': 'Lorem Ipsum en français',
                    'en': 'Lorem Ipsum in English',
                    'de': 'Lorem Ipsum in German',
                    'es': 'Lorem Ipsum in Espagnol',
                    'it': 'Lorem Ipsum in Italian',
                    'pt': 'Lorem Ipsum in Portuguese',
                },
            },
            'movement_duration': 1,
            'pause': 1,
            'repetition': 1,
            'is_system': kwargs.get('is_system', False),
            'clinician_uid': user.uid,
        }

    def test_create_treatment_plan_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=self.create_treatment_plan(self.admin),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_treatment_plan_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=self.create_treatment_plan(self.helen),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_treatment_plan_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=self.create_treatment_plan(self.patient_john),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_not_valid_treatment_plan(self):
        treatment_plan = self.create_treatment_plan(self.helen)
        del treatment_plan['i18n']
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=treatment_plan,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_create_system_treatment_plan_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        treatment_plan = self.create_treatment_plan(self.helen, is_system=True)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=treatment_plan,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_assign_plan_as_another_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        treatment_plan = self.create_treatment_plan(self.john)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=treatment_plan,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['clinician_uid'], self.helen.uid)

    def test_can_assign_plan_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        treatment_plan = self.create_treatment_plan(self.john)
        response = self.client.post(
            self.reverse('treatmentplan-list'),
            data=treatment_plan,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['clinician_uid'], self.john.uid)


class AdminTreatmentPlanUpdateAPITestCase(BaseV1TestCase):

    def test_update_treatment_plan_as_admin(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.admin)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_treatment_plan_as_clinician(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.helen)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_other_clinician_treatment_plan_as_clinician(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.helen)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.john.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_other_clinician_treatment_plan_as_admin(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.helen)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_treatment_plan_as_patient(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.helen)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_update_not_valid_treatment_plan(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.helen)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'i18n': {}},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_update_system_treatment_plan_as_clinician(self):
        treatment_plan = TreatmentPlan.objects.create(
            clinician=self.admin, is_system=True
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.john.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_update_system_treatment_plan_as_admin(self):
        treatment_plan = TreatmentPlan.objects.create(
            clinician=self.admin, is_system=True
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AdminTreatmentPlanDeleteAPITestCase(BaseV1TestCase):
    def test_delete_treatment_plan_as_admin(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.admin)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.admin.username, self.common_password)
        response = self.client.delete(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_treatment_plan_as_clinician(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.john)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.john.username, self.common_password)
        response = self.client.delete(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_treatment_plan_as_patient(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.john)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.delete(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_delete_not_owned_treatment_plan(self):
        treatment_plan = TreatmentPlan.objects.create(clinician=self.john)
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.helen.username, self.common_password)
        response = self.client.delete(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_delete_system_treatment_plan(self):
        treatment_plan = TreatmentPlan.objects.create(
            clinician=self.admin, is_system=True
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='fr'
        )
        TreatmentPlanI18n.objects.create(
            name='Lorem ipsum', parent=treatment_plan, language='en'
        )

        token = self.login(self.helen.username, self.common_password)
        response = self.client.delete(
            self.reverse('treatmentplan-detail', args=(treatment_plan.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
