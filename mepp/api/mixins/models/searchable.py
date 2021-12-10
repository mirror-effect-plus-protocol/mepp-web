# coding: utf-8
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

