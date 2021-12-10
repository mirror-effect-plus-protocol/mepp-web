# coding: utf-8
from rest_framework import status

from mepp.api.models.exercise import Exercise, ExerciseI18n
from mepp.api.models.category import SubCategory
from . import BaseV1TestCase


class AdminExerciseListAPITestCase(BaseV1TestCase):

    def test_list_exercises_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        exercices_count = Exercise.objects.all().count()
        response = self.client.get(
            self.reverse('exercise-list'),
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], exercices_count)

    def test_list_exercises_as_clinician_not_system(self):
        url = self.reverse('exercise-list') + '?is_system=false'
        token = self.login(self.helen.username, self.common_password)
        exercises_count = Exercise.objects.filter(clinician=self.helen, is_system=False).count()
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

    def create_exercise(self, user, **kwargs):
        sub_category = SubCategory.objects.first()
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
            'repeat': 1,
            'sub_categories': [
                {'uid': sub_category.uid}
            ],
            'is_system': kwargs.get('is_system', False)
        }

    def test_create_exercise_as_admin(self):
        token = self.login(self.admin.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self.create_exercise(self.admin),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_exercise_as_clinician(self):
        token = self.login(self.helen.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self.create_exercise(self.helen),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_exercise_as_patient(self):
        token = self.login(self.patient_john.username, self.common_password)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=self.create_exercise(self.patient_john),
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_cannot_create_not_valid_exercise(self):
        exercise = self.create_exercise(self.helen)
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
        exercise = self.create_exercise(self.helen, is_system=True)
        response = self.client.post(
            self.reverse('exercise-list'),
            data=exercise,
            format='json',
            **self.get_token_header(token),
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


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

    def test_cannot_update_system_exercise_as_admin(self):
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

