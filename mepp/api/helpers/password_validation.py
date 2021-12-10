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
