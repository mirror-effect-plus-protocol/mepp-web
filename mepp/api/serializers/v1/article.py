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
from mepp.api.models.article import (
    Article,
    ArticleI18n,
)
from mepp.api.serializers import (
    HyperlinkedModelUUIDSerializer,
    I18nSerializer,
)


class ArticleI18nSerializer(serializers.ModelSerializer):

    class Meta:
        model = ArticleI18n
        fields = [
            'title',
            'description',
            'external_url',
            'language',
        ]
        list_serializer_class = I18nSerializer


class ArticleSerializer(HyperlinkedModelUUIDSerializer):

    i18n = ArticleI18nSerializer(many=True)

    class Meta:
        model = Article
        fields = [
            'id',
            'url',
            'i18n',
            'auto_translate_title',
            'auto_translate_description',
        ]

    def create(self, validated_data):
        # Remove both relationship objects before creating the `Exercise` instance
        i18n = validated_data.pop('i18n')

        instance = super().create(validated_data=validated_data)

        # Save relationships
        self._update_i18n(instance, i18n)
        return instance

    def update(self, instance, validated_data):
        try:
            i18n = validated_data.pop('i18n')
        except KeyError:
            pass
        else:
            self._update_i18n(instance, i18n)

        return super().update(instance, validated_data)

    def validate_i18n(self, i18n):
        if len(i18n) < len(LanguageEnum.choices()):
            raise serializers.ValidationError(
                'A description is required for each available language'
            )

        for translation in i18n:
            language = translation.get('language', '')
            title = translation.get('title')
            description = translation.get('description')
            external_url = translation.get('external_url')

            if not hasattr(LanguageEnum, language.upper()):
                raise serializers.ValidationError(
                    f'Language `{language}` is not valid'
                )

            if not title:
                raise serializers.ValidationError(
                    f'Missing title for language `{language}`'
                )

            if not description:
                raise serializers.ValidationError(
                    f'Missing description for language `{language}`'
                )

            if not external_url:
                raise serializers.ValidationError(
                    f'Missing external_url for language `{language}`'
                )

        return i18n

    def _update_i18n(self, instance: Article, i18n: list):
        for translation in i18n:
            article_i18n, _ = ArticleI18n.objects.get_or_create(
                language=translation['language'], parent=instance
            )
            article_i18n.title = translation['title']
            article_i18n.description = translation['description']
            article_i18n.external_url = translation['external_url']
            article_i18n.save()
