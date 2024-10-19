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
import React, { Fragment, useEffect, useState } from 'react';
import {
  Datagrid,
  List,
  ListContextProvider,
  ReferenceField,
  TextField,
  FilterContext,
  useListContext,
  usePermissions,
  useResourceContext, useStore,
  useTranslate,
} from 'react-admin';

import { useLocale } from '@hooks/locale/useLocale';
import {Divider, Tabs, Tab, Card, CardContent} from '@mui/material';
import { Typography } from '@components/admin/shared/dom/sanitize';

import Spinner from '@components/admin/shared/Spinner';
import ArchivableFilter from '@components/admin/shared/filters/ArchivableFilter';
import BulkActionButtons from '@components/admin/shared/toolbars/BulkActionsToolbar';
import ListActions from '@components/admin/shared/toolbars/ListToolbar';
import RowActionToolbar from '@components/admin/shared/toolbars/RowActionToolbar';

import ExerciseListAside from './ExerciseListAside';


export const ExerciseList = () => {
  const { permissions } = usePermissions();
  const { locale } = useLocale();

  const [patientUid, setPatientUid] = useStore('patient.uid', false);
  useEffect(() => {
    setPatientUid(false);
  }, []);


  return (
    <div>
      <List
        filterDefaultValues={{
          archived: false,
          language: locale,
        }}
        filters={<ArchivableFilter />}
        sort={{ field: `i18n.description.${locale}`, order: 'ASC' }}
        perPage={25}
        actions={<ListActions />}
      >
        {/* Ajout du composant Aside au-dessus de la liste */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Filtres</Typography>
            <FilterContext.Provider value={{}}>
              <ExerciseListAside permissions={permissions} />
            </FilterContext.Provider>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Datagrid
              bulkActionButtons={<BulkActionButtons permissions={permissions} />}
            >
              <TextField source={`i18n.description.${locale}`} />
              <RowActionToolbar permissions={permissions} clonable />
            </Datagrid>
          </CardContent>
        </Card>
      </List>
    </div>
  );
};
