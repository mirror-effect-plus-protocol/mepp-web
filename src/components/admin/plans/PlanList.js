import React, { Fragment, useEffect, useState }  from 'react';
import {
  Datagrid,
  FunctionField,
  List,
  ListContextProvider,
  ReferenceField,
  TextField,
  useListContext,
  useLocale,
  useTranslate,
} from 'react-admin';
import { Divider, Tabs, Tab } from '@material-ui/core';

import Spinner from '../shared/Spinner';
import ArchivableFilter from '../shared/filters/ArchivableFilter';
import RowActionToolbar from '../shared/toolbars/RowActionToolbar';
import ListActions from '@components/admin/shared/toolbars/ListToolbar';
import BulkActionButtons from '@components/admin/shared/toolbars/BulkActionsToolbar';
import PlanListAside from '@components/admin/plans/PlanListAside';

const tabs = [
  { id: 'user', is_system: false },
  { id: 'system', is_system: true },
];

const PlanDatagrid = ({permissions, ...props}) => {
  const locale = useLocale();
  const t = useTranslate();

  return (
    <Datagrid {...props}>
      <TextField source={`i18n.name.${locale}`} />
      <TextField textAlign="center" source="daily_repeat" />
      <FunctionField
        textAlign="center"
        label={t('resources.plans.list.labels.exercises_count')}
        render={(record) => record.exercises.length}
      />
      {permissions === 'admin' && (
        <ReferenceField
          source="clinician_uid"
          reference="clinicians"
        >
          <TextField source="full_name" />
        </ReferenceField>
      )}
      <RowActionToolbar
        permissions={permissions}
        clonable={true}
      />
    </Datagrid>
  );
};

const TabbedDatagrid = ({permissions, ...props}) => {
  const listContext = useListContext();
  const t = useTranslate();
  const { ids, filterValues, setFilters, displayedFilters, loading } =
    listContext;
  const [userPlanIds, setUserPlanIds] = useState([]);
  const [systemPlanIds, setSystemPlanIds] = useState([]);
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
      if (value === 'user') { setValue('system'); }
      setSystemPlanIds(ids);
    } else {
      setUserPlanIds(ids);
    }
  }, [ids, filterValues.is_system]);

  return (
    <Fragment>
      <Tabs
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map((choice) => {
          const label = permissions === 'admin' && choice.id === 'user'
            ? t(`resources.${props.resource}.list.labels.admin`)
            : t(`resources.${props.resource}.list.labels.${choice.id}`);
          return (
            <Tab
              key={choice.id}
              label={label}
              value={choice.id}
            />
          )
        })}
      </Tabs>
      <Divider />
      <div>
        {loading && <Spinner />}
        {!loading && filterValues.is_system === false && (
          <ListContextProvider value={{ ...listContext, ids: userPlanIds }}>
            <PlanDatagrid permissions={permissions} {...props} />
          </ListContextProvider>
        )}
        {!loading && filterValues.is_system === true && (
          <ListContextProvider value={{ ...listContext, ids: systemPlanIds }}>
            <PlanDatagrid permissions={permissions} {...props} />
          </ListContextProvider>
        )}
      </div>
    </Fragment>
  );
};

export const PlanList = (props) => {
  const locale = useLocale();
  return (
    <List
      {...props}
      filterDefaultValues={{
        archived: false,
        is_system: false,
        is_template: true,
        language: locale,
      }}
      filters={<ArchivableFilter />}
      sort={{ field: `i18n.description.${locale}`, order: 'ASC' }}
      perPage={25}
      bulkActionButtons={<BulkActionButtons permissions={props.permissions} />}
      actions={<ListActions/>}
      aside={<PlanListAside permissions={props.permissions} />}
    >
      <TabbedDatagrid permissions={props.permissions}/>
    </List>
  )
};
