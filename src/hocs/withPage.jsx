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
