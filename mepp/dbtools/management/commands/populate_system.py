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
import csv
import sys
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import connection, transaction

from mepp.api.models import (
    Category,
    CategoryI18n,
    Exercise,
    ExerciseI18n,
)
from mepp.api.models.plan import TreatmentPlanExerciseM2M


class Command(BaseCommand):
    help = 'Populate categories and exercises'

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
        if connection.vendor == 'sqlite':
            sql_keywords = 'DELETE FROM'
        else:
            sql_keywords = 'TRUNCATE TABLE'

        if (
            not force
            and (Exercise.objects.exists() or Category.objects.exists())
        ):
            self.stdout.write('Database is not empty...')
            self.stdout.write('RUN:')
            self.stdout.write(
                f'{sql_keywords} `{ExerciseI18n._meta.db_table}`;')  # noqa
            self.stdout.write(
                f'{sql_keywords} `{Exercise._meta.db_table}`;')  # noqa
            self.stdout.write(
                f'{sql_keywords} `{CategoryI18n._meta.db_table}`;')  # noqa
            self.stdout.write(
                f'{sql_keywords} `{Category._meta.db_table}`;')  # noqa
            sys.exit(1)

        original_on_delete = TreatmentPlanExerciseM2M._meta.get_field(
            'exercise'
        ).remote_field.on_delete

        try:
            TreatmentPlanExerciseM2M._meta.get_field(
                'exercise'
            ).remote_field.on_delete = lambda *args, **kwargs: None
            self._insert_data(force)
        finally:
            TreatmentPlanExerciseM2M._meta.get_field(
                'exercise'
            ).remote_field.on_delete = original_on_delete

    def _insert_data(self, force: bool):
        base_dir = Path(__file__).resolve().parent.parent.parent
        exercise_ids = []
        self.stdout.write('Creating categories...')
        with transaction.atomic():

            if force:
                Category.objects.all().delete()
                Exercise.objects.all().delete()

            with open(f'{base_dir}/data/exercises_final_chatgpt.csv') as csvfile:
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
                    movement = int(row[1].strip())
                    repetition = int(row[2].strip())
                    pause = int(row[3].strip())

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
                            for language in ['fr', 'en', 'de', 'es', 'it', 'pt']:
                                CategoryI18n.objects.create(
                                    parent=category,
                                    name=categories[level][language],
                                    language=language
                                )
                            self.stdout.write(
                                f'New category `{category}` with parent '
                                f'`{parent}` has been created.'
                            )
                            parent = category

                    if exercise_pk:
                        exercise, created = Exercise.objects.get_or_create(
                            pk=exercise_pk
                        )
                        if created:
                            exercise = self._create_exercise(
                                movement, pause, repetition, descriptions, exercise
                            )
                        elif not exercise.i18n.filter(
                            description=descriptions['fr'], language='fr'
                        ).exists():
                            self.stdout.write(
                                f'\t⚠️ Different description detected for `{exercise}`!'
                            )
                            exercise = self._create_exercise(
                                movement, pause, repetition, descriptions
                            )
                    else:
                        if exercise_i18n := ExerciseI18n.objects.filter(
                            description=descriptions['fr'],
                            language='fr',
                        ).first():
                            exercise = exercise_i18n.parent
                        else:
                            exercise = self._create_exercise(
                                movement, pause, repetition, descriptions
                            )
                    exercise_ids.append(exercise.pk)
                    exercise.categories.add(parent)
                    self.stdout.write(
                        f'\tExercise `{exercise}` attached to `{parent}` at level '
                        f'{level - 1}'
                    )

            self.stdout.write('Clean up treatment plans…')
            TreatmentPlanExerciseM2M.objects.exclude(
                exercise_id__in=exercise_ids
            ).delete()

        self.stdout.write('Done!')

    def _create_exercise(
        self,
        movement: int,
        pause: int,
        repetition: int,
        descriptions: dict,
        exercise: Exercise = None,
    ) -> Exercise:

        if not exercise:
            exercise = Exercise.objects.create(
                movement_duration=movement,
                pause=pause,
                repetition=repetition,
            )
        else:
            exercise.movement_duration = movement
            exercise.pause = pause
            exercise.repetition = repetition
            exercise.save()

        for language in ['fr', 'en', 'de', 'es', 'it', 'pt']:
            ExerciseI18n.objects.create(
                parent=exercise,
                description=descriptions[language],
                language=language,
            )

        self.stdout.write(f'New `{exercise}` has been created!')
        return exercise

    def _get_descriptions(self, row) -> dict:
        def _add_punctuation(value):
            value = value.strip().replace("'", '’')
            if value.endswith(('.', '!')):
                return value
            return f'{value}.'

        return {
            'fr': _add_punctuation(row[4]),
            'en': _add_punctuation(row[5]),
            'de': _add_punctuation(row[6]),
            'es': _add_punctuation(row[7]),
            'it': _add_punctuation(row[8]),
            'pt': _add_punctuation(row[9]),
        }

    def _get_categories(self, row) -> list:
        categories = []

        cpt = 10
        for i in range(0, 4):
            categories.append({
                'fr': row[cpt + i].strip().replace("'", '’'),
                'en': row[cpt + i + 4].strip().replace("'", '’'),
                'de': row[cpt + i + 8].strip().replace("'", '’'),
                'es': row[cpt + i + 12].strip().replace("'", '’'),
                'it': row[cpt + i + 16].strip().replace("'", '’'),
                'pt': row[cpt + i + 20].strip().replace("'", '’'),
            })

        return categories
