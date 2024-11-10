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
from django.conf import settings
from rest_framework import status

from mepp.api.enums.language import LanguageEnum
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

    def test_list_exercises_as_clinician(self):
        url = self.reverse('exercise-list')
        token = self.login(self.helen.username, self.common_password)
        exercises_count = Exercise.objects.all().count()
        response = self.client.get(
            url,
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], exercises_count)

    def test_list_exercises_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.get(
            self.reverse('exercise-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AdminExerciseCreateAPITestCase(BaseV1TestCase):

    def test_create_exercise_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self._get_exercise_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_cannot_create_exercise_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self._get_exercise_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_exercise_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self._get_exercise_dict(),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_not_valid_exercise(self):
        exercise = self._get_exercise_dict()
        del exercise['i18n']
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=exercise,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def _get_exercise_dict():
        category = Category.objects.first()
        exercise_dict = {
            'archived': False,
            'i18n': {
                'description': {}
            },
            'movement_duration': 1,
            'pause': 1,
            'repetition': 1,
            'categories': [{'id': category.uid}],
        }
        for code, _ in list(LanguageEnum.choices()):
            exercise_dict['i18n']['description'][code] = f'Description: Lorem ipsum {code}'

        return exercise_dict


class AdminExerciseUpdateAPITestCase(BaseV1TestCase):

    def setUp(self):
        super().setUp()
        self.exercise = Exercise.objects.create()
        for code, _ in list(LanguageEnum.choices()):
            ExerciseI18n.objects.create(
                description='Lorem ipsum', parent=self.exercise, language=code
            )

    def test_update_exercise_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cannot_update_exercise_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_exercise_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            data={'archived': True},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_update_not_valid_exercise(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.patch(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            data={'i18n': {}},
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class AdminExerciseDeleteAPITestCase(BaseV1TestCase):

    def setUp(self):
        super().setUp()
        self.exercise = Exercise.objects.create()
        for code, _ in list(LanguageEnum.choices()):
            ExerciseI18n.objects.create(
                description='Lorem ipsum', parent=self.exercise, language=code
            )

    def test_delete_exercise_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_cannot_delete_exercise_as_clinician(self):
        token = self.login(self.john.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_exercise_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.delete(
            self.reverse('exercise-detail', args=(self.exercise.uid,)),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
