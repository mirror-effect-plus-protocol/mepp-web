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
