# coding: utf-8
from django.db import models
from django.utils import timezone

from mepp.api.enums.language import LanguageEnum


class BaseModel(models.Model):

    class Meta:
        abstract = True

    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        self.modified_at = timezone.now()

        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )


class BaseI18nModel(BaseModel):

    language = models.CharField(
        max_length=2, default=LanguageEnum.default.value, null=False
    )

    class Meta(BaseModel.Meta):
        abstract = True
        unique_together = ['parent', 'language']
