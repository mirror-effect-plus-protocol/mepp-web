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

from mepp.api.models.category import Category
from mepp.api.models.exercise import Exercise, ExerciseI18n
from . import BaseV1TestCase


class AdminExerciseListAPITestCase(BaseV1TestCase):

    def test_list_exercises_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        exercises_count = Exercise.objects.all().count()
        response = self.client.get(
            self.reverse('exercise-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], exercises_count)

    def test_list_exercises_as_clinician_not_system(self):
        url = self.reverse('exercise-list') + '?is_system=false'
        token = self.login(self.helen.username, self.common_password)
        exercises_count = Exercise.objects.filter(
            clinician=self.helen, is_system=False
        ).count()
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], exercises_count)
        self.assertEqual(response.data['count'], 0)

        # Create one exercise
        exercise = Exercise.objects.create(clinician=self.helen)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], exercises_count + 1)

    def test_list_exercises_as_clinician_with_system(self):
        token = self.login(self.helen.username, self.common_password)
        system_exercises_count = Exercise.objects.filter(is_system=True).count()
        response = self.client.get(
            self.reverse('exercise-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], system_exercises_count)

    def test_list_exercises_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.get(
            self.reverse('exercise-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AdminExerciseCreateAPITestCase(BaseV1TestCase):

    def get_exercise_dict(self, user, **kwargs):
        category = Category.objects.first()
        return {
            'archived': False,
            'i18n': {
                'description': {
                    'fr': 'Lorem Ipsum en français',
                    'en': 'Lorem Ipsum in English'
                }
            },
            'movement_duration': 1,
            'pause': 1,
            'repetition': 1,
            'categories': [
                {'uid': category.uid}
            ],
            'is_system': kwargs.get('is_system', False),
            'clinician_uid': user.uid,
        }

    def test_create_exercise_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self.get_exercise_dict(self.admin),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_exercise_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self.get_exercise_dict(self.helen),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_exercise_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self.get_exercise_dict(self.patient_john),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_not_valid_exercise(self):
        exercise = self.get_exercise_dict(self.helen)
        del exercise['i18n']
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=exercise,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_create_system_exercise_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        exercise = self.get_exercise_dict(self.helen, is_system=True)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=exercise,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_assign_exercise_as_another_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        exercise = self.get_exercise_dict(self.john)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=exercise,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['clinician_uid'], self.helen.uid)

    def test_can_assign_exercise_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        exercise = self.get_exercise_dict(self.john)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=exercise,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['clinician_uid'], self.john.uid)


class AdminExerciseUpdateAPITestCase(BaseV1TestCase):

    def test_update_exercise_as_admin(self):
        exercise = Exercise.objects.create(clinician=self.admin)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_exercise_as_clinician(self):
        exercise = Exercise.objects.create(clinician=self.helen)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_other_clinician_exercise_as_clinician(self):
        exercise = Exercise.objects.create(clinician=self.helen)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.john.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_other_clinician_exercise_as_admin(self):
        exercise = Exercise.objects.create(clinician=self.helen)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_exercise_as_patient(self):
        exercise = Exercise.objects.create(clinician=self.helen)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_update_not_valid_exercise(self):
        exercise = Exercise.objects.create(clinician=self.helen)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'i18n': {}},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cannot_update_system_exercise_as_clinician(self):
        exercise = Exercise.objects.create(clinician=self.admin, is_system=True)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.john.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_can_update_system_exercise_as_admin(self):
        exercise = Exercise.objects.create(clinician=self.admin, is_system=True)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AdminExerciseDeleteAPITestCase(BaseV1TestCase):

    def test_delete_exercise_as_admin(self):
        exercise = Exercise.objects.create(clinician=self.admin)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.admin.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_exercise_as_clinician(self):
        exercise = Exercise.objects.create(clinician=self.john)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.john.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_exercise_as_patient(self):
        exercise = Exercise.objects.create(clinician=self.john)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_delete_not_owned_exercise(self):
        exercise = Exercise.objects.create(clinician=self.john)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.helen.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cannot_delete_system_exercise(self):
        exercise = Exercise.objects.create(clinician=self.admin, is_system=True)
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='fr')
        ExerciseI18n.objects.create(description='Lorem ipsum', parent=exercise, language='en')

        token = self.login(self.helen.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
