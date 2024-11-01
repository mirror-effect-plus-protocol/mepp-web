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

from rest_framework import serializers

from mepp.api.enums.language import LanguageEnum
from mepp.api.models.category import (
    Category,
    CategoryI18n,
)
from mepp.api.serializers import (
    I18nSerializer,
    HyperlinkedModelUUIDSerializer,
)


class CategoryI18nSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoryI18n
        fields = [
            'name',
            'language',
        ]
        list_serializer_class = I18nSerializer


class CategorySerializer(HyperlinkedModelUUIDSerializer):

    i18n = CategoryI18nSerializer(many=True)
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            'id',
            'url',
            'i18n',
            'children',
        ]

    def get_children(self, category: Category) -> list:
        request = self.context.get('request')
        language = request.query_params.get(
            'language', LanguageEnum.default.value
        )
        children = category.children.filter(i18n__language=language).order_by(
            'i18n__name'
        )
        if children.exists():
            return CategorySerializer(children, many=True, context=self.context).data
        return []

    def get_parents(self, category: Category) -> list:
        parents = []
        current_category = category
        while parent := current_category.parent:
            i18n = {'name': {}}
            for category_i18n in parent.i18n.all():
                i18n['name'][category_i18n.language] = category_i18n.name
            parents.insert(0, {
                'id': parent.uid,
                'i18n': i18n,
            })
            current_category = current_category.parent

        return parents

    def to_representation(self, category: Category):
        representation = super().to_representation(category)
        if not representation['children']:
            representation['parents'] = self.get_parents(category)
        else:
            representation['parents'] = []
        return representation
