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
import RaLanguage from 'ra-language-english';

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
RaLanguageOverride.ra.notification.updated =
  'Element updated successfully |||| %{smart_count} elements updated successfully';
RaLanguageOverride.ra.notification.created = 'Element created successfully';

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
    label: 'You are logged in to a temporary session.',
  },

  browserSupport: {
    label: '{name} version {version} is not supported.',
  },

  GUI: {
    title: 'Effect settings',
    folders: {
      position: 'Position',
      rotation: 'Rotation',
      scale: 'Scale',
    },
    labels: {
      position: {
        x: 'Left ↔ Right',
        y: 'Top ↕ Bottom',
        z: 'Forward ↹ Backward',
      },
      rotation: {
        x: 'x',
        y: 'y',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Narrow ↔ Wide',
        y: 'Short ↕ Long',
        z: 'z',
      },
    },
    cta: {
      profile: 'Profile values',
      default: 'Default values',
    },
    confirm: {
      title: 'Do you really want to leave without saving?',
    },
  },
};
