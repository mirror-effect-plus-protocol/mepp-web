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
import { endOfYesterday, startOfWeek, startOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useGetIdentity,
  useListFilterContext,
} from 'react-admin';

import VideocamIcon from '@mui/icons-material/Videocam';
import { CardContent } from '@mui/material';

import { ASide } from '@components/admin/shared/cards/ASide';
import useGetClinicians from '@components/admin/shared/hook/useGetClinicians';
import {
  ClinicianIcon,
  FaceIcon,
  SoundIcon,
  TimeIcon,
} from '@components/admin/shared/icons';

const PatientListAside = ({ permissions }) => {
  const {
    data: clinicians,
    loaded: isLoaded,
    refetch,
  } = useGetClinicians(permissions, true);
  const [defaultClinician, setDefaultClinician] = useState(true);
  const [clickClinician, setClickClinician] = useState(false);
  const { identity } = useGetIdentity();
  const { filterValues, setFilters } = useListFilterContext();

  useEffect(() => {
    if (permissions !== 'admin') {
      return;
    }

    if (defaultClinician && identity?.uid) {
      if (!filterValues?.clinician_uid) {
        setFilters({
          ...filterValues,
          'clinician_uid': identity.uid,
        });
      }
    }
  }, [identity, defaultClinician]);

  useEffect(() => {
    if (clickClinician) {
      refetch(identity?.uid, filterValues.clinician_uid);
      setTimeout(() => setClickClinician(false), 200);
    }
  }, [filterValues]);

  useEffect(() => {
    if (permissions !== 'admin') {
      return;
    }

    if (identity?.uid && isLoaded) {
      if (filterValues?.clinician_uid) {
        refetch(identity?.uid, filterValues.clinician_uid);
      }
    }
  }, [identity, isLoaded]);

  return (
    <ASide>
      <CardContent>
        <FilterLiveSearch source="fulltext_search" />

        <FilterList
          label="resources.patients.filters.last_visited"
          icon={<TimeIcon />}
        >
          <FilterListItem
            label="resources.patients.filters.today"
            value={{
              last_login__gte: endOfYesterday().toISOString(),
              last_login__lte: undefined,
            }}
          />
          <FilterListItem
            label="resources.patients.filters.this_week"
            value={{
              last_login__gte: startOfWeek(new Date()).toISOString(),
              last_login__lte: undefined,
            }}
          />
          <FilterListItem
            label="resources.patients.filters.this_month"
            value={{
              last_login__gte: startOfMonth(new Date()).toISOString(),
              last_login__lte: undefined,
            }}
          />
        </FilterList>

        <FilterList label="resources.patients.fields.side" icon={<FaceIcon />}>
          <FilterListItem
            label="resources.patients.shared.side.0"
            value={{ side: 0 }}
          />
          <FilterListItem
            label="resources.patients.shared.side.1"
            value={{ side: 1 }}
          />
        </FilterList>

        <FilterList
          label="resources.patients.fields.use_audio"
          icon={<SoundIcon />}
        >
          <FilterListItem label="ra.boolean.true" value={{ use_audio: true }} />
          <FilterListItem
            label="ra.boolean.false"
            value={{ use_audio: false }}
          />
        </FilterList>

        <FilterList
          label="resources.patients.fields.use_video_only"
          icon={<VideocamIcon />}
        >
          <FilterListItem
            label="ra.boolean.true"
            value={{ use_video_only: true }}
          />
          <FilterListItem
            label="ra.boolean.false"
            value={{ use_video_only: false }}
          />
        </FilterList>

        {permissions === 'admin' && (
          <FilterList
            label="resources.patients.fields.clinician_uid"
            icon={<ClinicianIcon />}
          >
            {isLoaded &&
              clinicians.map((clinician) => (
                <FilterListItem
                  label={clinician.name}
                  key={clinician.id}
                  value={{ clinician_uid: clinician.id }}
                  onMouseUp={() => {
                    setDefaultClinician(false);
                    setClickClinician(true);
                  }}
                />
              ))}
          </FilterList>
        )}
      </CardContent>
    </ASide>
  );
};

export default PatientListAside;
