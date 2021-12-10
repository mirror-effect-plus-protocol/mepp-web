# coding: utf-8
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
