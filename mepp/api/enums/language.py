# coding: utf-8
from .base import BaseEnum


class LanguageEnum(BaseEnum):
    """
    Values for supported languages in the application
    """
    EN = 'en'
    FR = 'fr'

    default = EN
