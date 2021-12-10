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

from django.db import connection
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from mepp.api.models import (
    Category,
    CategoryI18n,
    SubCategory,
    SubCategoryI18n,
    Exercise,
    ExerciseI18n,
)


class Command(BaseCommand):
    help = 'Populate categories, sub-categories and exercises'

    def handle(self, *args, **kwargs):

        base_dir = Path(__file__).resolve().parent.parent.parent
        category_ids_map = {}
        sub_category_ids_map = {}

        if connection.vendor == 'sqlite':
            sql_keywords = 'DELETE FROM'
        else:
            sql_keywords = 'TRUNCATE TABLE'

        if (
            Exercise.objects.exists()
            or Category.objects.exists()
            or SubCategory.objects.exists()
        ):
            self.stdout.write('Database is not empty...')
            print('RUN:')
            print(
                f'{sql_keywords} `{ExerciseI18n._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{Exercise._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{SubCategoryI18n._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{SubCategory._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{CategoryI18n._meta.db_table}`;')  # noqa
            print(
                f'{sql_keywords} `{Category._meta.db_table}`;')  # noqa
            sys.exit(1)

        self.stdout.write('Creating categories...')
        with open(f'{base_dir}/data/categories.csv') as csvfile:
            categories = csv.reader(csvfile, delimiter=',', quotechar='"')
            for idx, row in enumerate(categories):
                category = Category.objects.create()
                CategoryI18n.objects.create(
                    parent=category,
                    name=row[0].replace("'", '’').strip(),
                    language='fr'
                )
                CategoryI18n.objects.create(
                    parent=category,
                    name=row[1].replace("'", '’').strip(),
                    language='en')

                category_ids_map[idx + 1] = category.pk

        self.stdout.write('Creating sub-categories...')
        with open(f'{base_dir}/data/subcategories.csv') as csvfile:
            subcategories = csv.reader(csvfile, delimiter=',', quotechar='"')
            for idx, row in enumerate(subcategories):
                category_id = category_ids_map[int(row[2])]
                sub_category = SubCategory.objects.create(category_id=int(category_id))
                SubCategoryI18n.objects.create(
                    parent=sub_category,
                    name=row[0].replace("'", '’').strip(),
                    language='fr'
                )
                SubCategoryI18n.objects.create(
                    parent=sub_category,
                    name=row[1].replace("'", '’').strip(),
                    language='en'
                )
                sub_category_ids_map[idx + 1] = sub_category.pk

        self.stdout.write('Creating exercises...')
        admin = get_user_model().objects.filter(is_superuser=True).first()
        with open(f'{base_dir}/data/exercises.csv') as csvfile:
            exercises = csv.reader(csvfile, delimiter=',', quotechar='"')
            for row in exercises:
                exercise = Exercise.objects.create(clinician=admin, is_system=True)
                subcategory_ids = [
                    sub_category_ids_map[int(id_)] for id_ in row[3].split(',')
                ]
                subcategories = SubCategory.objects.filter(id__in=subcategory_ids)
                exercise.sub_categories.add(*subcategories)
                description_fr = row[0].replace("'", '’').strip()
                if not description_fr.endswith('.'):
                    description_fr += '.'
                ExerciseI18n.objects.create(
                    parent=exercise,
                    description=description_fr,
                    language='fr'
                )
                description_en = row[1].replace("'", '’').strip()
                if not description_en.endswith('.'):
                    description_en += '.'
                ExerciseI18n.objects.create(
                    parent=exercise,
                    description=description_en,
                    language='en'
                )

        self.stdout.write('Done!')
