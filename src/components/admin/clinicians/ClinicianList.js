import React from 'react';
import {
  BooleanField,
  List,
  TextField,
  FunctionField,
  useTranslate,
} from 'react-admin';


import Datagrid from '@components/admin/shared/Datagrid';
import ArchivableFilter from '@components/admin/shared/filters/ArchivableFilter';
import RowActionToolbar from '@components/admin/shared/toolbars/RowActionToolbar';
import ListActions from '@components/admin/shared/toolbars/ListToolbar';
import BulkActionButtons from '@components/admin/shared/toolbars/BulkActionsToolbar';

export const ClinicianList = (props) => {
  const t = useTranslate();

  return (
    <List
      {...props}
      sort={{ field: 'first_name', order: 'ASC' }}
      filters={<ArchivableFilter />}
      filterDefaultValues={{ archived: false, me: false }}
      perPage={25}
      actions={<ListActions/>}
      bulkActionButtons={<BulkActionButtons permissions={props.permissions} />}
    >
      <Datagrid>
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
        <RowActionToolbar permissions={props.permissions} />
      </Datagrid>
    </List>
  );
};
