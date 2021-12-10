# coding: utf-8
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
