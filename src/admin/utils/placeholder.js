

const getPlaceHolder = (record, locale) => {
  let placeholder = record.id;
  if (record.hasOwnProperty('full_name')) {
    placeholder = record.full_name;
  } else {
    if (record.i18n?.name?.hasOwnProperty(locale)) {
      placeholder = record.i18n.name[locale];
    } else if (record.i18n?.description?.hasOwnProperty(locale)) {
      const description = record.i18n.description[locale];
      placeholder = description.length <= 20
        ? description
        : `${description.substring(0, 20)}...`;
    }
  }
  return placeholder;
};

export { getPlaceHolder };

