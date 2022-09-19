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
  useListContext,
  useLocale,
  useTranslate,
} from 'react-admin';
import { Divider, Tabs, Tab } from '@material-ui/core';

import ArchivableFilter from '../shared/filters/ArchivableFilter';
import BulkActionButtons from '../shared/toolbars/BulkActionsToolbar';
import ListActions from '../shared/toolbars/ListToolbar';
import RowActionToolbar from '../shared/toolbars/RowActionToolbar';
import Spinner from '../shared/Spinner';
import ExerciseListAside from './ExerciseListAside';

const tabs = [
  { id: 'user', is_system: false },
  { id: 'system', is_system: true },
];

const ExerciseDatagrid = ({ locale, permissions, ...props }) => {
  return (
    <Datagrid {...props}>
      <TextField source={`i18n.description.${locale}`} />
      {permissions === 'admin' && (
        <ReferenceField source="clinician_uid" reference="clinicians">
          <TextField source="full_name" />
        </ReferenceField>
      )}
      <RowActionToolbar permissions={permissions} clonable={true} />
    </Datagrid>
  );
};

const TabbedDatagrid = ({ permissions, ...props }) => {
  const listContext = useListContext();
  const locale = useLocale();
  const t = useTranslate();
  const { ids, filterValues, setFilters, displayedFilters, loading } =
    listContext;
  const [userExerciseIds, setUserExerciseIds] = useState([]);
  const [systemExerciseIds, setSystemExerciseIds] = useState([]);
  const [value, setValue] = useState('user');
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilters &&
      setFilters(
        { ...filterValues, is_system: newValue === 'user' ? false : true },
        displayedFilters,
      );
  };

  useEffect(() => {
    if (filterValues.is_system) {
      // reset `value` to `system` when it's out of sync
      if (value === 'user') {
        setValue('system');
      }
      setSystemExerciseIds(ids);
    } else {
      setUserExerciseIds(ids);
    }
  }, [ids, filterValues.is_system]);

  return (
    <Fragment>
      <Tabs value={value} indicatorColor="primary" onChange={handleChange}>
        {tabs.map((choice) => (
          <Tab
            key={choice.id}
            label={t(`resources.${props.resource}.list.labels.${choice.id}`)}
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      <div>
        {loading && <Spinner />}
        {!loading && filterValues.is_system === false && (
          <ListContextProvider value={{ ...listContext, ids: userExerciseIds }}>
            <ExerciseDatagrid
              locale={locale}
              permissions={permissions}
              {...props}
            />
          </ListContextProvider>
        )}
        {!loading && filterValues.is_system === true && (
          <ListContextProvider
            value={{ ...listContext, ids: systemExerciseIds }}
          >
            <ExerciseDatagrid
              locale={locale}
              permissions={permissions}
              {...props}
            />
          </ListContextProvider>
        )}
      </div>
    </Fragment>
  );
};

export const ExerciseList = (props) => {
  const locale = useLocale();
  return (
    <List
      {...props}
      filterDefaultValues={{
        archived: false,
        is_system: false,
        language: locale,
      }}
      filters={<ArchivableFilter />}
      bulkActionButtons={<BulkActionButtons permissions={props.permissions} />}
      aside={<ExerciseListAside permissions={props.permissions} />}
      sort={{ field: `i18n.description.${locale}`, order: 'ASC' }}
      perPage={25}
      actions={<ListActions />}
    >
      <TabbedDatagrid permissions={props.permissions} />
    </List>
  );
};
