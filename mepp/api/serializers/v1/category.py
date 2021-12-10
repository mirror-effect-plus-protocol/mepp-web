# coding: utf-8
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
