import React from 'react';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
} from 'react-admin';
import { CardContent, withStyles } from '@material-ui/core';
import {
  endOfYesterday,
  startOfWeek,
  startOfMonth,
} from 'date-fns';

import {
  ClinicianIcon,
  FaceIcon,
  SoundIcon,
  TimeIcon,
} from '@components/admin/shared/icons';
import useGetClinicians from '@components/admin/shared/hook/useGetClinicians';
import { ASide } from '@components/admin/shared/cards/ASide';

const PatientListAside = ({permissions}) => {
  const { data: clinicians, loaded } = useGetClinicians(permissions);

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

        <FilterList
          label="resources.patients.fields.side"
          icon={<FaceIcon />}
        >
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

        {permissions === 'admin' &&
          <FilterList
            label="resources.patients.fields.clinician_uid"
            icon={<ClinicianIcon />}
          >
            {loaded &&
              clinicians.map((clinician) => (
                <FilterListItem
                  label={clinician.name}
                  key={clinician.id}
                  value={{ clinician_uid: clinician.id }}
                />
              ))
            }
          </FilterList>
        }
      </CardContent>
    </ASide>
  );
};

export default PatientListAside;
