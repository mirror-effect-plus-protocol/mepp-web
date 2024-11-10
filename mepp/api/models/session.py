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

import time
from collections import defaultdict

from django.conf import settings
from django.db import models

from mepp.api.enums import (
    ActionEnum,
    StatusEnum,
)
from mepp.api.exceptions import SessionStatusException
from mepp.api.fields.uuid import UUIDField
from mepp.api.models.plan import TreatmentPlanExerciseM2M

from .base import BaseModel


class Session(BaseModel):

    uid = UUIDField('s')
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sessions',
    )
    treatment_plan = models.ForeignKey(
        'TreatmentPlan',
        on_delete=models.CASCADE,
        related_name='sessions',
    )
    exercises = models.JSONField()
    status = models.PositiveSmallIntegerField(
        choices=StatusEnum.choices(),
        default=StatusEnum.default.value,
    )
    active = models.BooleanField(default=True)

    IMMUTABLE_STATUSES = [
        StatusEnum.COMPLETED.name,
        StatusEnum.SKIPPED.name,
        StatusEnum.UNCOMPLETED.name,
    ]

    class Meta:
        ordering = ['created_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__status = self.status

    def __str__(self):
        return (
            f'{self.patient.get_full_name()} - '
            f'{StatusEnum(self.status)} ({self.uid})'
        )

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        if self.pk is None:
            self.__create_exercices()
        elif self.__status != self.status:
            raise SessionStatusException

        super().save(force_insert, force_update, using, update_fields)

    def close(self):
        """
        Close the session (i.e.: setting `active` property to `False`).
        The status is also updated before closing the session.
        """
        self.update_status(auto_save=False)
        self.active = False
        self.save()

    def update_exercise(self, action: ActionEnum, index: int):
        """
        Map the `action` done by the patient to a specific status.
        The status of exercise at `index` position is updated if it is not
        already flagged as 'COMPLETED'.

        Exercises are executed in the sequential way. No previous exercises
        should have an invalid status.
        """
        if not self.active:
            raise Exception('Cannot update. Session is inactive')

        if self.exercises[index]['status'] == StatusEnum.COMPLETED.name:
            return

        if action == ActionEnum.DONE:
            self.exercises[index]['status'] = StatusEnum.COMPLETED.name
        elif action == ActionEnum.SKIP:
            self.exercises[index]['status'] = StatusEnum.SKIPPED.name
        elif action == ActionEnum.PAUSE:
            self.exercises[index]['status'] = StatusEnum.PAUSED.name
        elif action in [ActionEnum.RESUME, ActionEnum.START]:
            self.exercises[index]['status'] = StatusEnum.IN_PROGRESS.name

        self.exercises[index]['modified_at'] = int(time.time())

        if index:
            # Validate previous exercise statuses
            for idx in range(index):
                if self.exercises[idx]['status'] in Session.IMMUTABLE_STATUSES:
                    continue

                self.exercises[idx]['status'] = StatusEnum.UNCOMPLETED.name
                self.exercises[idx]['modified_at'] = int(time.time())

        self.update_status()

    def update_status(self, auto_save: bool = True):
        """
        Update the status of the session (based on the status of each exercise).
        The session is saved if `auto_save` is `True`.
        """
        if not self.active:
            return

        if self.status == StatusEnum.UNCOMPLETED.value:
            return

        statuses = defaultdict(int)

        for exercise in self.exercises:
            if exercise['status'] in Session.IMMUTABLE_STATUSES:
                statuses[StatusEnum[exercise['status']].name] += 1
                continue

            statuses[StatusEnum.IN_PROGRESS.name] += 1

        # Default status
        self.status = StatusEnum.IN_PROGRESS.value

        if (
            statuses[StatusEnum.UNCOMPLETED.name]
            or statuses[StatusEnum.SKIPPED.name]
        ):
            self.status = StatusEnum.UNCOMPLETED.value

        if statuses[StatusEnum.COMPLETED.name] == len(self.exercises):
            self.status = StatusEnum.COMPLETED.value

        # Update private property for save validation process
        self.__status = self.status

        if auto_save:
            self.save()

    def __create_exercices(self):
        """
        Copy the exercises from the treatment plan within the session.
        Useful to keep the history of the exercises during the treatment plan.
        The exercises could change during the treatment plan life.
        """
        treatment_plan = self.patient.active_treatment_plan
        exercises_through = TreatmentPlanExerciseM2M.objects.filter(
            treatment_plan=treatment_plan
        ).order_by('?' if treatment_plan.randomize else 'index')

        exercises = []
        for exercise_through in exercises_through:
            video = exercise_through.exercise.video
            video_url = video.url if video else ''
            exercise = {
                'movement_duration': exercise_through.movement_duration,
                'repetition': exercise_through.repetition,
                'pause': exercise_through.pause,
                'i18n': {},
                'status': StatusEnum.default.name,
                'video_url': video_url,
                # saved as timestamp to make `exercise` JSON serializable
                'modified_at': int(time.time()),
            }
            i18n = exercise_through.exercise.i18n.order_by('language')
            for exercise_i18n in i18n:
                exercise['i18n'][exercise_i18n.language] = exercise_i18n.description

            exercises.append(exercise)
        self.exercises = exercises
