import { LANGUAGES } from '../../../locales';

export const preSave = (record, locale) => {
  /* ToDo plug translation API */
  let localizedDescription = '';

  try {
    localizedDescription = record.i18n.description[locale];
  } catch (e) {}


  // If no matches found, let's loop through all languages.
  LANGUAGES.forEach((language) => {
    if (!localizedDescription) {
      try {
        localizedDescription = record.i18n.description[language];
      } catch (e) {
      }
    }
  });

  // Assign missing translations
  LANGUAGES.forEach((language) => {
    if (!record.i18n.description.hasOwnProperty(language) || !record.i18n.description[language]) {
      record.i18n.description[language] = `(${language.toUpperCase()}) - ${localizedDescription}`;
    }
  });

  // ensure record is not archived (useful when duplicating a record)
  record.archived = false;
  return record;
};
