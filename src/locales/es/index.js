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
import RaLanguage from 'ra-language-spanish';

import a11y from './a11y';
import admin from './admin';
import api from './api';
import cta from './cta';
import exercise from './exercise';
import footer from './footer';
import form from './form';
import intro from './intro';
import settings from './settings';

const RaLanguageOverride = { ...RaLanguage };
RaLanguageOverride.ra.action.show = 'Ver';
RaLanguageOverride.ra.action.edit = 'Modificador';
RaLanguageOverride.ra.notification.updated =
  'Artículo actualizado correctamente |||| %{smart_count} elementos actualizados correctamente';
RaLanguageOverride.ra.notification.created = 'Artículo creado exitosamente';
RaLanguageOverride.ra.page.dashboard = 'Salpicadero';


export default {
  ...RaLanguageOverride,
  ...admin,
  ...a11y,
  ...cta,
  ...form,
  ...footer,
  ...intro,
  ...exercise,
  ...settings,
  ...api,

  temporaryProfile: {
    label: 'Has iniciado sesión en una sesión temporal',
  },

  browserSupport: {
    label: '{nombre} versión {versión} no es compatible',
  },

  GUI: {
    title: 'Configuración de efectos',
    folders: {
      position: 'Posición',
      rotation: 'Rotación',
      scale: 'Escalera',
    },
    labels: {
      position: {
        x: 'Izquierda ↔ Derecha',
        y: 'Arriba ↕ Abajo',
        z: 'Frente ↹ Atrás',
      },
      rotation: {
        x: 'X',
        y: 'y',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Estrecho ↔ Ancho',
        y: 'Pequeño ↕ Largo',
        z: 'Con',
      },
    },
    cta: {
      profile: 'Valores de perfil',
      default: 'Valores predeterminados',
    },
    confirm: {
      title: '¿Está seguro de que desea salir sin guardar?',
    },
  },
};
