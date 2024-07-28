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
        label: 'Seu endereço de email',
        placeholder: 'Endereço de email',
      },
      password: {
        label: 'Sua senha',
        placeholder: 'Senha',
      },
      oldpassword: {
        label: 'Sua senha',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Confirmação',
        placeholder: '',
      },
      newpassword: {
        label: 'Nova Senha',
        placeholder: '',
      },
      error: {
        login_invalid: 'E-mail ou senha inválidos',
        email_invalid: 'Endereço de email invalido',
        pwd_not_match: 'As senhas não são idênticas',
        pwd: 'Deve conter uma letra minúscula, uma letra maiúscula, um número e um caractere especial (-_ @$!%*#?&amp;)',
        min_length: 'Esta senha é muito curta',
        required: 'Este campo é obrigatório',
      },
    },

    login: {
      title: 'Conexão',
    },

    reset_password: {
      title: 'Redefinindo sua senha',
      success: 'Sua senha foi alterada com sucesso.',
    },

    forgot_password: {
      title: 'Esqueceu sua senha?',
      introduction:
        'Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha.',
      success:
        'Se sua conta existir, um e-mail será enviado para <span>{{ email }}</span> . Ele lhe dirá as etapas a seguir para redefinir sua senha.',
    },
  },
};
