# coding: utf-8
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
