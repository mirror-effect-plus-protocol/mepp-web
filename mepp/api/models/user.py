# coding: utf-8
from datetime import timedelta
from typing import Optional

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

from mepp.api.enums import (
    LanguageEnum,
    SideEnum,
    StatusEnum,
)
from mepp.api.fields.uuid import UUIDField
from mepp.api.mixins.models.archivable import Archivable
from mepp.api.mixins.models.searchable import Searchable
from mepp.api.models.expiring_token import ExpiringToken
from .plan import TreatmentPlan
from .session import Session


class User(AbstractUser, Archivable, Searchable):

    fulltext_search_fields = [
        'first_name',
        'last_name',
        'email',
    ]

    uid = UUIDField('u')
    language = models.CharField(
        choices=LanguageEnum.choices(),
        default=LanguageEnum.default.value,
        max_length=2,
    )
    use_audio = models.BooleanField(null=True)
    side = models.PositiveSmallIntegerField(
        choices=SideEnum.choices(),
        null=True,
    )
    clinician = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='patients',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    def __init__(self, *args, **kwargs):
        self.email_has_changed = False
        super().__init__(*args, **kwargs)

    @property
    def active_session(self) -> Optional[Session]:
        """
        Get current active session. The session can be still in progress (e.g.:
        the patient has put their session on hold for a moment).

        If a session has been active for more than `settings.MIRROR_SESSION_TIMEOUT`
        minutes, it is automatically flagged as inactive.
        """
        threshold = timezone.now() - timedelta(seconds=settings.MIRROR_SESSION_TIMEOUT)
        try:
            session = self.sessions.get(
                active=True,
                status__in=[
                    StatusEnum.IN_PROGRESS.value,
                    StatusEnum.CREATED.value,
                ],
                modified_at__gt=threshold,
            )
        except Session.DoesNotExist:
            if not self.active_treatment_plan:
                return None
            session = Session.objects.create(
                patient=self, treatment_plan=self.active_treatment_plan
            )

        # Set all other user's sessions inactive
        Session.objects.filter(patient=self).exclude(pk=session.pk).update(
            active=False
        )

        # Set all user's inactive sessions to uncompleted if they were not
        # completed successfully.
        Session.objects.filter(patient=self, active=False).exclude(
            status=StatusEnum.COMPLETED.value
        ).update(status=StatusEnum.UNCOMPLETED.value)

        return session

    @property
    def active_treatment_plan(self) -> TreatmentPlan:
        """
        Get active treatment plan. Only patients can have a treatment plan
        """
        if self.is_staff:
            raise ValueError('Staff members cannot have treatment plans')

        return self.patient_treatment_plans.filter(
            active=True,
        ).first()

    def generate_new_token(self) -> ExpiringToken:
        try:
            token = ExpiringToken.objects.get(user=self, temporary=False)
        except ExpiringToken.DoesNotExist:
            pass
        else:
            token.delete()
        return self.token

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):

        if self.pk is not None:
            self.email_has_changed = self.email != self.username
            self.previous_email = self.username
        else:
            # When user is created through Django admin, e-mail field may be empty
            # Let's init it with the username
            if not self.email:
                self.email = self.username

        self.username = self.email
        self.update_fulltext_search(save=False)

        # Set `is_active` to `archived` all the time.
        # We do not want users to be able to log in if they are inactive
        self.is_active = not self.archived

        # ToDo archive related objects when user is archived
        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )

    @property
    def token(self) -> str:
        token, created = ExpiringToken.objects.get_or_create(
            user=self, temporary=False
        )
        return token.key
