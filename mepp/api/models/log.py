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

from django.db import models

from mepp.api.enums.action import ActionEnum
from .base import BaseModel
from .session import Session


class Log(BaseModel):

    session = models.ForeignKey(
        Session,
        on_delete=models.CASCADE,
        related_name='logs',
    )
    action = models.PositiveSmallIntegerField(
        choices=ActionEnum.choices(),
        default=ActionEnum.default.value,
    )
    exercise_index = models.PositiveSmallIntegerField(null=True)

    CONNECTION_ACTIONS = [
        ActionEnum.LOGIN.name,
        ActionEnum.LOGOUT.name,
    ]

    SESSION_ACTIONS = [
        ActionEnum.START_SESSION.name,
        ActionEnum.RESTART_SESSION.name,
    ]

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.id} - Session #{self.session.uid} ({ActionEnum(self.action)})'

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        super().save(force_insert, force_update, using, update_fields)
        action = ActionEnum(self.action)
        if (
            action.name in Log.CONNECTION_ACTIONS
            or action.name in Log.SESSION_ACTIONS
        ):
            if (
                action == ActionEnum.LOGOUT
                or action == ActionEnum.RESTART_SESSION
            ):
                self.session.close()
        else:
            self.session.update_exercise(action, self.exercise_index)
