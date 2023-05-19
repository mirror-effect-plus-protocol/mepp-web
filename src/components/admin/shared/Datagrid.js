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
  useListContext,
} from 'react-admin';

const DatagridBody = ({ data, total, ...rest }) => {
  const { filterValues } = useListContext();
  const data_copy = data.filter((item) => {
    if (item.archived != filterValues.archived) {
      return false;
    }
    return true;
  });

  // const ids_copy = ids.filter((id) => {
  //   if (!data.hasOwnProperty(id)) {
  //     return false;
  //   }
  //   if (data[id].archived != filterValues.archived) {
  //     return false;
  //   }

  //   data_copy[id] = data[id];

  //   if (data.hasOwnProperty('fetchedAt')) {
  //     if (!data_copy.hasOwnProperty('fetchedAt')) {
  //       data_copy['fetchedAt'] = {};
  //     }
  //     data_copy['fetchedAt'][id] = data['fetchedAt'][id];
  //   }

  //   return true;
  // });

  return <RaDatagridBody data={data_copy} total={data_copy.length} {...rest} />;
};

const Datagrid = (props) => {
  const { bulkActionButtons, filterValues, data, ...rest } = props;
  return (
    <RaDatagrid
      {...rest}
      filterValues={filterValues}
      bulkActionButtons={bulkActionButtons}
      body={<DatagridBody data={data} />}
    />
  );
};

export default Datagrid;
