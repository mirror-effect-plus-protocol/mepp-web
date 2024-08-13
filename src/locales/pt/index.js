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
import RaLanguage from 'ra-language-portuguese';

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
RaLanguageOverride.ra.action.show = 'Ver';
RaLanguageOverride.ra.action.edit = 'Modificador';
RaLanguageOverride.ra.notification.updated =
  'Item atualizado com sucesso |||| %{smart_count} itens atualizados com sucesso';
RaLanguageOverride.ra.notification.created = 'Item criado com sucesso';
RaLanguageOverride.ra.page.dashboard = 'Painel';

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
    label: 'Você está logado em uma sessão temporária',
  },

  browserSupport: {
    label: '{name} versão {version} não é compatível',
  },

  GUI: {
    title: 'Configurações de efeito',
    folders: {
      position: 'Posição',
      rotation: 'Rotação',
      scale: 'Escada',
    },
    labels: {
      position: {
        x: 'Esquerda ↔ Direita',
        y: 'Superior ↕ Inferior',
        z: 'Frente ↹ Verso',
      },
      rotation: {
        x: 'x',
        y: 'e',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Estreito ↔ Largo',
        y: 'Pequeno ↕ Longo',
        z: 'Com',
      },
    },
    cta: {
      profile: 'Valores de perfil',
      default: 'Valores padrão',
    },
    confirm: {
      title: 'Tem certeza de que deseja sair sem salvar?',
    },
  },
};
