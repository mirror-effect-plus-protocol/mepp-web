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

from django.db import models

from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import UUIDField
from mepp.api.mixins import Template
from mepp.api.mixins.models.archivable import Archivable
from mepp.api.mixins.models.searchable import (
    I18nSearchable,
    Searchable,
)

from .base import BaseModel
from .category import Category


def upload_to(instance, filename):
    return os.path.join('__exercises', 'videos', instance.uid, filename)


class Exercise(BaseModel, Archivable, Template, Searchable):

    fulltext_search_fields = [
        'i18n__description',
    ]

    uid = UUIDField('e')
    categories = models.ManyToManyField(Category, related_name='exercises')
    movement_duration = models.PositiveSmallIntegerField(null=False, default=5)
    repetition = models.PositiveSmallIntegerField(null=False, default=3)
    pause = models.PositiveSmallIntegerField(null=False, default=5)
    auto_translate = models.BooleanField(default=False)
    video = models.FileField(upload_to=upload_to, null=True, blank=True)
    video_with_audio = models.BooleanField(default=False)

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
