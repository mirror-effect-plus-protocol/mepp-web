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
