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
import RaLanguage from 'ra-language-italian';

import a11y from './a11y';
import admin from './admin';
import api from './api';
import cta from './cta';
import exercise from './exercise';
import footer from './footer';
import form from './form';
import home from './home';
import intro from './intro';
import settings from './settings';

const RaLanguageOverride = { ...RaLanguage };
RaLanguageOverride.ra.action.show = 'Vedi';
RaLanguageOverride.ra.action.edit = 'Modifica';
RaLanguageOverride.ra.notification.updated =
  'Elemento aggiornato con successo |||| %{smart_count} elementi aggiornati con successo';
RaLanguageOverride.ra.notification.created = 'Elemento creato con successo';

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
  ...home,

  temporaryProfile: {
    label: 'Sei connesso(a) in una sessione temporanea',
  },

  browserSupport: {
    label: 'La versione %{version} di %{name} non è supportata.',
  },

  GUI: {
    title: 'Configurazioni dell’effetto',
    folders: {
      position: 'Posizione',
      rotation: 'Rotazione',
      scale: 'scala',
    },
    labels: {
      position: {
        x: 'Sinistra ↔ Destra',
        y: 'Su ↕ Giù',
        z: 'Avanti ↹ Indietro',
      },
      rotation: {
        x: 'x',
        y: 'y',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Stretto ↔ Largo',
        y: 'Piccolo ↕ Lungo',
        z: 'z',
      },
    },
    cta: {
      profile: 'Valori del profilo',
      default: 'Valori predefiniti',
    },
    confirm: {
      title: 'Vuoi davvero uscire senza salvare?',
    },
  },
};
