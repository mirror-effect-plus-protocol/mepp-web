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
  let localizedDescription = '';

  try {
    localizedDescription = record.i18n.description[locale];
  } catch (e) {
    // Intentionally left empty: ignore if localizedName is not found
  }

  // If no matches found, let's loop through all languages.
  LANGUAGES.forEach((language) => {
    if (!localizedDescription) {
      try {
        localizedDescription = record.i18n.description[language];
      } catch (e) {
        // Intentionally left empty: ignore if localizedName is not found
      }
    }
  });

  // Assign missing translations
  const promises = LANGUAGES.map(async (language) => {
    if (
      record.auto_translate ||
      !(language in record.i18n.description) ||
      !record.i18n.description[language]
    ) {
      record.i18n.description[language] = await googleTranslate(
        localizedDescription,
        language,
      );
    }
  });
  await Promise.all(promises);

  // ensure record is not archived (useful when duplicating a record)
  record.archived = false;
  return record;
};
