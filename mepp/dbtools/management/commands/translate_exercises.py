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
import os
import time
from pathlib import Path

import openai
from django.core.management.base import BaseCommand

openai.api_key = 'CHANGEME'


class Command(BaseCommand):
    help = 'Populate categories and exercises'

    API_KEY = os.getenv('GOOGLE_TRANSLATE_API_KEY')
    API_URL = f'https://translation.googleapis.com/language/translate/v2?key={API_KEY}'
    TRANSLATION_MAPPING = {
        'it': 'Italian',
        'de': 'German',
        'es': 'Spanish',
        'pt': 'Portuguese',
        'en': 'English',
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._translations = {}
        self._timer = time.time()
        self._chatgpt_requests = 0

    def add_arguments(self, parser):
        super().add_arguments(parser)

        parser.add_argument(
            '--force',
            action='store_true',
            default=False,
            help='Force delete exercises and categories'
        )

    def handle(self, *args, **options):

        base_dir = Path(__file__).resolve().parent.parent.parent

        headers = [
            'Exercise ID',
            'Movement Duration',
            'Repetition',
            'Pause',
            'Description FR',
            'Description EN',
            'Description DE',
            'Description ES',
            'Description IT',
            'Description PT',
            'Category FR',
            'Category Sub Level 1 FR',
            'Category Sub Level 2 FR',
            'Category Sub Level 3 FR',
            'Category EN',
            'Category Sub Level 1 EN',
            'Category Sub Level 2 EN',
            'Category Sub Level 3 EN',
            'Category DE',
            'Category Sub Level 1 DE',
            'Category Sub Level 2 DE',
            'Category Sub Level 3 DE',
            'Category ES',
            'Category Sub Level 1 ES',
            'Category Sub Level 2 ES',
            'Category Sub Level 3 ES',
            'Category IT',
            'Category Sub Level 1 IT',
            'Category Sub Level 2 IT',
            'Category Sub Level 3 IT',
            'Category PT',
            'Category Sub Level 1 PT',
            'Category Sub Level 2 PT',
            'Category Sub Level 3 PT',
        ]

        with open(f'{base_dir}/data/exercises_final.csv', 'w', newline='') as writefile:
            writer = csv.DictWriter(writefile, fieldnames=headers)
            writer.writeheader()

        with open(f'{base_dir}/data/exercises_final.csv', 'a', newline='') as writefile:
            writer = csv.writer(writefile)
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
                    repetition = int(row[12].strip())
                    pause = int(row[13].strip())

                    new_row = [
                        exercise_pk,
                        movement,
                        repetition,
                        pause,
                        descriptions['fr'],
                        descriptions['en'],
                        descriptions['de'],
                        descriptions['es'],
                        descriptions['it'],
                        descriptions['pt'],
                        '',  # 10 Category FR
                        '',
                        '',
                        '',
                        '',  # 14 Category EN
                        '',
                        '',
                        '',
                        '',  # 18 Category GE
                        '',
                        '',
                        '',
                        '',  # 22 Category ES
                        '',
                        '',
                        '',
                        '',  # 26 Category IT
                        '',
                        '',
                        '',
                        '',  # 30 Category PT
                        '',
                        '',
                        '',
                    ]
                    cpt = 10
                    for language in ['fr', 'en', 'de', 'es', 'it', 'pt']:
                        new_row[cpt] = categories[0][language]
                        new_row[cpt + 1] = categories[1][language]
                        new_row[cpt + 2] = categories[2][language]
                        new_row[cpt + 3] = categories[3][language]
                        cpt += 4

                    writer.writerow(new_row)

            self.stdout.write('Done!')

    def _get_descriptions(self, row) -> dict:
        description_base = row[1].strip().replace("'", '’')
        return {
            'fr': description_base,
            'en': row[2].strip().replace("'", '’'),
            'de': row[16].strip().replace("'", '’'),
            'es': row[14].strip().replace("'", '’'),
            'it': row[15].strip().replace("'", '’'),
            'pt': self._translate_text(description_base, 'pt', 'description')
        }

    def _get_categories(self, row) -> list:
        categories = []

        for i in range(0, 4):
            base_text = row[(i * 2) + 3].strip().replace("'", '’')
            categories.append({
                'fr': base_text,
                'en': row[(i * 2) + 4].strip().replace("'", '’'),
                'de': self._translate_text(base_text, 'de', 'category'),
                'es': self._translate_text(base_text, 'es', 'category'),
                'it': self._translate_text(base_text, 'it', 'category'),
                'pt': self._translate_text(base_text, 'pt', 'category'),
            })

        return categories

    def _translate_text(self, text: str, target_language: str, type_: str, retries: int = 0) -> str:
        if not text:
            return ''

        key = f'{type_}-{target_language}-{text}'
        if key in self._translations:
            self.stdout.write(f'\t\t⚠️ {text} has been already translated')
            return self._translations[key]

        self.stdout.write(f'\t\tTranslating {text} in {target_language}…')

        if self._chatgpt_requests >= 20:
            wait = 60 - (time.time() - self._timer) + (retries * 60)
            if retries > 3:
                wait = 60 * 15  # wait for 15 minutes...
            self.stdout.write(f'\t\tWaiting for {wait} seconds…')
            time.sleep(wait)
            self._chatgpt_requests = 0
            self._timer = time.time()

        try:
            self._chatgpt_requests += 1
            response = openai.ChatCompletion.create(
                model='gpt-3.5-turbo',
                messages=[
                    {
                        'role': 'system',
                        'content': (
                            f'You are a translation assistant. The following'
                            f'text is in French and should be translated to '
                            f'{self.TRANSLATION_MAPPING[target_language]}.'
                        ),
                    },
                    {'role': 'user', 'content': text},
                ],
            )
            self._translations[key] = response['choices'][0]['message']['content']
            return self._translations[key]
        except openai.error.RateLimitError:
            self.stderr.write('ChatGPT RateLimitError:')
            self._chatgpt_requests = 20
            return self._translate_text(text, target_language, type_, retries + 1)
        except Exception as e:
            self.stderr.write('ChatGPT Error:', str(e))
            return f'({target_language.upper()}) - {text}'
