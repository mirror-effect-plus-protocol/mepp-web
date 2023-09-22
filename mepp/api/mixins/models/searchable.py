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

import re
from django.db import models

from mepp.api.helpers.strings import normalize
from mepp.api.models.base import BaseI18nModel


class Searchable(models.Model):

    fulltext_search = models.TextField(default='')

    class Meta:
        abstract = True

    def update_fulltext_search(self, save: bool = True):
        """
        Update fulltext field and save in DB if `save` is True.
        `save` must be False when calling this method from `.save()` to
        avoid maximum recursion depth.
        """
        fulltext_words = []
        records = self.__class__.objects.values_list(
            *self.fulltext_search_fields
        ).filter(pk=self.pk)
        for record in records:
            for index in range(len(self.fulltext_search_fields)):
                normalized_str = normalize(record[index])
                for word in normalized_str.split(' '):
                    fulltext_words.append(word.lower())

        fulltext_search = ' '.join(list(set(fulltext_words)))
        self.fulltext_search = f' {fulltext_search} '
        print('SELF.fulltext_search', self.fulltext_search, flush=True)
        if save:
            self.save(update_fields=['fulltext_search'])


class I18nSearchable(BaseI18nModel):

    class Meta(BaseI18nModel.Meta):
        abstract = True

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )
        self.parent.update_fulltext_search()
