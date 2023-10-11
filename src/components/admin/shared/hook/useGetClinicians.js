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
      page_size: 9999,
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
