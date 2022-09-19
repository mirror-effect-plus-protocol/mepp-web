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

import { RequestEndpoint, RequestMethod } from '../utils/constants';
import { fetchData } from '../utils/fetch';

// temporary token injected by URL like http://[url]]/?tt=wererrwerwe#/mirror
let temporaryToken = null;
// temporary profil managed by authTemporaryToken
let temporaryProfil = null;
// permissions user
let permissions = null;

/**
 * Based on `tokenAuthProvider` from ra-data-django-rest-framework
 * See https://github.com/bmihelac/ra-data-django-rest-framework/blob/master/src/tokenAuthProvider.ts
 */
const authProvider = {
  login: async ({ username, password }) => {
    const { data, response } = await fetchData(
      RequestEndpoint.LOGIN,
      { username, password },
      RequestMethod.POST,
    );

    if (data) {
      const error = data.non_field_errors || data.detail;
      if (error) throw new Error(error);
      if (data.token) localStorage.setItem('token', data.token);
      if (data.profile)
        localStorage.setItem('profile', JSON.stringify(data.profile));
    } else {
      throw new Error(`Service ${response.statusText} error`);
    }
  },

  logout: (reload) => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    permissions = null;

    // prevent rendering previous page(react-admin behaviour) after a success login
    if (reload === true) {
      window.location.href = '/';
      return Promise.reject();
    }

    return Promise.resolve();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      const hasToken = localStorage.getItem('token');
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      permissions = null;

      if (hasToken) window.location.href = '/'; // go to login
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('token')
      ? Promise.resolve(true)
      : Promise.reject();
  },

  getPermissions: async () => {
    if (!permissions) {
      const { data } = await fetchData(RequestEndpoint.PERMISSIONS);
      if (data && data.permissions) {
        try {
          permissions = data.permissions;
          return Promise.resolve(data.permissions);
        } catch (error) {
          return Promise.resolve('guest');
        }
      } else {
        return Promise.resolve('guest');
      }
    } else {
      return Promise.resolve(permissions);
    }
  },

  getIdentity: () => {
    try {
      const profile =
        temporaryProfil || JSON.parse(localStorage.getItem('profile'));
      // React-admin expect `fullName` instead of `full_name` to display it.
      profile['fullName'] = profile.full_name;
      return Promise.resolve(profile);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

const authTemporaryToken = async (token) => {
  temporaryToken = token;

  const { data } = await fetchData(RequestEndpoint.PROFILE);
  if (data && data.profile) {
    temporaryProfil = data.profile;
  } else {
    alert(`Client token is not valid or expired`);
    throw new Error(`Client token is not valid or expired`);
  }
};

export { temporaryToken, temporaryProfil };
export { authTemporaryToken };
export default authProvider;
