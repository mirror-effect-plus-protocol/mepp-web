import {
  email,
  minLength,
  required
} from 'react-admin';

const securePasswordOptional = (new_password) => {
  const passwordMinLen = process.env.PASSWORD_MIN_LEN;
  const passwordRegex = process.env.PASSWORD_REGEX;
  const regex = new RegExp(`^${passwordRegex}{${passwordMinLen},}$`);

  if (!new_password) {
    return undefined;
  }

  if (new_password.length < passwordMinLen) {
    return {
      message: 'admin.shared.errors.password_too_short',
      args: { min_length: passwordMinLen },
    };
  }

  if (!regex.test(new_password)) {
    return 'admin.shared.errors.password_not_secure';
  }

  return undefined;
};

const securePasswordRequired = (new_password) => {
  if (!new_password) {
    return 'admin.shared.errors.password_required';
  }
  return securePasswordOptional(new_password);
};

const greaterThanZero = (value) => {
  if (value < 1) {
    return 'admin.shared.errors.gt_zero';
  }
  return undefined;
};

export const requiredLocalizedField = (record, locale, fields) => {
  const errors = {};

  if (!record.hasOwnProperty('i18n')) {
    errors.i18n = {}
    if (Array.isArray(fields)) {
      fields.forEach((field) => {
        errors.i18n[`${field}`] = {
          [`${locale}`] : ['admin.shared.errors.field_required']
        }
      });
    } else {
      errors.i18n = {
        [`${fields}`]: {
          [`${locale}`] : ['admin.shared.errors.field_required']
        }
      }
    }
  } else {
    if (Array.isArray(fields)) {
      fields.forEach((field) => {
        if (!record.i18n.hasOwnProperty(field)) {
          errors.i18n = {
            [`${field}`]: {
              [`${locale}`] : ['admin.shared.errors.field_required']
            }
          }
        }
      });
    }
  }
  return errors;
};

export const validateEmail = [required(), email()];
export const validateFirstName = [required(), minLength(2)];
export const validateLanguage = [required()];
export const validateLastName = [required(), minLength(2)];
export const validateNumber = [required(), greaterThanZero];
export const validatePasswordOptional = [securePasswordOptional];
export const validatePasswordRequired = [securePasswordRequired];
export const validatePasswords = ({ new_password, confirm_password }) => {
  const errors = {};
  if ((new_password || confirm_password) && new_password !== confirm_password) {
    errors.confirm_password = ['admin.shared.errors.password_mismatch'];
  }
  return errors;
};

