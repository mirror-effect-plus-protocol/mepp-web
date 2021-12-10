import React from 'react';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
} from 'react-admin';
import { CardContent, withStyles } from '@material-ui/core';
import { ClinicianIcon } from '@components/admin/shared/icons/ClinicianIcon';
import useGetClinicians from '@components/admin/shared/hook/useGetClinicians';
import { ASide } from '@components/admin/shared/cards/ASide';

const PlanListAside = ({permissions}) => {
  const { data: clinicians, loaded } = useGetClinicians(permissions);
  return (
    <ASide>
      <CardContent>
        <FilterLiveSearch source="fulltext_search" />

        {permissions === 'admin' && (
          <FilterList
            label="resources.plans.fields.clinician_uid"
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
        )}
      </CardContent>
    </ASide>
  );
};

export default PlanListAside;
