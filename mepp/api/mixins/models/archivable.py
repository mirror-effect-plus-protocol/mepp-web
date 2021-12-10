# coding: utf-8
from django.db import models


class Archivable(models.Model):

    archived = models.BooleanField(default=False)

    class Meta:
        abstract = True


