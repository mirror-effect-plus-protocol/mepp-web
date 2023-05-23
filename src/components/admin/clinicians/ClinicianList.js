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
  BooleanField,
  List,
  TextField,
  FunctionField,
  usePermissions,
  useTranslate,
} from 'react-admin';


import Datagrid from '@components/admin/shared/Datagrid';
import ArchivableFilter from '@components/admin/shared/filters/ArchivableFilter';
import RowActionToolbar from '@components/admin/shared/toolbars/RowActionToolbar';
import ListActions from '@components/admin/shared/toolbars/ListToolbar';
import BulkActionButtons from '@components/admin/shared/toolbars/BulkActionsToolbar';

export const ClinicianList = (props) => {
  const permissions = usePermissions();
  const t = useTranslate();

  return (
    <List
      {...props}
      sort={{ field: 'first_name', order: 'ASC' }}
      filters={<ArchivableFilter />}
      filterDefaultValues={{ archived: false, me: false }}
      perPage={25}
      actions={<ListActions/>}
    >
      <Datagrid bulkActionButtons={<BulkActionButtons permissions={permissions} />}>
        <TextField source="full_name" />
        <BooleanField
          textAlign="center"
          source="is_superuser"
          style={{display: 'inline-block'}}
        />
        <FunctionField
          label={t('resources.clinicians.list.labels.patients_count')}
          render={(record) => record.patients.length}
          textAlign="center"
        />
        <RowActionToolbar permissions={permissions} />
      </Datagrid>
    </List>
  );
};
