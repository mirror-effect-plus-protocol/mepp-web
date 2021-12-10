import { LANGUAGES } from '../../../locales';


export const contextualRedirect = (patientUid) => {
  return patientUid
    ? `/patients/${patientUid}/show`
    : `/plans`;
};

export const preSave = (record, locale, patientUid, asTemplate) => {
  /* ToDo plug translation API */
  let localizedName = '';
  let localizedDescription = '';

  // Try to get i18n field from current language
  try {
    localizedName = record.i18n.name[locale];
  } catch (e) {}

  try {
    localizedDescription = record.i18n.description[locale];
  } catch (e) {}


  // If no matches found, let's loop through all languages.
  LANGUAGES.forEach((language) => {
    if (!localizedName) {
      try {
        localizedName = record.i18n.name[language];
      } catch (e) {}
    }

    if (!localizedDescription) {
      try {
        localizedDescription = record.i18n.description[language];
      } catch (e) {
      }
    }
  });

  // Assign missing translations
  LANGUAGES.forEach((language) => {
    if (!record.i18n.name.hasOwnProperty(language) || !record.i18n.name[language]) {
      record.i18n.name[language] = `(${language.toUpperCase()}) - ${localizedName}`;
    }

    if (!record.i18n.description.hasOwnProperty(language) || !record.i18n.description[language]) {
      record.i18n.description[language] = `(${language.toUpperCase()}) - ${localizedDescription}`;
    }
  });

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
