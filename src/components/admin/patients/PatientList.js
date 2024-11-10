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
import React, { useEffect } from 'react';
import {
  ReferenceField,
  TextField,
  usePermissions,
  useStore,
} from 'react-admin';

import ResourceList from '@components/admin/shared/resources/ResourceList';

import Datagrid from '../shared/Datagrid';
import BulkActionButtons from '../shared/toolbars/BulkActionsToolbar';
import RowActionToolbar from '../shared/toolbars/RowActionToolbar';
import PatientListAside from './PatientListAside';

export const PatientList = () => {
  const { permissions } = usePermissions();

  const [, setPatientUid] = useStore('patient.uid', false);
  useEffect(() => {
    setPatientUid(false);
  }, []);

  return (
    <ResourceList
      sortField="full_name"
      aside={<PatientListAside permissions={permissions} />}
      showExport
    >
      <Datagrid
        bulkActionButtons={
          <BulkActionButtons permissions={permissions} showExport />
        }
      >
        <TextField source="full_name" />
        {permissions === 'admin' && (
          <ReferenceField
            source="clinician_uid"
            reference="clinicians"
            link="show"
          >
            <TextField source="full_name" />
          </ReferenceField>
        )}
        <RowActionToolbar permissions={permissions} />
      </Datagrid>
    </ResourceList>
  );
};
