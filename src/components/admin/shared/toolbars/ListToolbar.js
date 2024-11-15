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
  TopToolbar,
  CreateButton,
  useResourceContext,
  useListFilterContext,
} from 'react-admin';

import { CategoryFilterModal } from '@components/admin/exercises/CategoryFilter';
import ExportButton from '@components/admin/shared/buttons/ExportButton';

const ListActions = ({
  showExport = false,
  showExercisesFilter = false,
  showCreate = true,
}) => {
  const resourceName = useResourceContext();
  const { filterValues } = useListFilterContext();

  return (
    <TopToolbar>
      {showExercisesFilter && (
        <CategoryFilterModal storekey="CategorieFilterIndex" />
      )}
      {showExport && (
        <ExportButton
          resource={resourceName}
          variant="outlined"
          sx={{
            marginRight: {
              xs: '5px', // theme.breakpoints.up('xs')
              md: 0, // theme.breakpoints.up('md')
            },
          }}
          filterValues={filterValues}
        />
      )}
      {showCreate && <CreateButton variant="outlined" />}
    </TopToolbar>
  );
};

export default ListActions;
