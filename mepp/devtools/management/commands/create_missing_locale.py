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
import json
import re
import os

import polib
import requests
from django.conf import settings
from django.core.management.base import BaseCommand

from mepp.api.enums.language import LanguageEnum


class Command(BaseCommand):
    help = 'Create missing translation files'

    API_KEY = os.getenv('GOOGLE_TRANSLATE_API_KEY')
    API_URL = f'https://translation.googleapis.com/language/translate/v2?key={API_KEY}'

    def handle(self, *args, **kwargs):
        # self.create_react_files()
        self.create_django_files()

    def create_django_files(self):
        fr_locale_path = os.path.join(
            settings.BASE_DIR,
            'mepp',
            'api',
            'locale',
            'fr',
            'LC_MESSAGES',
            'django.po',
        )

        for language in LanguageEnum:
            if language.value == 'fr':
                continue
            locale_path = os.path.join(
                settings.BASE_DIR,
                'mepp',
                'api',
                'locale',
                language.value,
                'LC_MESSAGES',
                'django.po',
            )
            self.translate_po_file(fr_locale_path, locale_path, language.value)

    def create_react_files(self):
        fr_locale_path = os.path.join(
            settings.BASE_DIR, 'src', 'locales', 'fr'
        )
        all_files_and_folders = os.listdir(fr_locale_path)

        locale_files = [
            f
            for f in all_files_and_folders
            if os.path.isfile(os.path.join(fr_locale_path, f))
        ]
        for locale_file in locale_files:
            for language in LanguageEnum:
                if language.value == 'fr':
                    continue
                if not os.path.isfile(
                    os.path.join(
                        settings.BASE_DIR,
                        'src',
                        'locales',
                        language.value,
                        os.path.basename(locale_file),
                    )
                ):
                    self.translate_file(locale_file, language.value)

    def translate_text(self, text: str, target_language: str):
        try:
            response = requests.post(self.API_URL, data={'q': text, 'target': target_language})
            response.raise_for_status()
            translated_text = response.json()['data']['translations'][0]['translatedText']
            return translated_text
        except requests.exceptions.RequestException as e:
            print(f'Translation error: {e}')
            return text

    def translate_po_file(
        self, source_file_path: str, target_file_path: str, target_language: str
    ):
        po = polib.pofile(source_file_path)
        for entry in po:
            if entry.msgstr.strip() != '':
                translated_msgstr = self.translate_text(entry.msgid, target_language)
                entry.msgstr = translated_msgstr

        po.save(target_file_path)
        print(f'Translated file: {target_file_path}')

    def translate_file(self, original_locale: str, target_language: str):
        original_locale_path = os.path.join(
            settings.BASE_DIR, 'src', 'locales', 'fr', original_locale
        )
        with open(original_locale_path, 'rb') as file:
            file_content = file.read().decode()

        regex = re.compile(r"(['\"])(.*?)(\1)")
        matches = regex.findall(file_content)
        unique_matches = list(set(match[1] for match in matches))

        for text in unique_matches:
            if text.startswith('./'):
                continue
            translated_text = self.translate_text(text, target_language)
            translated_match_single = f"'{translated_text}'"
            translated_match_double = f'"{translated_text}"'
            file_content = file_content.replace(f"'{text}'", translated_match_single)
            file_content = file_content.replace(f'"{text}"', translated_match_double)

        parent_dir = os.path.join(settings.BASE_DIR, 'src', 'locales', target_language)
        if not os.path.isdir(parent_dir):
            os.mkdir(parent_dir)

        translated_file_path = os.path.join(
            parent_dir,
            os.path.basename(original_locale_path),
        )
        with open(
            translated_file_path, 'w', encoding='utf-8'
        ) as translated_file:
            translated_file.write(file_content)

        print(f'Translated file: {translated_file_path}')
