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
        label: 'Tu dirección de correo electrónico',
        placeholder: 'Dirección de correo electrónico',
      },
      password: {
        label: 'Su contraseña',
        placeholder: 'Contraseña',
      },
      oldpassword: {
        label: 'Su contraseña',
        placeholder: '',
      },
      confirmpassword: {
        label: 'Confirmación',
        placeholder: '',
      },
      newpassword: {
        label: 'Nueva contraseña',
        placeholder: '',
      },
      error: {
        login_invalid: 'Dirección de correo electrónico o contraseña inválida',
        email_invalid: 'Dirección de correo electrónico inválida',
        pwd_not_match: 'Las contraseñas no son idénticas.',
        pwd: 'Debe contener una minúscula, una mayúscula, un número y un carácter especial (-_ @$!%*#?&)',
        min_length: 'Esta contraseña es demasiado corta.',
        required: 'Este campo es requerido.',
      },
    },

    login: {
      title: 'Conexión',
    },

    reset_password: {
      title: 'Restablecimiento de su contraseña',
      success: 'Tu contraseña ha sido modificada con éxito.',
    },

    forgot_password: {
      title: '¿Olvidaste tu contraseña?',
      introduction:
        'Escriba su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.',
      success:
        'Si su cuenta existe, se enviará un correo electrónico a <span>{{ email }}</span>. Le indicará los pasos a seguir para restablecer su contraseña.',
    },
  },
};
