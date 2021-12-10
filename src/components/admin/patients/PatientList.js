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
  List,
  ReferenceField,
  TextField,
} from 'react-admin';
import Datagrid from '../shared/Datagrid';
import ArchivableFilter from '../shared/filters/ArchivableFilter';
import BulkActionButtons from '../shared/toolbars/BulkActionsToolbar';
import RowActionToolbar from '../shared/toolbars/RowActionToolbar';
import PatientListAside from './PatientListAside';
import ListActions from '@components/admin/shared/toolbars/ListToolbar';

export const PatientList = (props) => {
  return (
    <List
      {...props}
      sort={{ field: 'full_name', order: 'ASC' }}
      filters={<ArchivableFilter />}
      filterDefaultValues={{ archived: false }}
      bulkActionButtons={
        <BulkActionButtons
          permissions={props.permissions}
          showExport={true}
        />
      }
      aside={<PatientListAside permissions={props.permissions}/>}
      perPage={25}
      actions={<ListActions showExport={true} />}
    >
      <Datagrid>
        <TextField source="full_name" />
        {props.permissions === 'admin' && (
          <ReferenceField
            source="clinician_uid"
            reference="clinicians"
            link="show"
          >
            <TextField source="full_name" />
          </ReferenceField>
        )}
        <RowActionToolbar permissions={props.permissions}/>
      </Datagrid>
    </List>
  );
};
