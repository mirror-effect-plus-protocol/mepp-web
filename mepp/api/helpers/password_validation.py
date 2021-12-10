# coding: utf-8
import re

from django.conf import settings
from django.core.exceptions import ValidationError


class MeppPasswordValidator:

    def validate(self, password, user=None):
        if len(password) < int(settings.PASSWORD_MIN_LEN):
            raise ValidationError(
                'This password must contain at least %(min_length)d characters.',
                code='password_too_short',
                params={'min_length': int(settings.PASSWORD_MIN_LEN)},
            )

        pattern = rf'^{settings.PASSWORD_REGEX}{{{settings.PASSWORD_MIN_LEN},}}$'
        if not re.match(pattern, password):
            raise ValidationError(
                'This password must contain at least one lowercase letter, '
                'one uppercase letter, one digit and one special character (-_ @$!%*#?&)',
                code='password_not_secure',
            )

    def get_help_text(self):
        return (
            f'This password must contain at least {settings.PASSWORD_MIN_LEN} characters.'
            'Moreover, it must contain at least one lowercase letter, '
            'one uppercase letter, one digit and one special character (-_ @$!%*#?&).'
        )
