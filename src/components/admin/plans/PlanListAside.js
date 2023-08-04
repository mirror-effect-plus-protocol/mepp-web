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

import React from 'react';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
} from 'react-admin';
import { CardContent } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
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
