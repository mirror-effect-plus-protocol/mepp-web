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
        label: 'Il tuo indirizzo email',
        placeholder: 'Indirizzo email',
      },
      password: {
        label: 'La tua password',
        placeholder: 'Password',
      },
      oldpassword: {
        label: 'La tua password',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Conferma',
        placeholder: '',
      },
      newpassword: {
        label: 'Nuova password',
        placeholder: '',
      },
      error: {
        login_invalid: 'Indirizzo email o password non validi',
        email_invalid: 'Indirizzo email non valido',
        pwd_not_match: 'Le password non sono identici.',
        pwd: 'Deve contenere una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale (-_ @$!%*#?&)',
        min_length: 'Questa password è troppo corta',
        required: 'Questo campo è obbligatorio',
      },
    },

    login: {
      title: 'Accesso',
    },

    reset_password: {
      title: 'Reimpostazione della tua password',
      success: 'La tua password è stata modificata con successo.',
    },

    forgot_password: {
      title: 'Password dimenticata?',
      introduction:
        'Inserisci il tuo indirizzo email e ti invieremo un link per reimpostare la tua password.',
      success:
        'Se il tuo account esiste, verrà inviato un’email a <span>{{ email }}</span>. Ti indicherà i passaggi da seguire per reimpostare la tua password.',
    },
  },
};
