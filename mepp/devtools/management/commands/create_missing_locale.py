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
import re
import time

import polib
import openai
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from mepp.api.enums.language import LanguageEnum

"""
OpenAI is not part of pip dependencies and should be installed manually
"""
openai.api_key = 'CHANGEME'


class Command(BaseCommand):
    help = 'Create missing translation files'

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

    def handle(self, *args, **kwargs):
        self.create_react_files()
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
            self.translate_po_file(
                fr_locale_path, locale_path, language.value
            )

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

    # Translation with Google Translate - DEPRECATED
    # def translate_text(self, text: str, target_language: str):
    #     try:
    #         response = requests.post(self.API_URL, data={'q': text, 'target': target_language})
    #         response.raise_for_status()
    #         translated_text = response.json()['data']['translations'][0]['translatedText']
    #         return html.unescape(translated_text)
    #     except requests.exceptions.RequestException as e:
    #         print(f'Translation error: {e}')
    #         return text

    def translate_text(
        self,
        text: str,
        target_language: str,
        retries: int = 0,
    ) -> str:
        if not text:
            return ''

        if len(text) == 1 or text.startswith('ra-'):
            return text

        text = text.replace('&nbsp;', ' ')

        self.stdout.write(
            f'\t\tTranslating {text} in {self.TRANSLATION_MAPPING[target_language]}…'
        )

        if retries:
            # wait = 60 * 15 # wait for 15 minutes...
            wait = 60 - (time.time() - self._timer) + (retries * 60)
            self.stdout.write(f'\t\tWaiting for {wait} seconds…')
            time.sleep(wait)
            self._timer = time.time()

        try:
            self._chatgpt_requests += 1

            api_prompt = f"""
            You are a translation assistant for a web application. Your job is to translate, keeping placeholders as-is.
                1. The input is in French.
                2. The output is in {self.TRANSLATION_MAPPING[target_language]}.
                3. Keep all placeholders (starting with "%{" and ending with "}" or "%(" and ending with ")") unchanged.
                4. Do not add a final dot, if the input does not have one.
                5. If the input is ambiguous or too short to translate correctly, provide the best possible output (e.g: if it is only one word, translate it with the most know translation).
                6. Only return "MORE INPUT" if translation cannot be reasonably inferred.

                Your response must strictly follow these rules.
            """

            response = openai.ChatCompletion.create(
                model='gpt-4o-mini',
                messages=[
                    {
                        'role': 'system',
                        'content': api_prompt,
                    },
                    {'role': 'user', 'content': text},
                ],
            )
            translated = response['choices'][0]['message']['content']
            if translated == 'MORE INPUT':
                message = input(f'Cannot translate {text} in {self.TRANSLATION_MAPPING[target_language]}:')
                return message.replace("'", '’')
            return translated.replace("'", '’')
        except openai.error.RateLimitError:
            self.stderr.write('ChatGPT RateLimitError:')
            return self._translate_text(text, target_language, retries + 1)
        except Exception as e:
            self.stderr.write('ChatGPT Error:', str(e))
            return f'({target_language.upper()}) - {text}'

    def translate_po_file(
        self, source_file_path: str, target_file_path: str, target_language: str
    ):
        po = polib.pofile(source_file_path)
        for entry in po:
            po_key = entry.msgid.strip()
            if po_key != '':
                if ' ' not in po_key and (':' in po_key or '_' in po_key):
                    self.stdout.write(f'Leave {po_key} as-is')
                    translated_msgstr = po_key
                else:
                    translated_msgstr = self.translate_text(
                        entry.msgstr, target_language
                    )

                entry.msgstr = translated_msgstr

        po.metadata['Language'] = target_language  # Par exemple, changer la langue en français
        po.metadata['Last-Translator'] = 'ChatGPT 4o-mini API'
        po.metadata['PO-Revision-Date'] = timezone.now().strftime('%Y-%m-%d %H:%M+0000')
        po.save(target_file_path)
        self.stdout.write(f'Translated file: {target_file_path}')

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

        self.stdout.write(f'Translated file: {translated_file_path}')
