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
