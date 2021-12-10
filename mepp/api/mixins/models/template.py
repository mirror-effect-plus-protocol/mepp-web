# coding: utf-8
from django.db import models


class Template(models.Model):

    is_system = models.BooleanField(default=False)
    is_template = models.BooleanField(default=False)
    template = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children',
    )

    class Meta:
        abstract = True
