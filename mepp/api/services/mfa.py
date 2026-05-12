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
import hmac
import secrets
from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone

from mepp.api.models.mfa import MFAChallenge


class MFAError(Exception):
    """Base exception for MFA verification failures."""


class MFAChallengeNotFoundError(MFAError):
    pass


class MFAChallengeExpiredError(MFAError):
    pass


class MFAChallengeLockedError(MFAError):
    pass


class MFAInvalidCodeError(MFAError):
    pass


def requires_mfa(user) -> bool:
    """
    Return True if this user must complete an MFA step to obtain a token.

    Patients (non-staff) bypass MFA. Staff and superusers are gated by the
    MFA_REQUIRED_FOR_STAFF flag.
    """
    if not getattr(settings, 'MFA_REQUIRED_FOR_STAFF', True):
        return False
    return bool(user.is_staff or user.is_superuser)


def _hash_code(code: str) -> str:
    return hashlib.sha256(code.encode()).hexdigest()


def _generate_code() -> str:
    length = getattr(settings, 'MFA_CODE_LENGTH', 6)
    upper = 10 ** length
    return f'{secrets.randbelow(upper):0{length}d}'


def create_challenge(user) -> tuple[MFAChallenge, str]:
    """
    Invalidate any previous non-consumed challenge for this user and create a
    fresh one. Returns the persisted challenge and the plaintext code (the
    caller is expected to deliver it out-of-band and discard it immediately).
    """
    ttl = getattr(settings, 'MFA_CODE_TTL_SECONDS', 300)
    code = _generate_code()

    with transaction.atomic():
        MFAChallenge.objects.filter(
            user=user, consumed_at__isnull=True,
        ).delete()

        challenge = MFAChallenge.objects.create(
            user=user,
            code_hash=_hash_code(code),
            expires_at=timezone.now() + timedelta(seconds=ttl),
        )

    return challenge, code


def send_challenge_email(user, code: str) -> None:
    subject = getattr(
        settings,
        'MFA_EMAIL_SUBJECT',
        'MEPP — verification code',
    )
    ttl_minutes = getattr(settings, 'MFA_CODE_TTL_SECONDS', 300) // 60
    body = (
        f'Bonjour {user.first_name or user.username},\n\n'
        f'Votre code de vérification MEPP est : {code}\n'
        f'Ce code est valide pendant {ttl_minutes} minutes.\n'
        "Si vous n'êtes pas à l'origine de cette demande, ignorez ce courriel.\n\n"
        f'---\n\n'
        f'Hello {user.first_name or user.username},\n\n'
        f'Your MEPP verification code is: {code}\n'
        f'This code is valid for {ttl_minutes} minutes.\n'
        f'If you did not request this code, please ignore this email.\n'
    )

    send_mail(
        subject=subject,
        message=body,
        from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', None),
        recipient_list=[user.email],
        fail_silently=False,
    )


def verify_challenge(challenge_id: str, code: str) -> MFAChallenge:
    """
    Verify a code against an existing challenge.

    On success, the challenge is marked consumed and returned. On failure,
    a typed MFAError subclass is raised. The attempts counter is incremented
    on every wrong-code submission to support lockout.

    Note: increments and the success update are committed independently so
    that the lockout counter cannot be reverted by raising an exception
    inside a surrounding atomic block.
    """
    try:
        challenge = MFAChallenge.objects.get(challenge_id=challenge_id)
    except MFAChallenge.DoesNotExist as exc:
        raise MFAChallengeNotFoundError() from exc

    if challenge.is_consumed:
        raise MFAChallengeNotFoundError()

    if challenge.is_expired:
        raise MFAChallengeExpiredError()

    if challenge.is_locked:
        raise MFAChallengeLockedError()

    submitted_hash = _hash_code(code)
    if not hmac.compare_digest(submitted_hash, challenge.code_hash):
        challenge.attempts += 1
        challenge.save(update_fields=['attempts'])
        if challenge.is_locked:
            raise MFAChallengeLockedError()
        raise MFAInvalidCodeError()

    challenge.consumed_at = timezone.now()
    challenge.save(update_fields=['consumed_at'])
    return challenge
