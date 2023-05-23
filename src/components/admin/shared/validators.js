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
import { email, minLength, required } from 'react-admin';

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

export const requiredLocalizedField = (value, record, locale, field) => {
  if (!value) {
    if (!record.i18n[field][locale]) {
      return 'admin.shared.errors.field_required';
    }
  }
  return undefined;
};

export const validateEmail = [required(), email()];
export const validateFirstName = [required(), minLength(2)];
export const validateLanguage = [required()];
export const validateLastName = [required(), minLength(2)];
export const validateNumber = [required(), greaterThanZero];
export const validatePasswordOptional = [securePasswordOptional];
export const validatePasswordRequired = [securePasswordRequired];
export const validatePasswords = (confirm_password, record) => {
  if ((record.new_password || confirm_password) && record.new_password !== confirm_password) {
    return 'admin.shared.errors.password_mismatch';
  }
  return undefined;
};
