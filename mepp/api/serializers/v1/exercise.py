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
import base64
import os

from django.core.files.base import ContentFile
from rest_framework import serializers

from mepp.api.enums.language import LanguageEnum
from mepp.api.models.exercise import (
    Category,
    Exercise,
    ExerciseI18n,
)
from mepp.api.serializers import (
    I18nSerializer,
    HyperlinkedModelUUIDSerializer,
)


class Base64FileField(serializers.FileField):
    def to_internal_value(self, data):
        if isinstance(data, dict):
            if data.get('base64', '').startswith('data:'):
                return self._convert_base64_to_file(data['base64'], data['filename'])
            else:
                return ''

        if isinstance(data, str) and data.startswith('data:'):
            return self._convert_base64_to_file(data['base64'])

        return super().to_internal_value(data)

    def to_representation(self, value):
        if not value:
            return None

        try:
            url = value.url
        except AttributeError:
            request = self.context.get('request', None)
            url = value.path
            if request is not None:
                url = request.build_absolute_uri(url)

        return {
            'title': os.path.basename(value.name),
            'src': url,
        }

    def _convert_base64_to_file(self, base64_data: str, filename: str = None) -> ContentFile:

        mimetype, base64_str = base64_data.split(';base64,')
        if not filename:
            ext = mimetype.split('/')[-1]
            filename = f'upload.{ext}'

        decoded_file = base64.b64decode(base64_str)

        return ContentFile(decoded_file, name=filename)


class ExerciseI18nSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExerciseI18n
        fields = [
            'description',
            'language',
        ]
        list_serializer_class = I18nSerializer


class ExerciseSerializer(HyperlinkedModelUUIDSerializer):

    i18n = ExerciseI18nSerializer(many=True)
    categories = serializers.SerializerMethodField()
    video = Base64FileField(allow_null=True, allow_empty_file=True, required=False)

    class Meta:
        model = Exercise
        fields = [
            'id',
            'url',
            'i18n',
            'movement_duration',
            'pause',
            'repetition',
            'created_at',
            'modified_at',
            'categories',
            'archived',
            'auto_translate',
            'video',
        ]
        read_only_fields = [
            'created_at',
            'modified_at',
        ]

    def create(self, validated_data):
        # Remove both relationship objects before creating the `Exercise` instance
        categories = validated_data.pop('categories')
        i18n = validated_data.pop('i18n')

        instance = super().create(validated_data=validated_data)

        # Save relationships
        self._update_categories(instance, categories)
        self._update_i18n(instance, i18n)
        return instance

    def get_categories(self, exercise):
        categories = []

        for category in exercise.categories.all():
            category_dict = {
                'id': category.uid,
                'i18n': {
                    'name':  {
                        i18n.language: i18n.name
                        for i18n in category.i18n.all()
                    }
                },
                'parents': [],
            }
            current_category = category
            while parent := current_category.parent:
                i18n = {'name': {}}
                for category_i18n in parent.i18n.all():
                    i18n['name'][category_i18n.language] = category_i18n.name
                category_dict['parents'].insert(0, {
                    'id': parent.uid,
                    'i18n': i18n,
                })
                current_category = current_category.parent

            categories.append(category_dict)

        return categories

    def validate(self, attrs):
        categories = self._validate_categories()
        if categories:
            attrs['categories'] = categories

        return attrs

    def validate_video(self, video):
        # The comparison with empty string is in purpose. If `video` is None,
        # user has removed it.
        if self.instance and video == '':
            # keep same video in the DB
            return self.instance.video

        return video

    def validate_i18n(self, i18n):
        if len(i18n) < len(LanguageEnum.choices()):
            raise serializers.ValidationError(
                'A description is required for each available language'
            )

        for translation in i18n:
            language = translation.get('language', '')
            description = translation.get('description')

            if not hasattr(LanguageEnum, language.upper()):
                raise serializers.ValidationError(
                    f'Language `{language}` is not valid'
                )

            if not description:
                raise serializers.ValidationError(
                    f'Missing description for language `{language}`'
                )

        return i18n

    def update(self, instance, validated_data):

        # Ensure that the owner is not overwritten by `PATCH` request
        try:
            categories = validated_data.pop('categories')
        except KeyError:
            pass
        else:
            self._update_categories(instance, categories)

        try:
            i18n = validated_data.pop('i18n')
        except KeyError:
            pass
        else:
            self._update_i18n(instance, i18n)

        return super().update(instance, validated_data)

    def _base64_to_file(self, base64_string, file_name):
        format_, img_str = base64_string.split(';base64,')
        ext = format_.split('/')[-1]
        data = ContentFile(base64.b64decode(img_str))
        data.name = f'{file_name}.{ext}'
        return data

    def _validate_categories(self):
        request = self.context['request']

        try:
            categories_map = request.data['categories']
        except KeyError:
            if not self.instance:
                raise serializers.ValidationError(
                    {'categories': 'This field is required'}
                )
            else:
                # Skip update of categories
                return

        categories_uid = set([item.get('id') for item in categories_map])

        if not categories_uid:
            raise serializers.ValidationError({'categories': 'Required field'})

        # Convert to list to help the save process.
        categories = list(Category.objects.filter(uid__in=categories_uid))

        if len(categories) != len(categories_uid):
            raise serializers.ValidationError({'categories': 'Invalid values'})

        return categories

    def _update_categories(self, instance: Exercise, categories: list):
        # Disassociates all categories from current exercise
        instance.categories.clear()
        instance.categories.set(categories)

    def _update_i18n(self, instance: Exercise, i18n: list):
        for translation in i18n:
            exercise_i18n, _ = ExerciseI18n.objects.get_or_create(
                language=translation['language'], parent=instance
            )
            exercise_i18n.description = translation['description']
            exercise_i18n.save()
