# coding: utf-8
from uuid import uuid4

from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from rest_framework.relations import (
    HyperlinkedIdentityField,
    HyperlinkedRelatedField,
    RelatedField,
)


class HyperlinkedUUIDIdentityField(HyperlinkedIdentityField):
    """
    The API does not expose sequential primary key. This field lets us
    load the object by its `uid`.
    """
    lookup_field = 'uid'


class HyperlinkedUUIDRelatedField(HyperlinkedRelatedField):

    """
    The API does not expose sequential primary key. This field lets us
    load related object by its `uid`.
    """
    lookup_field = 'uid'


class UUIDField(models.CharField):
    """
    If empty, automatically populates itself with a UID before saving
    Simplify behaviour of Django UUIDField (i.e. retrieve JSON serializable object)
    """
    UUID_LENGTH = 32

    def __init__(self, uid_prefix):
        self.uid_prefix = uid_prefix
        total_length = len(uid_prefix) + self.UUID_LENGTH
        super().__init__(max_length=total_length, unique=True)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        kwargs['uid_prefix'] = self.uid_prefix
        del kwargs['max_length']
        del kwargs['unique']
        return name, path, args, kwargs

    def generate_uid(self):
        uuid_to_str = uuid4().hex
        return f'{self.uid_prefix}{uuid_to_str}'

    def pre_save(self, model_instance, add):
        value = getattr(model_instance, self.attname)
        if value == '' or value is None:
            value = self.generate_uid()
            setattr(model_instance, self.attname, value)
        return value


class UUIDRelatedField(RelatedField):

    def to_internal_value(self, uid):
        queryset = self.get_queryset()
        try:
            return queryset.get(uid=uid)
        except ObjectDoesNotExist:
            self.fail('does_not_exist', value=str(uid))
        except (TypeError, ValueError):
            self.fail('invalid')

    """
    Return serialized object as its `uid`
    """
    def to_representation(self, obj):
        return obj.uid
