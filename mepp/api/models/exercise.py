# coding: utf-8
from django.conf import settings
from django.db import models

from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import UUIDField
from mepp.api.mixins.models.archivable import Archivable
from mepp.api.mixins import Template
from mepp.api.mixins.models.searchable import (
    I18nSearchable,
    Searchable,
)
from .base import BaseModel
from .category import SubCategory


class Exercise(BaseModel, Archivable, Template, Searchable):

    fulltext_search_fields = [
        'i18n__description',
    ]

    uid = UUIDField('e')
    clinician = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='exercises',
        on_delete=models.CASCADE,
    )
    sub_categories = models.ManyToManyField(
        SubCategory, related_name='exercises'
    )
    movement_duration = models.PositiveSmallIntegerField(null=False, default=5)
    repeat = models.PositiveSmallIntegerField(null=False, default=3)
    pause = models.PositiveSmallIntegerField(null=False, default=5)

    def __str__(self):
        name = (
            self.i18n.filter(language=LanguageEnum.default.value)
            .values_list('description', flat=True)
            .first()
        ) or self.uid
        return name


class ExerciseI18n(I18nSearchable):

    parent = models.ForeignKey(
        Exercise, related_name='i18n', on_delete=models.CASCADE
    )
    description = models.TextField(null=False)

    def __str__(self):
        return f'{self.description} ({self.language})'


