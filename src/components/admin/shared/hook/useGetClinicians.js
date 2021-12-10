import React, {useMemo, useState, useEffect } from 'react';
import {fetchJsonWithAuthToken} from "ra-data-django-rest-framework";

const useGetClinicians = (permissions) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    setLoaded(false);
    const options = {
      ordering: 'full_name',
      archived: false,
    };
    const qs = new URLSearchParams(options).toString();
    const url = `${process.env.API_ENDPOINT}/clinicians/?${qs}`;
    const response = await fetchJsonWithAuthToken(url, {});
    setData(response.json.results);
    setLoading(false);
    setLoaded(true);
  };

  useEffect(() => {
    if (permissions === 'admin') {
      fetchData();
    }
  }, [permissions]);

  return useMemo(() => {
    return {
      data: Object.values(data).map((clinician) => ({
        name: clinician.full_name,
        id: clinician.id
      })),
      loading: loading,
      loaded: loaded
    };
  }, [data, loading, loaded]);
};

export default useGetClinicians;
