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
