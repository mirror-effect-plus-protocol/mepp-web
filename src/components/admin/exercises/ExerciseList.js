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
import React, { useEffect, useCallback } from 'react';
import {
  Datagrid,
  TextField,
  useListFilterContext,
  usePermissions,
  useStore,
  useTranslate,
} from 'react-admin';

import { Box, Typography } from '@mui/material';

import { useLocale } from '@hooks/locale/useLocale';

import ResourceList from '@components/admin/shared/resources/ResourceList';
import BulkActionButtons from '@components/admin/shared/toolbars/BulkActionButtons';
import RowActionToolbar from '@components/admin/shared/toolbars/RowActionToolbar';

import { CategoryFilterModal } from './CategoryFilter';

export const ExerciseList = () => {
  const { permissions } = usePermissions();
  const { locale } = useLocale();
  const [, setPatientUid] = useStore('patient.uid', false);

  useEffect(() => {
    setPatientUid(false);
  }, []);

  const CustomEmpty = useCallback(() => {
    const t = useTranslate();
    const {filterValues} = useListFilterContext();
    const category_uid = filterValues?.category__uid;
    const isCategoryChosen = !(category_uid === '-1' || category_uid === -1 || category_uid === 'false' || !category_uid);

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        padding="2rem"
      >
        {isCategoryChosen && (
          <Typography variant="h6">
            {t('resources.exercises.empty.title')}
          </Typography>
        )}
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {t('resources.exercises.empty.description')}
          <CategoryFilterModal autoOpen storekey="CategorieFilterIndex" />
        </Typography>
      </Box>
    );
  }, []);

  return (
    <ResourceList
      hasEdit={permissions === 'admin'}
      sortField={`i18n.description.${locale}`}
      filterDefaultValues={{
        language: locale,
        category__uid: -1,
      }}
      showArchivableFilter={permissions === 'admin'}
      showCreate={permissions === 'admin'}
      showExercisesFilter
    >
      <Datagrid
        bulkActionButtons={<BulkActionButtons permissions={permissions} />}
        empty={<CustomEmpty />}
      >
        <TextField source={`i18n.description.${locale}`} />
        <RowActionToolbar
          permissions={permissions}
          clonable={permissions === 'admin'}
          editable={permissions === 'admin'}
        />
      </Datagrid>
    </ResourceList>
  );
};
