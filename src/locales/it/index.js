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
import intro from './intro';
import settings from './settings';

const RaLanguageOverride = { ...RaLanguage };
RaLanguageOverride.ra.action.show = 'Vedere';
RaLanguageOverride.ra.action.edit = 'Modificatore';
RaLanguageOverride.ra.notification.updated =
  'Elemento aggiornato con successo |||| %{smart_count} elementi aggiornati correttamente';
RaLanguageOverride.ra.notification.created = 'Articolo creato con successo';
RaLanguageOverride.ra.page.dashboard = 'Pannello di controllo';

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
    label: 'Hai effettuato l’accesso in una sessione temporanea',
  },

  browserSupport: {
    label: 'La versione {nome} {versione} non è supportata',
  },

  GUI: {
    title: 'Impostazioni degli effetti',
    folders: {
      position: 'Posizione',
      rotation: 'Rotazione',
      scale: 'Scala',
    },
    labels: {
      position: {
        x: 'Sinistra ↔ Destra',
        y: 'In alto ↕ In basso',
        z: 'Davanti ↹ Dietro',
      },
      rotation: {
        x: 'X',
        y: 'E',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Stretto ↔ Largo',
        y: 'Piccolo ↕ Lungo',
        z: 'Con',
      },
    },
    cta: {
      profile: 'Valori del profilo',
      default: 'Valori standard',
    },
    confirm: {
      title: 'Sei sicuro di voler uscire senza salvare?',
    },
  },
};