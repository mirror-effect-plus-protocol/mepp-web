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

from django.contrib.auth import get_user_model
from rest_framework import serializers

from mepp.api.fields.uuid import UUIDRelatedField
from mepp.api.mixins.serializers.clinician import ClinicianValidatorMixin
from mepp.api.models.exercise import Exercise
from mepp.api.models.plan import (
    TreatmentPlan,
    TreatmentPlanExerciseM2M,
    TreatmentPlanI18n,
)
from mepp.api.serializers import (
    I18nSerializer,
    HyperlinkedModelUUIDSerializer,
    HyperlinkedUUIDRelatedField,
)
from mepp.api.serializers.v1.exercise import ExerciseI18nSerializer


class PatientTreatmentPlanSerializer(serializers.Serializer):

    patient = HyperlinkedUUIDRelatedField(
        lookup_field='uid',
        view_name='patient-detail',
        queryset=get_user_model().objects.filter(is_staff=False, archived=False)
    )
    treatment_plan = HyperlinkedUUIDRelatedField(
        lookup_field='uid',
        view_name='treatmentplan-detail',
        queryset=TreatmentPlan.objects.filter(is_template=True, archived=False)
    )

    class Meta:
        fields = [
            'patient',
            'treatment_plan'
        ]

    def create(self, validated_data):
        treatment_plan = validated_data['treatment_plan']
        patient = validated_data['patient']
        clone = treatment_plan.clone(patient.clinician, patient)
        return clone

    def to_representation(self, instance):
        return {
            'patient_url': instance.patient.uid,
            'treatment_plan_url': instance.uid
        }

    def validate_treatment_plan(self, treatment_plan):
        clinician = self.context['clinician']
        if clinician.is_superuser:
            return treatment_plan

        if (
            clinician.pk != treatment_plan.clinician_id
            and not treatment_plan.is_system
        ):
            raise serializers.ValidationError('Not found')

        return treatment_plan


class TreatmentPlanExerciseM2MSerializer(HyperlinkedModelUUIDSerializer):

    id = serializers.CharField(source='exercise.uid')
    i18n = ExerciseI18nSerializer(source='exercise.i18n', many=True)

    class Meta:
        model = TreatmentPlanExerciseM2M
        fields = [
            'id',
            'i18n',
            'index',
            'movement_duration',
            'pause',
            'repetition',
        ]
        read_only_fields = [
            'index',
        ]


class TreatmentPlanI18nSerializer(serializers.ModelSerializer):

    class Meta:
        model = TreatmentPlanI18n
        fields = [
            'name',
            'language',
        ]
        list_serializer_class = I18nSerializer


class TreatmentPlanSerializer(
    ClinicianValidatorMixin, HyperlinkedModelUUIDSerializer
):

    clinician_uid = serializers.SerializerMethodField()
    patient_uid = UUIDRelatedField(
        source='patient',
        queryset=get_user_model().objects.filter(is_staff=False),
        allow_null=True,
        required=False,
    )
    i18n = TreatmentPlanI18nSerializer(many=True)
    exercises = TreatmentPlanExerciseM2MSerializer(
        source='treatmentplanexercisem2m_set', many=True, read_only=True
    )

    class Meta:
        model = TreatmentPlan
        fields = [
            'id',
            'url',
            'clinician_uid',
            'i18n',
            'exercises',
            'daily_repeat',
            'created_at',
            'modified_at',
            'start_date',
            'end_date',
            'archived',
            'is_system',
            'is_template',
            'patient_uid',
            'active',
            'randomize',
        ]
        read_only_fields = [
            'clinician_uid',
            'created_at',
            'modified_at',
        ]

    def create(self, validated_data):
        request = self.context['request']
        validated_data['clinician'] = request.user
        # Remove both relationship objects before creating the `TreatmentPlan` instance
        exercises = validated_data.pop('exercises')
        i18n = validated_data.pop('i18n')

        # Force `is_system` to False if user is not a super user
        if not request.user.is_superuser:
            validated_data['is_system'] = False

        instance = super().create(validated_data=validated_data)

        # Save relationships
        self._update_exercises(instance, exercises)
        self._update_i18n(instance, i18n)
        return instance

    def get_clinician_uid(self, plan):
        return plan.clinician.uid

    def get_patient_uid(self, plan):
        if plan.patient:
            return plan.patient.uid
        return None

    def validate(self, attrs):
        self.validate_clinician_uid(attrs)
        exercises = self._validate_exercises()
        if exercises:
            attrs['exercises'] = exercises

        return attrs

    def validate_is_system(self, is_system):
        request = self.context['request']
        if (
            self.instance
            and self.instance.pk
            and self.instance.is_system
            and not request.user.is_superuser
        ):
            raise serializers.ValidationError('Action forbidden')

        if (
            not self.instance
            and is_system
            and not request.user.is_superuser
        ):
            raise serializers.ValidationError('Action forbidden')

        return is_system

    def validate_patient_uid(self, patient):
        if not patient:
            return

        request = self.context['request']
        user = request.user
        if not user.is_superuser and patient.clinician_id != user.pk:
            raise serializers.ValidationError('Patient not found')

        return patient

    def update(self, instance, validated_data):

        # Ensure that the owner is not overwritten by `PATCH` request
        try:
            del validated_data['clinician']
        except KeyError:
            pass

        try:
            exercises = validated_data.pop('exercises')
        except KeyError:
            pass
        else:
            self._update_exercises(instance, exercises)

        try:
            i18n = validated_data.pop('i18n')
        except KeyError:
            pass
        else:
            self._update_i18n(instance, i18n)

        return super().update(instance, validated_data)

    def _validate_exercises(self):
        request = self.context['request']

        try:
            exercises = request.data['exercises']
        except KeyError:
            if not self.instance:
                raise serializers.ValidationError(
                    {'exercises': 'This field is required'}
                )
            else:
                # Skip update of exercises
                return

        exercises_set = []

        for index, exercise in enumerate(exercises):
            try:
                exercise_obj = Exercise.objects.get(uid=exercise['id'])
            except Exercise.DoesNotExist:
                # Do not reveal presence of item in DB
                raise serializers.ValidationError({
                    'exercise': f"No exercises found with uid `{exercise['id']}`"
                })

            if (
                request.user.pk != exercise_obj.clinician_id
                and not request.user.is_superuser
                and not exercise_obj.is_system
            ):
                raise serializers.ValidationError({
                    'exercise': f"2 - No exercises found with uid `{exercise['id']}`"
                })

            tpe_m2m = TreatmentPlanExerciseM2M()
            tpe_m2m.exercise = exercise_obj
            try:
                tpe_m2m.index = index
                tpe_m2m.movement_duration = int(exercise['movement_duration'])
                tpe_m2m.repetition = int(exercise['repetition'])
                tpe_m2m.pause = int(exercise['pause'])
            except (ValueError, KeyError):
                raise serializers.ValidationError('Invalid values')

            exercises_set.append(tpe_m2m)

        return exercises_set

    def _update_exercises(self, instance: TreatmentPlan, exercises: list):
        # Disassociates all (sub)categories from current exercise
        instance.exercises.clear()
        for exercise in exercises:
            exercise.treatment_plan = instance
        TreatmentPlanExerciseM2M.objects.bulk_create(exercises)

        if instance.is_system:
            exercise_ids = [e.exercise_id for e in exercises]
            Exercise.objects.filter(pk__in=exercise_ids).update(is_system=True)

    def _update_i18n(self, instance: TreatmentPlan, i18n: list):
        for translation in i18n:
            try:
                translated_language = translation['language']
            except KeyError:
                raise serializers.ValidationError({
                    'i18n.language': 'Field is required'
                })

            try:
                translated_name = translation['name']
            except KeyError:
                raise serializers.ValidationError({
                    'i18n.name': (
                        f'Field is required for language: {translated_language}'
                    )
                })

            treatment_plan_i18n, _ = TreatmentPlanI18n.objects.get_or_create(
                language=translated_language, parent=instance
            )
            treatment_plan_i18n.name = translated_name
            treatment_plan_i18n.save()
