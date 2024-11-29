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
        label: 'Ihre E-Mail-Adresse',
        placeholder: 'E-Mail-Adresse',
      },
      password: {
        label: 'Ihr Passwort',
        placeholder: 'Passwort',
      },
      oldpassword: {
        label: 'Ihr Passwort',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Bestätigung',
        placeholder: '',
      },
      newpassword: {
        label: 'Neues Passwort',
        placeholder: '',
      },
      error: {
        login_invalid: 'Ungültige E-Mail-Adresse oder Passwort',
        email_invalid: 'Ungültige E-Mail-Adresse',
        pwd_not_match: 'Die Passwörter sind nicht identisch.',
        pwd: 'Muss einen Kleinbuchstaben, einen Großbuchstaben, eine Zahl und ein Sonderzeichen (-_ @$!%*#?&) enthalten.',
        min_length: 'Dieses Passwort ist zu kurz.',
        required: 'Dieses Feld ist erforderlich.',
      },
    },

    login: {
      title: 'Anmeldung',
    },

    reset_password: {
      title: 'Zurücksetzen Ihres Passworts',
      success: 'Ihr Passwort wurde erfolgreich geändert.',
    },

    forgot_password: {
      title: 'Passwort vergessen?',
      introduction:
        'Geben Sie Ihre E-Mail-Adresse ein, und wir senden Ihnen einen Link zur Zurücksetzung Ihres Passworts.',
      success:
        'Wenn Ihr Konto existiert, wird eine E-Mail an <span>{{ email }}</span> gesendet. Diese wird Ihnen die Schritte zur Rücksetzung Ihres Passworts mitteilen.',
    },
  },
};
