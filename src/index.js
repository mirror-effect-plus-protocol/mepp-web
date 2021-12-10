import i18n from 'i18next';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('app'));
