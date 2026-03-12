# ruff: noqa
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

import os

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
try:
    SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
except KeyError:
    raise Exception('DJANGO_SECRET_KEY must be set in the environment.')

DEBUG = False

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_TRUSTED_ORIGINS = [
    'https://mirroreffectplus.org',
    'https://www.mirroreffectplus.org',
    'https://staging.mirroreffectplus.org',
]
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True

ALLOWED_HOSTS = ['staging.mirroreffectplus.org']

DJANGO_REST_MULTITOKENAUTH_RESET_TOKEN_EXPIRY_TIME = 0.20  # 10 minutes
DJANGO_REST_PASSWORDRESET_NO_INFORMATION_LEAKAGE = True

# Should include scheme and domain name
HTTP_HOST = os.environ.get('HTTP_HOST', 'https://staging.mirroreffectplus.org')
