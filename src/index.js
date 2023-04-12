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
import { createRoot } from 'react-dom/client';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';

import Admin from '@admin/index';

import { theme } from '@themes/index';

import { log } from '@utils/log';

/**
 * Application initialisation with hot reload
 */
const App = hot(() => {
  useEffect(() => {
    // set dom starting language
    document.documentElement.lang = i18n.language;

    log(`project name: ${process.env.PROJECT_NAME}`);
    log(`project version: ${process.env.PROJECT_VERSION}`);
    log(`project environment: ${process.env.ENVIRONMENT}`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Admin />
    </ThemeProvider>
  );
});

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);