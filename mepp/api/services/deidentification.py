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

"""
Build research-ready, de-identified datasets from production data.

The output contains no direct identifiers (name, email, free text). Subjects
are mapped to a stable pseudonymous `research_id` using HMAC-SHA256 keyed on
RESEARCH_DEID_SALT, which is intentionally separate from SECRET_KEY so that
a compromise of one does not allow re-identification.
"""

import hashlib
import hmac
from datetime import datetime

from django.conf import settings

SAFE_USER_FIELDS = (
    'research_id',
    'clinician_research_id',
    'language',
    'side',
    'is_anonymized',
    'is_archived',
    'created_month',
    'last_login_month',
)

SAFE_SESSION_FIELDS = (
    'session_research_id',
    'research_id',
    'treatment_plan_uid',
    'status',
    'n_exercises',
    'n_completed',
    'created_at',
    'modified_at',
)

SAFE_LOG_FIELDS = (
    'session_research_id',
    'action',
    'exercise_index',
    'created_at',
)


class DeidentificationConfigError(Exception):
    """Raised when the de-identification salt is missing or misconfigured."""


def _get_salt() -> bytes:
    salt = getattr(settings, 'RESEARCH_DEID_SALT', None)
    if not salt:
        raise DeidentificationConfigError(
            'RESEARCH_DEID_SALT is not set. Configure a strong random value '
            'in the environment before running the export.'
        )
    if isinstance(salt, str):
        salt = salt.encode()
    return salt


def research_id_for(user_pk) -> str:
    """
    Return a stable pseudonymous identifier for a user. Same input produces
    the same output across runs, enabling longitudinal analysis without
    storing direct identifiers.
    """
    if user_pk is None:
        return ''
    salt = _get_salt()
    payload = f'user:{user_pk}'.encode()
    return hmac.new(salt, payload, hashlib.sha256).hexdigest()[:16]


def session_research_id_for(session_pk) -> str:
    if session_pk is None:
        return ''
    salt = _get_salt()
    payload = f'session:{session_pk}'.encode()
    return hmac.new(salt, payload, hashlib.sha256).hexdigest()[:16]


def _month(value) -> str:
    if value is None:
        return ''
    if isinstance(value, datetime):
        return value.strftime('%Y-%m')
    return value.strftime('%Y-%m')


def serialize_subject(user) -> dict:
    """
    Map a User row to its de-identified projection. Only fields listed in
    SAFE_USER_FIELDS are emitted; direct identifiers (name, email, username)
    are never read.
    """
    return {
        'research_id': research_id_for(user.pk),
        'clinician_research_id': research_id_for(user.clinician_id),
        'language': user.language,
        'side': user.side,
        'is_anonymized': bool(user.anonymized_at),
        'is_archived': bool(user.archived),
        'created_month': _month(user.date_joined),
        'last_login_month': _month(user.last_login),
    }


def serialize_session(session) -> dict:
    exercises = session.exercises or []
    n_completed = sum(
        1 for e in exercises if (e or {}).get('status') == 'COMPLETED'
    )
    return {
        'session_research_id': session_research_id_for(session.pk),
        'research_id': research_id_for(session.patient_id),
        'treatment_plan_uid': session.treatment_plan.uid,
        'status': session.status,
        'n_exercises': len(exercises),
        'n_completed': n_completed,
        'created_at': session.created_at.isoformat(),
        'modified_at': session.modified_at.isoformat(),
    }


def serialize_log(log) -> dict:
    return {
        'session_research_id': session_research_id_for(log.session_id),
        'action': log.action,
        'exercise_index': log.exercise_index,
        'created_at': log.created_at.isoformat(),
    }
