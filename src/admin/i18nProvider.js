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
import i18n from 'locales';
import de from 'locales/de';
import en from 'locales/en';
import es from 'locales/es';
import fr from 'locales/fr';
import it from 'locales/it';
import pt from 'locales/pt';
import polyglotI18nProvider from 'ra-i18n-polyglot';

export default polyglotI18nProvider((locale) => {
  localStorage.setItem('language', locale);
  if (locale === 'de') {
    return de;
  }
  if (locale === 'en') {
    return en;
  }
  if (locale === 'es') {
    return es;
  }
  if (locale === 'it') {
    return it;
  }
  if (locale === 'pt') {
    return pt;
  }
  if (locale === 'en') {
    return en;
  }
  return fr;
}, i18n.language);
