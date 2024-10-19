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
import os
import csv
import html
import sys
from pathlib import Path

import requests
from django.db import connection, transaction
from django.core.management.base import BaseCommand

from mepp.api.models import (
    Category,
    CategoryI18n,
    Exercise,
    ExerciseI18n,
)


class Command(BaseCommand):
    help = 'Populate categories and exercises'

    API_KEY = os.getenv('GOOGLE_TRANSLATE_API_KEY')
    API_URL = f'https://translation.googleapis.com/language/translate/v2?key={API_KEY}'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._translations = {}

    def add_arguments(self, parser):
        super().add_arguments(parser)

        parser.add_argument(
            '--force',
            action='store_true',
            default=False,
            help='Force delete exercises and categories'
        )

    def handle(self, *args, **options):

        force = options['force']
        base_dir = Path(__file__).resolve().parent.parent.parent
        if connection.vendor == 'sqlite':
            sql_keywords = 'DELETE FROM'
        else:
            sql_keywords = 'TRUNCATE TABLE'

        if (
            not force
            and (Exercise.objects.exists() or Category.objects.exists())
        ):
            self.stdout.write('Database is not empty...')
            print('RUN:')
            print(
                f'{sql_keywords} `{ExerciseI18n._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{Exercise._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{CategoryI18n._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{Category._meta.db_table}`;')  # noqa
            sys.exit(1)

        self.stdout.write('Creating categories...')

        with transaction.atomic():

            Category.objects.all().delete()
            Exercise.objects.all().delete()

            with open(f'{base_dir}/data/exercises.csv') as csvfile:
                exercises = csv.reader(csvfile, delimiter=',', quotechar='"')
                for idx, row in enumerate(exercises):
                    if idx == 0:
                        continue

                    try:
                        exercise_pk = int(row[0])
                    except ValueError:
                        exercise_pk = None

                    descriptions = self._get_descriptions(row)
                    categories = self._get_categories(row)
                    movement = int(row[11].strip())
                    repeat = int(row[12].strip())
                    pause = int(row[13].strip())

                    parent = None
                    for level in range(0, 4):
                        if not categories[level]['fr']:
                            break

                        if category_i18n := CategoryI18n.objects.filter(
                            name=categories[level]['fr'],
                            language='fr',
                            parent__parent=parent,
                        ).first():
                            parent = category_i18n.parent
                        else:
                            category = Category.objects.create(parent=parent)
                            for language in ['fr', 'en', 'es', 'ge', 'it', 'pt']:
                                CategoryI18n.objects.create(
                                    parent=category,
                                    name=categories[level][language],
                                    language=language
                                )
                            self.stdout.write(
                                f'\tCreating category {category} with parent '
                                f'{parent}…'
                            )
                            parent = category

                    if exercise_pk:
                        exercise, created = Exercise.objects.get_or_create(
                            pk=exercise_pk
                        )
                        if created:
                            exercise.movement_duration = movement
                            exercise.pause = pause
                            exercise.repetition = repeat
                            exercise.save()

                            for language in ['fr', 'en', 'es', 'ge', 'it', 'pt']:
                                description = descriptions[language]
                                if not description.endswith('.'):
                                    description += '.'
                                ExerciseI18n.objects.create(
                                    parent=exercise,
                                    description=description,
                                    language=language,
                                )
                    else:
                        description = descriptions['fr']
                        if not description.endswith('.'):
                            description += '.'
                        if exercise_i18n := ExerciseI18n.objects.filter(
                            description=description,
                            language='fr',
                        ).first():
                            exercise = exercise_i18n.parent
                        else:
                            exercise = Exercise.objects.create(
                                movement_duration=movement,
                                pause=pause,
                                repetition=repeat,
                            )
                            for language in ['fr', 'en', 'es', 'ge', 'it', 'pt']:
                                description = descriptions[language]
                                if not description.endswith('.'):
                                    description += '.'
                                ExerciseI18n.objects.create(
                                    parent=exercise,
                                    description=description,
                                    language=language,
                                )

                    exercise.categories.add(parent)
                    self.stdout.write(
                        f"Exercise `{exercise}` attached to {parent} "
                        f"at level {level - 1}"
                    )
                    if exercise_pk == 53:
                        breakpoint()

        self.stdout.write('Done!')

    def _get_descriptions(self, row) -> dict:
        description_base = row[1].strip().replace("'", '’')
        return {
            'fr': description_base,
            'en': row[2].strip().replace("'", '’'),
            'es': row[14].strip().replace("'", '’'),
            'it': row[15].strip().replace("'", '’'),
            'ge': row[16].strip().replace("'", '’'),
            'pt': self._translate_text(description_base, 'pt', 'description')
        }

    def _get_categories(self, row) -> list:
        categories = []

        for i in range(0, 4):
            base_text = row[(i * 2) + 3].strip().replace("'", '’')
            categories.append({
                'fr': base_text,
                'en': row[(i * 2) + 4].strip().replace("'", '’'),
                'es': self._translate_text(base_text, 'es', 'category'),
                'it': self._translate_text(base_text, 'it', 'category'),
                'ge': self._translate_text(base_text, 'ge', 'category'),
                'pt': self._translate_text(base_text, 'pt', 'category'),
            })

        return categories

    def _translate_text(self, text: str, target_language: str, type_: str) -> str:
        if not text:
            return ''

        key = f'{type_}-{target_language}-{text}'
        if key in self._translations:
            # print('--->> Already translated!')
            return self._translations[key]

        try:
            self._translations[key] = 'TO BE TRANSLATED!'
            return self._translations[key]

            response = requests.post(
                self.API_URL, data={'q': text, 'target': target_language}
            )
            response.raise_for_status()
            translated_text = response.json()['data']['translations'][0][
                'translatedText'
            ]
            self._translations[key] = html.unescape(translated_text)
            return self._translations[key]
        except requests.exceptions.RequestException as e:
            print(f'Translation error: {e}')
            return f'{target_language.upper()} - {text}'
