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

export default {
  form: {
    field: {
      email: {
        label: 'Your e-mail address',
        placeholder: 'E-mail address',
      },
      password: {
        label: 'Your password',
        placeholder: 'Password',
      },
      oldpassword: {
        label: 'Your password',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Confirm your new password',
        placeholder: '',
      },
      newpassword: {
        label: 'New password',
        placeholder: '',
      },
      error: {
        login_invalid: 'Your e-mail address or password is invalid',
        email_invalid: 'Invalid e-mail address',
        pwd_not_match: 'Passwords do not match',
        pwd: 'Invalid password',
        min_length: 'This password is too short',
        required: 'This field is required',
      },
    },

    login: {
      title: 'Login',
    },

    reset_password: {
      title: 'Reset your password',
      success: 'Your password has been modified successfully.',
    },

    forgot_password: {
      title: 'Forgot your password?',
      introduction:
        'Please provide your e-mail address and we will send you a link to reset your password.',
      success:
        'If your account exists, an e-mail will be sent to <span>{{ email }}</span>. Please follow the provided instructions.',
    },
  },
};
