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
RaLanguageOverride.ra.action.edit = 'Modificar';
RaLanguageOverride.ra.notification.updated =
  'Elemento atualizado com sucesso |||| %{smart_count} elementos atualizados com sucesso';
RaLanguageOverride.ra.notification.created = 'Elemento criado com sucesso';

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
    label: 'Você está conectado(a) em uma sessão temporária.',
  },

  browserSupport: {
    label: 'A versão {version} do {name} não é suportada.',
  },

  GUI: {
    title: 'Configurações do efeito',
    folders: {
      position: 'Posição',
      rotation: 'Rotação',
      scale: 'escala',
    },
    labels: {
      position: {
        x: 'Esquerda ↔ Direita',
        y: 'Cima ↕ Baixo',
        z: 'Frente ↹ Atrás',
      },
      rotation: {
        x: 'x',
        y: 'y',
        z: '↺ | ↻',
      },
      scale: {
        x: 'Estreito ↔ Largo',
        y: 'Pequeno ↕ Longo',
        z: 'z',
      },
    },
    cta: {
      profile: 'Valores do perfil',
      default: 'Valores padrão',
    },
    confirm: {
      title: 'Você realmente deseja sair sem salvar?',
    },
  },
};
