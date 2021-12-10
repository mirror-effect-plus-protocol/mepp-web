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

import { useState } from 'react';

import { RequestMethod } from '@utils/constants';
import { fetchData } from '@utils/fetch';

/**
 * HOOK TO USE API CALL WITH FETCH DATA
 */
const useApi = (endpoint) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();

  const send = async (payload, method) => {
    setLoading(true);
    setError(false);

    const { data, response } = await fetchData(endpoint, payload, method);
    if (data) {
      setData(data);
      if (response.status !== 200) setSuccess(false);
      else setSuccess(true);
    } else {
      setError(true);
      setSuccess(false);
    }

    setLoading(false);

    return { data, response };
  };

  const post = async (payload) => await send(payload, RequestMethod.POST);
  const get = async (payload) => await send(payload, RequestMethod.GET);
  const patch = async (payload) => await send(payload, RequestMethod.PATCH);

  return { data, error, success, loading, get, post, patch };
};

export { useApi };
