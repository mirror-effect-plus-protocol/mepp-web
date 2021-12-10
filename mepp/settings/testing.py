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

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '7i#n8(6)bl94^yo-3_s3*^4)xw-k+zu3xmx_e0pejfvks**vt^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['testserver']

USE_X_FORWARDED_HOST = True

AUTH_PASSWORD_VALIDATORS = [
]

INSTALLED_APPS.append('mepp.devtools')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.test.sqlite3',
    }
}

# Time in seconds
MIRROR_SESSION_TIMEOUT = 5

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

HTTP_HOST = 'http://testserver'
