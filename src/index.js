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

import i18n from 'i18next';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from 'styled-components';

import Admin from './admin/index';

import { theme } from './themes/index';

import { log } from './utils/log';

/**
 * Application initialisation with hot reload
 */
const App = () => {
  useEffect(() => {
    // set dom starting language
    document.documentElement.lang = i18n.language;

    log(`project node env: ${process.env.NODE_ENV}`);
    log(`project environment: ${process.env.REACT_APP_ENVIRONMENT}`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Admin />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
