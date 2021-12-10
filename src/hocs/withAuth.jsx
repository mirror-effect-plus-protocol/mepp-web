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
import { Authenticated } from 'react-admin';
import { WithPermissions } from 'react-admin';

import { authTemporaryToken } from '@admin/authProvider';

/**
 * Protect pages that need authenticated users like /mirror page
 * @param Page Component
 */
const withAuth = (Component) => {
  return function withAuth(props) {
    useEffect(() => {
      const queries = new URLSearchParams(window.location.search);
      const token = queries.get('tt');
      if (token) authTemporaryToken(token);
    }, []);

    return (
      <Authenticated location={props.location}>
        <WithPermissions
          location={props.location}
          render={({ permissions }) =>
            permissions === 'user' || permissions === 'admin' ? (
              <Component {...props} />
            ) : null
          }
        />
      </Authenticated>
    );
  };
};

export default withAuth;
