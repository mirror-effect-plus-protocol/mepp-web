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
        label: 'Votre adresse courriel',
        placeholder: 'Adresse courriel',
      },
      password: {
        label: 'Votre mot de passe',
        placeholder: 'Mot de passe',
      },
      oldpassword: {
        label: 'Votre mot de passe',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Confirmation',
        placeholder: '',
      },
      newpassword: {
        label: 'Nouveau mot de passe',
        placeholder: '',
      },
      error: {
        login_invalid: 'Adresse courriel ou mot de passe invalide',
        email_invalid: 'Adresse courriel invalide',
        pwd_not_match: 'Les mots de passe ne sont pas identiques',
        pwd: 'Doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial (-_ @$!%*#?&)',
        min_length: 'Ce mot de passe est trop court',
        required: 'Ce champ est requis',
      },
    },

    login: {
      title: 'Connexion',
    },

    reset_password: {
      title: 'Réinitialisation de votre mot de passe',
      success: 'Votre mot de passe a été modifié avec succès.',
    },

    forgot_password: {
      title: 'Mot de passe oublié?',
      introduction:
        'Incrivez votre adresse courriel et nous vous acheminerons un lien pour réinitialiser votre mot de passe.',
      success:
        'Si votre compte existe, un courriel sera envoyé à <span>{{ email }}</span>. Il vous indiquera les étapes à suivre pour réinitialiser votre mot de passe.',
    },
  },
};
