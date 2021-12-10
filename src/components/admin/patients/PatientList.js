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
