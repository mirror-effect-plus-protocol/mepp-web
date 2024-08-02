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
import RaLanguage from 'ra-language-german';

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
RaLanguageOverride.ra.action.show = 'Sehen';
RaLanguageOverride.ra.action.edit = 'Modifikator';
RaLanguageOverride.ra.notification.updated =
  'Element erfolgreich aktualisiert |||| %{smart_count} Elemente wurden erfolgreich aktualisiert';
RaLanguageOverride.ra.notification.created = 'Artikel erfolgreich erstellt';


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
    label: 'Sie sind in einer temporären Sitzung angemeldet',
  },

  browserSupport: {
    label: '{name}-Version {version} wird nicht unterstützt',
  },

  GUI: {
    title: 'Effekteinstellungen',
    folders: {
      position: 'Position',
      rotation: 'Drehung',
      scale: 'Leiter',
    },
    labels: {
      position: {
        x: 'Links ↔ Rechts',
        y: 'Oben ↕ Unten',
        z: 'Vorne ↹ Hinten',
      },
      rotation: {
        x: 'X',
        y: 'Und',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Schmal ↔ Breit',
        y: 'Klein ↕ Lang',
        z: 'Mit',
      },
    },
    cta: {
      profile: 'Profilwerte',
      default: 'Standardwerte',
    },
    confirm: {
      title: 'Sind Sie sicher, dass Sie den Vorgang beenden möchten, ohne zu speichern?',
    },
  },
};
