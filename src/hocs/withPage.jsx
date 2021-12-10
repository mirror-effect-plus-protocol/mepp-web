import React, { useEffect } from 'react';
import { Notification } from 'react-admin';
import { useLocation } from 'react-router-dom';

import { temporaryProfil } from '@admin/authProvider';

import GlobalStyles from '@styles/Global';

import { TemporaryProfilBanner } from '@components/header/TemporaryProfilBanner';
import OverlayProvider from '@components/overlays/OverlayProvider';

/**
 * Basic page wrapper
 * @param Page Component
 */
const withPage = (Component) => {
  return function withPage(props) {
    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return (
      <OverlayProvider>
        <GlobalStyles />
        <main>
          {temporaryProfil && <TemporaryProfilBanner />}
          <Component {...props} />
          <Notification />
        </main>
      </OverlayProvider>
    );
  };
};

export default withPage;
