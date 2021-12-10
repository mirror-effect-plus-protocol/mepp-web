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

from mepp.api.models.category import (
    Category,
    SubCategory,
    SubCategoryI18n,
    CategoryI18n,
)
from mepp.api.serializers import (
    I18nSerializer,
    HyperlinkedModelUUIDSerializer,
)


class SubCategoryI18nSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategoryI18n
        fields = [
            'name',
            'language',
        ]
        list_serializer_class = I18nSerializer


class SubCategorySerializer(HyperlinkedModelUUIDSerializer):

    i18n = SubCategoryI18nSerializer(many=True)

    class Meta:
        model = SubCategory
        fields = [
            'id',
            'i18n',
        ]


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
    sub_categories = SubCategorySerializer(many=True)

    class Meta:
        model = Category
        fields = [
            'id',
            'url',
            'i18n',
            'sub_categories',
        ]
