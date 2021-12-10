# coding: utf-8
from django.db import models

from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import UUIDField
from .base import (
    BaseModel,
    BaseI18nModel,
)


class Category(BaseModel):
    """
    Exercise categories
    """
    uid = UUIDField('c')

    def __str__(self):
        name = (
            self.i18n.filter(language=LanguageEnum.default.value)
            .values_list('name', flat=True)
            .first()
        ) or self.uid
        return name


class CategoryI18n(BaseI18nModel):

    parent = models.ForeignKey(
        Category, related_name='i18n', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50, null=False)

    def __str__(self):
        return f'{self.name} ({self.language})'


class SubCategory(BaseModel):

    uid = UUIDField('sc')
    category = models.ForeignKey(
        Category, related_name='sub_categories', on_delete=models.CASCADE
    )

    def __str__(self):
        name = (
            self.i18n.filter(language=LanguageEnum.default.value)
            .values_list('name', flat=True)
            .first()
        ) or self.uid
        return name


class SubCategoryI18n(BaseI18nModel):

    parent = models.ForeignKey(
        SubCategory, related_name='i18n', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50, null=False)

    def __str__(self):
        return f'{self.name} ({self.language})'
