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

import os

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'kp=$wi=6z&i7=%sy!8ab=x5z*7ht6ij^h*y1hjcxtc_lmlvsli'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['mepp.local']

USE_X_FORWARDED_HOST = True

INSTALLED_APPS.append('mepp.devtools')

# Time in seconds
MIRROR_SESSION_TIMEOUT = 60 * 10  # 10 minutes

# Should include scheme and domain name
HTTP_HOST = os.environ.get('HTTP_HOST', 'http://mepp.local:9090')

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
