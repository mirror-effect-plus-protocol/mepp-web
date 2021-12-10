# coding: utf-8
from collections import defaultdict

from django.db import models
from rest_framework import serializers
from rest_framework.fields import empty

from mepp.api.enums.language import LanguageEnum
from mepp.api.fields.uuid import (
    HyperlinkedUUIDIdentityField,
    HyperlinkedUUIDRelatedField,
)


class I18nSerializer(serializers.ListSerializer):

    def to_representation(self, data):
        """
        Override `ListSerializer` behaviour to expose i18n entries as a
        dictionary instead of a list
        """
        iterable = data.all() if isinstance(data, models.Manager) else data
        representation = defaultdict(dict)
        for item in iterable:
            child_repr = self.child.to_representation(item)
            language = child_repr.pop('language')
            for field in child_repr.keys():
                representation[field][language] = child_repr[field]

        return representation


class HyperlinkedModelUUIDSerializer(serializers.HyperlinkedModelSerializer):

    serializer_related_field = HyperlinkedUUIDRelatedField
    serializer_url_field = HyperlinkedUUIDIdentityField
    id = serializers.SerializerMethodField()

    def __init__(self, instance=None, data=empty, **kwargs):

        if data is not empty:
            data = self._sanitize_data(data)

        super().__init__(instance=instance, data=data, **kwargs)

    def get_id(self, obj: models.Model) -> str:
        return obj.uid

    def _sanitize_data(self, data: dict) -> dict:
        """
        Format data the way DRF expects it.
        The serializer exposes the data the way React-Admin expects but data is
        `POST`ed or `PATCH`ed, it has be to formatted back to DRF way.

        React-Admin needs translated fields to be a dict structured this way.
        ```
        {
           field: {
              language: '...'
           },
           ...
        }
        ```
        while DRF expects a list of dictionaries
        ```
        [
            {
                field: '...',
                language: 'fr|en'
            },
            ...
        ]
        ```

        """
        try:
            i18n_dict = data.pop('i18n')
        except KeyError:
            return data

        i18n_list = []
        for language in LanguageEnum:
            i18n = {
                'language': language.value
            }

            for item in i18n_dict.keys():
                try:
                    i18n[item] = i18n_dict[item][language.value]
                except KeyError:
                    pass

            i18n_list.append(i18n)

        data['i18n'] = i18n_list
        return data
