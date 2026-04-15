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

import hashlib

from django.conf import settings
from django.db import transaction
from django.utils import timezone

from mepp.api.models.expiring_token import ExpiringToken


def anonymize_user(user):
    """
    Anonymize a user account by replacing all PII with irreversible values.

    Sessions and logs are preserved (de-identified) for research purposes.
    The user account is archived and can no longer be used to log in.

    Raises ValueError if the user is already anonymized or is a staff member.
    """
    if user.is_anonymized:
        raise ValueError('User is already anonymized')

    if user.is_staff:
        raise ValueError('Staff members cannot be anonymized')

    anon_id = hashlib.sha256(
        f'{user.pk}{settings.SECRET_KEY}'.encode()
    ).hexdigest()[:12]

    with transaction.atomic():
        user.first_name = 'Anonymized'
        user.last_name = f'User-{anon_id}'
        user.email = f'anonymized-{anon_id}@anonymized.invalid'
        user.username = user.email
        user.side = None
        user.clinician = None
        user.mirror_settings = None
        user.use_audio = None
        user.archived = True
        user.anonymized_at = timezone.now()
        user.set_unusable_password()
        user.save()

        ExpiringToken.objects.filter(user=user).delete()

    return user
