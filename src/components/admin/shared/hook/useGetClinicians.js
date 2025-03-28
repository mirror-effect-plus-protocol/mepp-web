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
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import { useMemo, useState, useEffect } from 'react';

const useGetClinicians = (permissions, useProfileFirst = false) => {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setLoaded(false);
    const options = {
      ordering: !useProfileFirst ? 'full_name' : 'profile',
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

  const sortData = (userUid, selectedUid) => {
    if (userUid && data && data.length) {
      setLoading(true);
      const user = data.splice(
        data.findIndex((c) => c.id === userUid),
        1,
      )[0];
      if (selectedUid && selectedUid !== userUid) {
        const selected = data.splice(
          data.findIndex((c) => c.id === selectedUid),
          1,
        )[0];
        setData([
          user,
          selected,
          ...data.sort((a, b) => a.full_name.localeCompare(b.full_name)),
        ]);
      } else {
        setData([
          user,
          ...data.sort((a, b) => a.full_name.localeCompare(b.full_name)),
        ]);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permissions === 'admin') {
      fetchData().then();
    }
  }, [permissions]);

  return useMemo(() => {
    return {
      data: Object.values(data).map((clinician) => ({
        name: clinician.full_name,
        id: clinician.id,
      })),
      loading,
      loaded,
      refetch: sortData,
    };
  }, [data, loading, loaded]);
};

export default useGetClinicians;
