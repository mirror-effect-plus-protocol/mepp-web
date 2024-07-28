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
        label: 'Il tuo indirizzo di posta elettronica',
        placeholder: 'Indirizzo e-mail',
      },
      password: {
        label: 'La tua password',
        placeholder: 'Parola d&#39;ordine',
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
        label: 'nuova password',
        placeholder: '',
      },
      error: {
        login_invalid: 'indirizzo email o password non validi',
        email_invalid: 'indirizzo email non valido',
        pwd_not_match: 'Le password non sono identiche',
        pwd: 'Deve contenere una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale (-_ @$!%*#?&amp;)',
        min_length: 'Questa password è troppo corta',
        required: 'Questo campo è obbligatorio',
      },
    },

    login: {
      title: 'Connessione',
    },

    reset_password: {
      title: 'Reimpostazione della password',
      success: 'La tua password è stata cambiata con successo.',
    },

    forgot_password: {
      title: 'Hai dimenticato la password?',
      introduction:
        'Inserisci il tuo indirizzo email e ti invieremo un collegamento per reimpostare la password.',
      success:
        'Se il tuo account esiste, verrà inviata un&#39;e-mail a <span>{{ email }}</span> . Ti dirà i passaggi da seguire per reimpostare la password.',
    },
  },
};
