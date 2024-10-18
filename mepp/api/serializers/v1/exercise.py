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
from mepp.api.fields.uuid import HyperlinkedUUIDRelatedField
from mepp.api.mixins.serializers.clinician import ClinicianValidatorMixin
from mepp.api.models.exercise import (
    Exercise,
    ExerciseI18n,
    SubCategory,
)
from mepp.api.serializers import (
    I18nSerializer,
    HyperlinkedModelUUIDSerializer,
)


class Base64FileField(serializers.FileField):
    def to_internal_value(self, data):

        if isinstance(data, dict) and data.get('base64', '').startswith('data:'):
            return self._convert_base64_to_file(data['base64'], data['filename'])

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


class ExerciseSerializer(
    ClinicianValidatorMixin, HyperlinkedModelUUIDSerializer
):

    clinician = HyperlinkedUUIDRelatedField(
        lookup_field='uid',
        view_name='clinician-detail',
        read_only=True,
    )
    clinician_uid = serializers.SerializerMethodField()
    i18n = ExerciseI18nSerializer(many=True)
    sub_categories = serializers.SerializerMethodField()
    video = Base64FileField(allow_null=True)

    class Meta:
        model = Exercise
        fields = [
            'id',
            'url',
            'clinician',
            'clinician_uid',
            'i18n',
            'movement_duration',
            'pause',
            'repetition',
            'created_at',
            'modified_at',
            'sub_categories',
            'archived',
            'is_system',
            'auto_translate',
            'video',
        ]
        read_only_fields = [
            'clinician',
            'clinician_uid',
            'created_at',
            'modified_at',
        ]

    def create(self, validated_data):
        request = self.context['request']
        validated_data['clinician'] = request.user

        # Remove both relationship objects before creating the `Exercise` instance
        sub_categories = validated_data.pop('sub_categories')
        i18n = validated_data.pop('i18n')

        # Force `is_system` to False if user is not a super user
        if not request.user.is_superuser:
            validated_data['is_system'] = False

        instance = super().create(validated_data=validated_data)

        # Save relationships
        self._update_sub_categories(instance, sub_categories)
        self._update_i18n(instance, i18n)
        return instance

    def get_clinician_uid(self, exercise):
        return exercise.clinician.uid

    def get_sub_categories(self, exercise):
        return list(exercise.sub_categories.values('uid', 'category__uid').all())

    # def validate_video(self, video):
    #     print('VIDEO', video, flush=True)
    #     if not video:
    #         return
    #
    #     try:
    #         return self._base64_to_file(video)
    #     except Exception:
    #         raise serializers.ValidationError('File format not recognized')

    def validate(self, attrs):
        self.validate_clinician_uid(attrs)
        sub_categories = self._validate_sub_categories()
        if sub_categories:
            attrs['sub_categories'] = sub_categories

        return attrs

    def validate_is_system(self, is_system):
        request = self.context['request']
        if (
            self.instance
            and self.instance.pk
            and self.instance.is_system
            and not request.user.is_superuser
        ):
            raise serializers.ValidationError('Action forbidden')

        if (
            not self.instance
            and is_system
            and not request.user.is_superuser
        ):
            raise serializers.ValidationError('Action forbidden')

        return is_system

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
            del validated_data['clinician']
        except KeyError:
            pass

        try:
            sub_categories = validated_data.pop('sub_categories')
        except KeyError:
            pass
        else:
            self._update_sub_categories(instance, sub_categories)

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

    def _validate_sub_categories(self):
        request = self.context['request']

        try:
            sub_categories_map = request.data['sub_categories']
        except KeyError:
            if not self.instance:
                raise serializers.ValidationError(
                    {'sub_categories': 'This field is required'}
                )
            else:
                # Skip update of sub categories
                return

        sub_categories_uid = set(
            [item.get('uid') for item in sub_categories_map]
        )

        # Convert to list to help save process.
        sub_categories = list(SubCategory.objects.filter(
            uid__in=sub_categories_uid
        ))

        if len(sub_categories) != len(sub_categories_uid):
            raise serializers.ValidationError(
                {'sub_categories': 'Invalid values'}
            )

        return sub_categories

    def _update_sub_categories(self, instance: Exercise, sub_categories: list):
        # Disassociates all (sub)categories from current exercise
        instance.sub_categories.clear()
        instance.sub_categories.set(sub_categories)

    def _update_i18n(self, instance: Exercise, i18n: list):
        for translation in i18n:
            exercise_i18n, _ = ExerciseI18n.objects.get_or_create(
                language=translation['language'], parent=instance
            )
            exercise_i18n.description = translation['description']
            exercise_i18n.save()
