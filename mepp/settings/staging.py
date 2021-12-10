# coding: utf-8
import os

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
try:
    SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
except KeyError:
    raise Exception('DJANGO_SECRET_KEY must be set in the environment.')

DEBUG = False

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = ['staging.mirroreffectplus.org']

DJANGO_REST_MULTITOKENAUTH_RESET_TOKEN_EXPIRY_TIME = 0.20  # 10 minutes
DJANGO_REST_PASSWORDRESET_NO_INFORMATION_LEAKAGE = True

# Should include scheme and domain name
HTTP_HOST = os.environ.get('HTTP_HOST', 'https://staging.mirroreffectplus.org')
