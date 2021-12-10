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

import { temporaryToken } from '@admin/authProvider';

import { log } from '@utils/log';

import { RequestMethod } from './constants';

const fetchData = async (
  endpoint,
  payload = {},
  method = RequestMethod.GET,
) => {
  const accessToken = temporaryToken || localStorage.getItem('token');
  const headers = new Headers({
    'Authorization': accessToken ? `Token ${accessToken}` : '',
    'Content-Type': 'application/json',
  });

  const response = await fetch(
    new Request(`${process.env.API_ENDPOINT}${endpoint}`, {
      method,
      body: method === RequestMethod.GET ? null : JSON.stringify(payload),
      headers,
    }),
  );

  if (response.headers.get('content-type') !== 'application/json') {
    log(`Service ${response.statusText} error`);
    return { response };
  }

  const data = await response.json();

  if (response.status == 401 || response.status == 403) {
    log(`Service ${endpoint} not authorized`);
    const hasToken = localStorage.getItem('token');
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    if (hasToken) window.location.href = '/'; // go to login
  }
  if (response.status == 404) log(`Service ${endpoint} not found`);
  if (response.status == 400) log(`Service ${endpoint} error`);
  if (response.status == 500) log(`Service ${endpoint} error`);

  return { data, response };
};

export { fetchData };
