import React from 'react';
import {
  Datagrid as RaDatagrid,
  DatagridBody as RaDatagridBody,
} from 'react-admin';

const DatagridBody = ({ ids, data, total, filterValues, ...rest }) => {
  const data_copy = {};
  const ids_copy = ids.filter((id) => {
    if (!data.hasOwnProperty(id)) {
      return false;
    }
    if (data[id].archived != filterValues.archived) {
      return false;
    }

    data_copy[id] = data[id];

    if (data.hasOwnProperty('fetchedAt')) {
      if (!data_copy.hasOwnProperty('fetchedAt')) {
        data_copy['fetchedAt'] = {};
      }
      data_copy['fetchedAt'][id] = data['fetchedAt'][id];
    }

    return true;
  });

  return (
    <RaDatagridBody
      ids={ids_copy}
      data={data_copy}
      total={ids_copy.length}
      {...rest}
    />
  );
};

const Datagrid = (props) => {
  return (
    <RaDatagrid
      {...props}
      body={
        <DatagridBody
          filterValues={props.filterValues}
          ids={props.ids}
          data={props.data}
          hasBulkActions={props.hasBulkActions}
        />
      }
    />
  );
};

export default Datagrid;
