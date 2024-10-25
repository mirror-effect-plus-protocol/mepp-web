import React from 'react';
import { List } from 'react-admin';

import ArchivableFilter from '@components/admin/shared/filters/ArchivableFilter';
import ListActions from '@components/admin/shared/toolbars/ListToolbar';

const ResourceList = ({
  children,
  sortField,
  filterDefaultValues,
  ...props
}) => {
  const showExercisesFilter = props?.showExercisesFilter || false;
  const showExport = props?.showExport || false;
  const mergedFilterDefaultValues = {
    archived: false,
    ...filterDefaultValues,
  };

  return (
    <List
      sort={{ field: sortField, order: 'ASC' }}
      filters={<ArchivableFilter />}
      filterDefaultValues={mergedFilterDefaultValues}
      perPage={25}
      actions={
        <ListActions
          showExport={showExport}
          showExercisesFilter={showExercisesFilter}
        />
      }
      {...props}
    >
      {children}
    </List>
  );
};

export default ResourceList;
