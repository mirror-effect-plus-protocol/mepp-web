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
  intro: {
    title: 'Hallo {{name}}',
    introduction:
      'Bereit, Ihre Übungseinheit zu beginnen? Konzentrieren Sie sich auf die Muskelkontraktionen und versuchen Sie, sie zu spüren, auch wenn Sie nichts bewegen sehen. Lassen Sie den Rest des Gesichts ruhen.',
    instruction:
      'Machen Sie die Übungen langsam, indem Sie dem vorgeschlagenen Rhythmus folgen.',
  },
  permission: {
    title: 'Berechtigung',
    introduction:
      'Um Ihr Sitzung fortzusetzen, müssen Sie den Zugriff dieser Webseite auf Ihre Kamera und Ihr Mikrofon erlauben.',
    instruction:
      'Um auf Ihre Sitzung zugreifen zu können, müssen Sie sie zunächst autorisieren, indem Sie die Einstellungen Ihres Browsers ändern.',
  },
};
