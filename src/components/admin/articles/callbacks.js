/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */
import { googleTranslate } from '@components/admin/shared/utils';

import { LANGUAGES } from '../../../locales';

export const preSave = async (record, locale) => {
  let localizedTitle = '';
  let localizedDescription = '';
  let localizedExternalUrl = '';

  try {
    localizedTitle = record.i18n.title[locale];
  } catch (e) {
    // Intentionally left empty: ignore if localizedName is not found
  }

  try {
    localizedDescription = record.i18n.description[locale];
  } catch (e) {
    // Intentionally left empty: ignore if localizedName is not found
  }

  try {
    localizedExternalUrl = record.i18n.external_url[locale];
  } catch (e) {
    // Intentionally left empty: ignore if localizedName is not found
  }

  // If no matches found, let's loop through all languages.
  LANGUAGES.forEach((language) => {
    if (!localizedTitle) {
      try {
        localizedTitle = record.i18n.title[language];
      } catch (e) {
        // Intentionally left empty: ignore if localizedName is not found
      }
    }

    if (!localizedDescription) {
      try {
        localizedDescription = record.i18n.description[language];
      } catch (e) {
        // Intentionally left empty: ignore if localizedName is not found
      }
    }

    if (!localizedExternalUrl) {
      try {
        localizedExternalUrl = record.i18n.external_url[language];
      } catch (e) {
        // Intentionally left empty: ignore if localizedName is not found
      }
    }
  });

  // Update URl for every empty language
  LANGUAGES.forEach((language) => {
    if (
      !(language in record.i18n.external_url) ||
      !record.i18n.external_url[language]
    ) {
      record.i18n.external_url[language] = localizedExternalUrl;
    }
  });

  // Copy the external url for every language
  const promises = LANGUAGES.map(async (language) => {
    // Translate the title if auto-translate is enabled or if there's no existing translation
    const titlePromise =
      record.auto_translate_title ||
      !(language in record.i18n.title) ||
      !record.i18n.title[language]
        ? googleTranslate(localizedTitle, language)
        : Promise.resolve(record.i18n.title[language]);

    // Translate the description
    const descriptionPromise =
      record.auto_translate_description ||
      !(language in record.i18n.description) ||
      !record.i18n.description[language]
        ? googleTranslate(localizedDescription, language)
        : Promise.resolve(record.i18n.description[language]);

    // Execute both translations simultaneously
    const [translatedTitle, translatedDescription] = await Promise.all([
      titlePromise,
      descriptionPromise,
    ]);

    // Update the translated values
    record.i18n.title[language] = translatedTitle;
    record.i18n.description[language] = translatedDescription;
  });

  // Wait for all translations to complete
  await Promise.all(promises);

  return record;
};
