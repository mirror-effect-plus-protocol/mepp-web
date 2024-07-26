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

from django.conf import settings
from django.db import models
from django.utils import timezone


from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import UUIDField
from mepp.api.mixins.models.archivable import Archivable
from mepp.api.mixins.models.searchable import (
    I18nSearchable,
    Searchable,
)
from mepp.api.mixins import Template
from .base import BaseModel
from .exercise import Exercise


class TreatmentPlan(BaseModel, Archivable, Template, Searchable):

    fulltext_search_fields = [
        'i18n__name',
    ]

    uid = UUIDField('tp')
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='patient_treatment_plans',
    )
    clinician = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        related_name='clinician_treatment_plans',
    )
    exercises = models.ManyToManyField(Exercise,
                                       through='TreatmentPlanExerciseM2M')
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    daily_repeat = models.PositiveSmallIntegerField(null=False, default=3)
    active = models.BooleanField(null=True)
    randomize = models.BooleanField(default=False)

    class Meta:
        ordering = ['i18n__name']

    def __str__(self):
        name = (
            self.i18n.filter(language=LanguageEnum.default.value)
            .values_list('name', flat=True)
            .first()
        ) or self.uid
        return name

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__previous_active_value = self.active
        self.__previous_archived_value = self.archived

    def clone(
        self,
        new_clinician: 'User',
        patient: 'User' = None,
        is_template: bool = False,
        is_system: bool = False,
    ) -> 'TreatmentPlan':
        cloned_plan = TreatmentPlan.objects.get(pk=self.pk)
        cloned_plan.pk = None
        cloned_plan.uid = None
        cloned_plan.clinician = new_clinician
        cloned_plan.patient = patient
        cloned_plan.is_template = is_template
        cloned_plan.is_system = is_system
        cloned_plan.created_at = timezone.now()
        cloned_plan.modified_at = None
        cloned_plan.start_date = None
        cloned_plan.end_date = None
        if is_template:
            cloned_plan.template = None
        else:
            cloned_plan.template = self
        cloned_plan.save()

        # Clone exercises
        for m2m in TreatmentPlanExerciseM2M.objects.filter(treatment_plan=self):
            cloned_m2m = TreatmentPlanExerciseM2M.objects.get(pk=m2m.pk)
            cloned_m2m.pk = None
            cloned_m2m.treatment_plan = cloned_plan
            cloned_m2m.save()

        # Clone i18n
        for i18n in self.i18n.all():
            cloned_i18n = TreatmentPlanI18n.objects.get(pk=i18n.pk)
            cloned_i18n.pk = None
            cloned_i18n.parent = cloned_plan
            cloned_i18n.name = f'CLONE: {cloned_i18n.name}'
            cloned_i18n.save()

        return cloned_plan

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):

        if self.pk is None and self.patient:
            # Activate the treatment plan if none exists.
            if not self.patient.patient_treatment_plans.filter(
                active=True
            ).exists():
                self.start_date = timezone.now()
                self.active = True

        if self.patient and self.is_template:
            raise ValueError('Cannot assign a template to a patient')

        self.set_archived()
        self.set_active()

        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )

    def set_active(self):
        """
        Apply logic when `active` has changed:
        - Update other objects
        - Update `start_date` and `end_date` if needed
        """
        # If plan is not active or does not belong to a patient,
        # there is nothing to do.
        if not self.patient:
            return

        # If `self.active` did not change,
        # there is nothing to do.
        if self.__previous_active_value == self.active:
            return

        if self.active:
            TreatmentPlan.objects.filter(
                patient=self.patient, active=True
            ).exclude(pk=self.pk).update(end_date=timezone.now(), active=False)
            if not self.start_date:
                self.start_date = timezone.now()
            self.end_date = None
        else:
            self.end_date = timezone.now()

    def set_archived(self):
        """
        Apply logic when `archived` has changed:
        - Update `active` if object has just been archived
        """
        if not self.archived or not self.patient:
            return

        if self.__previous_archived_value == self.archived:
            return

        if self.archived:
            self.active = False


class TreatmentPlanExerciseM2M(BaseModel):

    treatment_plan = models.ForeignKey(TreatmentPlan, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    movement_duration = models.PositiveSmallIntegerField(null=False)
    repetition = models.PositiveSmallIntegerField(null=False)
    pause = models.PositiveSmallIntegerField(null=False)
    index = models.PositiveSmallIntegerField(null=False)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        # Copy exercise timers if not provided when the instance is created.
        # It is useful to customize timers for this specific treatment without
        # modifying the template.
        if self.pk is None:
            if self.movement_duration is None:
                self.movement_duration = self.exercise.movement_duration
            if self.repetition is None:
                self.repetition = self.exercise.repetition
            if self.pause is None:
                self.pause = self.exercise.pause
            if self.index is None:
                self.index = self.treatment_plan.exercises.count()

        super().save(force_insert, force_update, using, update_fields)


class TreatmentPlanI18n(I18nSearchable):

    parent = models.ForeignKey(
        TreatmentPlan, related_name='i18n', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200, null=False)

    def __str__(self):
        return f'{self.name} ({self.language})'
