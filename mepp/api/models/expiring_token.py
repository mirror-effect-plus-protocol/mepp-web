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

from datetime import datetime, timedelta

from django.conf import settings
from django.db import models
from django.utils.timezone import now
from rest_framework.authtoken.models import Token


def get_expiry_date(mode: str = 'default') -> datetime:
    return now() + timedelta(seconds=settings.TOKEN_EXPIRY_TTLS[mode])


class ExpiringToken(Token):
    """
    Extend DRF Token class to support expiry date.
    """
    expiry_date = models.DateTimeField(default=get_expiry_date)
    temporary = models.BooleanField(default=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='auth_token',
        on_delete=models.CASCADE,
    )

    class Meta(Token.Meta):
        constraints = [
            models.UniqueConstraint(
                fields=['key', 'user', 'temporary'],
                name='token_unique'
            ),
        ]

    def extend_expiry(self):
        if not self.temporary:
            self.expiry_date = now() + timedelta(
                seconds=settings.TOKEN_EXPIRY_TTLS['authenticated']
            )
            self.save(update_fields=['expiry_date'])

    @property
    def is_expired(self):
        return now() >= self.expiry_date

    def save(self, *args, **kwargs):
        if not self.pk:
            if self.temporary:
                if not self.expiry_date:
                    self.expiry_date = get_expiry_date()
            else:
                self.expiry_date = get_expiry_date('authenticated')

        return super().save(*args, **kwargs)
