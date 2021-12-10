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
