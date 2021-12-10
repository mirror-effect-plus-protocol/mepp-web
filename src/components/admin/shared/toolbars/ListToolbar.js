import React from 'react';
import { cloneElement } from 'react';
import {
  TopToolbar,
  CreateButton,
} from 'react-admin';
import ExportButton from '@components/admin/shared/buttons/ExportButton';

const ListActions = ({showExport, ...props}) => (
  <TopToolbar>
    {cloneElement(props.filters, { context: 'button' })}
    {showExport &&
      <ExportButton
        basePath={props.basePath}
        resource={props.resource}
        variant="outlined"
        style={{marginRight: '0.8em'}}
        filterValues={props.filterValues}
      />
      }
    <CreateButton variant="outlined" />
  </TopToolbar>
);

export default ListActions;
