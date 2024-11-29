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
from django.utils.translation import gettext_lazy as _

from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import UUIDField

from .base import (
    BaseI18nModel,
    BaseModel,
)


class Category(BaseModel):
    """
    Categories for exercises
    """
    uid = UUIDField('c')
    parent = models.ForeignKey(
        'Category', related_name='children', on_delete=models.CASCADE, null=True
    )
    index = models.IntegerField(default=0)

    class Meta:
        verbose_name = _('category')
        verbose_name_plural = _('categories')

    def __str__(self):
        name = (
            self.i18n.filter(language=LanguageEnum.default.value)
            .values_list('name', flat=True)
            .first()
        ) or self.uid
        return name

    @property
    def label(self):
        """
        Generate a custom label for the category, including its hierarchy.
        """
        # depth = len(self.parents)
        # return f"{'— ' * depth} {self.i18n.get(language=LanguageEnum.default.value).name}"

        hierarchy = ''
        default_language = LanguageEnum.default.value
        for index, parent in enumerate(self.parents):
            hierarchy += parent.i18n.get(language=default_language).name + ' > '

        return hierarchy + self.i18n.get(language=default_language).name

    @property
    def parents(self) -> list['Category']:
        """
        Retrieve all parent categories recursively without extra DB queries.
        """
        parents = []
        current = self.parent
        while current:
            parents.insert(0, current)  # Insert at the beginning to maintain order
            # Use preloaded relations if available
            current = getattr(current, 'parent', None)
        return parents


class CategoryI18n(BaseI18nModel):

    parent = models.ForeignKey(
        Category, related_name='i18n', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50, null=False)

    class Meta:
        verbose_name = _('translation')
        verbose_name_plural = _('translations')

    def __str__(self):
        return f'{self.name} ({self.language})'
