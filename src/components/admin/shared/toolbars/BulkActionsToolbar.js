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
import React, { Fragment } from 'react';
import { BulkDeleteButton, useResourceContext } from 'react-admin';

import ExportButton from '@components/admin/shared/buttons/ExportButton';
import ToggleBulkArchiveButton from '@components/admin/shared/buttons/ToggleBulkArchiveButton';

const BulkActionsToolbar = ({ permissions, showExport, ...props }) => {
  const filterValues = props.filterValues;
  const resourceName = useResourceContext();

  if (
    filterValues.hasOwnProperty('is_system') &&
    filterValues.is_system &&
    permissions !== 'admin'
  ) {
    return false;
  } else {
    return (
      <Fragment>
        {showExport && (
          <ExportButton
            resource={resourceName}
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
            selectedIds={props.selectedIds}
            filterValues={props.filterValues}
          />
        )}
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
            style={{ marginLeft: '10px', borderColor: 'red' }}
          />
        )}
      </Fragment>
    );
  }
};

export default BulkActionsToolbar;
