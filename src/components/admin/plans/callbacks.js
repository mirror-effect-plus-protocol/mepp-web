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

import { LANGUAGES } from '../../../locales';
import {google_translate} from '@components/admin/shared/utils';

export const contextualRedirect = (patientUid) => {
  return patientUid
    ? `patients/${patientUid}/show`
    : `plans`;
};


export const preSave = async (record, locale, patientUid, asTemplate) => {
  let localizedName = '';

  // Try to get i18n field from current language
  try {
    localizedName = record.i18n.name[locale];
  } catch (e) {}

  // If no matches found, let's loop through all languages.
  LANGUAGES.forEach((language) => {
    if (!localizedName) {
      try {
        localizedName = record.i18n.name[language];
      } catch (e) {}
    }
  });

  const promises = LANGUAGES.map(async (language) => {
    if (record.auto_translate || !record.i18n.name.hasOwnProperty(language) || !record.i18n.name[language]) {
      record.i18n.name[language] = await google_translate(localizedName, language);
    }
  });
  await Promise.all(promises);

  // Remove i18n from exercises.
  // We cannot update description of exercises from here.
  record.exercises = record.exercises.map((exercise) => {
    delete exercise.i18n;
    return exercise;
  });

  // Let's force `is_template` to False if patientUid is present in
  // the context (i.e. edit from patient's card)
  // A treatment plan cannot be considered as a template if it is linked to
  // a patient.
  if (asTemplate) {
    record.patient_uid = null;
  } else if (patientUid) {
    record.patient_uid = patientUid;
  }
  record.is_template = asTemplate;

  // ensure record is not archived (useful when duplicating a record)
  record.archived = false;
  return record;
};
