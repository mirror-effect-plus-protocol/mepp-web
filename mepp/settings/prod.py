# coding: utf-8
from .staging import *

ALLOWED_HOSTS = ['mirroreffectplus.org', 'www.mirroreffectplus.org']
HTTP_HOST = os.environ.get('HTTP_HOST', 'https://www.mirroreffectplus.org')
