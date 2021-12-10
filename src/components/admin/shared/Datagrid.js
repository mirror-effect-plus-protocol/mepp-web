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
