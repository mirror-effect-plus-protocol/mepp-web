import React, { Fragment } from 'react';
import { BulkDeleteButton } from 'react-admin';

import ExportButton from '@components/admin/shared/buttons/ExportButton';
import ToggleBulkArchiveButton from '@components/admin/shared/buttons/ToggleBulkArchiveButton';

const BulkActionsToolbar = ({permissions, showExport, ...props}) => {
  const filterValues = props.filterValues;

  if (filterValues.hasOwnProperty('is_system')
      && filterValues.is_system
      && permissions !== 'admin') {
    return false;
  } else {
    return (
      <Fragment>
        {showExport &&
          <ExportButton
            basePath={props.basePath}
            resource={props.resource}
            variant="contained"
            color="primary"
            style={{marginRight: '10px'}}
            selectedIds={props.selectedIds}
            filterValues={props.filterValues}
          />
        }
        <ToggleBulkArchiveButton
          archivedFilterValue={filterValues.archived}
          variant="contained"
          color="primary"
          {...props}
        />
        {permissions === 'admin' && filterValues.archived && (
          <BulkDeleteButton
            {...props}
            variant="outlined"
            undoable={false}
            style={{marginLeft: '10px', borderColor: 'red'}}
          />
        )}
      </Fragment>
    );
  }
};

export default BulkActionsToolbar;
