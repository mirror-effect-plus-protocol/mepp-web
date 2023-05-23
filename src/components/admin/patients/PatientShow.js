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
import { BoxedShowLayout, RaBox } from 'ra-compact-ui';
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import React, { Fragment, useState } from 'react';
import {
  Datagrid,
  Show,
  TextField,
  NumberField,
  DateField,
  EmailField,
  FunctionField,
  ListContextProvider,
  useLocale,
  useGetList,
  useNotify,
  usePermissions,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from 'react-admin';

import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  DialogContentText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { sanitizeRestProps } from '@admin/utils/props';

import ClinicianTextField from '@components/admin/clinicians/ClinicianTextField';
import AddPlanButton from '@components/admin/patients/AddPlanButton';
import Spinner from '@components/admin/shared/Spinner';
import { Typography } from '@components/admin/shared/dom/sanitize';
import RowActionToolbar from '@components/admin/shared/toolbars/RowActionToolbar';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

const useRaBoxStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  leftColumn: {
    flexDirection: 'column',
    flex: '0 0 60%',
    flexGrow: '3',
    justifyContent: 'center',
    marginBottom: '10px',
    paddingRight: '10px',
    borderRight: 'solid thin',
    marginRight: '10px',
  },
  rightColumn: {
    flex: '0 0 40%',
    flexDirection: 'column',
    flexGrow: '1',
  },
  columnChild: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '10px',
    '& .innerChild': {
      paddingLeft: 0,
    },
  },
  innerChild: {
    width: '50%',
  },
}));

const useArchivesStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
  },
}));

export const PatientShow = (props) => {
  return (
    <Show actions={<TopToolbar showExport={true} {...props} />}>
      <PatientShowRecord {...props}></PatientShowRecord>
    </Show>
  );
};

export const PatientShowRecord = (props) => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <BoxedShowLayout>
      <PatientShowLayout record={record} {...props}></PatientShowLayout>
    </BoxedShowLayout>
  );
};

export const PatientShowLayout = ({ record, props }) => {
  const t = useTranslate();
  const locale = useLocale();
  const notify = useNotify();
  const resource = useResourceContext();
  const { permissions } = usePermissions();
  const classes = useRaBoxStyles();
  const archivesToggleClasses = useArchivesStyles();
  const [sort, setSort] = useState({ field: 'start_date', order: 'DESC' });
  const [openDialogEmail, setOpenDialogEmail] = useState(false);
  const [archives, setArchives] = useState(false);
  const { data, total, isLoading } = useGetList('plans', {
    pagination: { page: 1, perPage: 9999 },
    sort: { field: 'start_date', order: 'DESC' },
    filter: { language: locale, patient_id: record.id, archived: archives },
  });
  const handleArchivesChange = (event) => {
    setArchives(event.target.checked);
  };

  const handleOpenDialogEmail = (event) => {
    setOpenDialogEmail(true);
  };

  const handleCloseDialogEmail = (event) => {
    setOpenDialogEmail(false);
  };

  const handleSendOnboarding = (event) => {
    setOpenDialogEmail(false);
    const url = `${process.env.API_ENDPOINT}/patients/${record.id}/resend/`;
    fetchJsonWithAuthToken(url, {
      method: 'POST',
      body: JSON.stringify({ 'confirm': true }),
    })
      .then(() => {
        notify('resources.patients.notifications.email.send.success', {
          type: 'info',
        });
      })
      .catch((e) => {
        notify('resources.patients.notifications.email.send.failure', {
          type: 'error',
        });
      })
      .finally(() => {});
  };

  return (
    <>
      <RaBox className={classes.root}>
        <RaBox className={classes.leftColumn}>
          <Typography variant="h6" gutterBottom>
            {t('admin.shared.labels.card.identity')}
          </Typography>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <TextField source="first_name" />
              <div>
                <EmailField source="email" />
                <IconButton
                  size="small"
                  style={{ marginLeft: '0.5em' }}
                  onClick={handleOpenDialogEmail}
                >
                  <MailOutlineIcon />
                </IconButton>
                <Dialog open={openDialogEmail}>
                  <DialogTitle>
                    {t('admin.shared.text.emailDialog.title')}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {t('admin.shared.text.emailDialog.body')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleCloseDialogEmail}
                      autoFocus
                      size="small"
                      variant="contained"
                      color="secondary"
                      startIcon={<ErrorOutlineIcon />}
                    >
                      {t('admin.shared.labels.cancelButton')}
                    </Button>
                    <Button
                      onClick={handleSendOnboarding}
                      color="primary"
                      variant="contained"
                      startIcon={<CheckCircle />}
                    >
                      {t('admin.shared.labels.confirmButton')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </RaBox>
            <RaBox className={classes.innerChild}>
              <TextField source="last_name" />
            </RaBox>
          </RaBox>
        </RaBox>

        <RaBox className={classes.rightColumn}>
          <Typography variant="h6" gutterBottom>
            {t('admin.shared.labels.card.informations')}
          </Typography>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <FunctionField
                label={t('resources.patients.fields.use_audio')}
                render={(record) =>
                  t(`resources.patients.shared.audio.${record.use_audio}`)
                }
              />
              <FunctionField
                label={t('resources.patients.fields.language')}
                render={(record) => t(`languages.${record.language}`)}
              />
            </RaBox>
            <RaBox className={classes.innerChild}>
              <FunctionField
                label={t('resources.patients.fields.side')}
                render={(record) =>
                  t(`resources.patients.shared.side.${record.side}`)
                }
              />
              <ClinicianTextField show={permissions === 'admin'} />
            </RaBox>
          </RaBox>
        </RaBox>
      </RaBox>

      <Typography variant="h6" gutterBottom gutterTop={true}>
        {t('resources.patients.card.labels.plans')}
        <FormGroup classes={archivesToggleClasses}>
          <FormControlLabel
            control={
              <Switch
                checked={archives}
                onChange={handleArchivesChange}
                color="primary"
              />
            }
            label={t('resources.plans.fields.archived')}
          />
        </FormGroup>
        <AddPlanButton patientUid={record.id} />
      </Typography>
      <div>
        {isLoading && <Spinner />}
        {!isLoading && (
          <ListContextProvider
            value={{
              data: data,
              total,
              sort: sort,
              resource: resource,
              selectedIds: [],
            }}
            {...sanitizeRestProps(props, ['label'], true)}
          >
            <Datagrid bulkActionButtons={false}>
              <TextField
                label={t('resources.plans.fields.name')}
                source={`i18n.name.${locale}`}
              />
              <NumberField
                textAlign="center"
                label={t('resources.plans.fields.daily_repeat')}
                source="daily_repeat"
              />
              <FunctionField
                textAlign="center"
                label={t('resources.plans.list.labels.exercises_count')}
                render={(record) => record.exercises.length}
              />
              <DateField
                textAlign="center"
                label={t('resources.plans.fields.start_date')}
                source="start_date"
              />
              <DateField
                textAlign="center"
                label={t('resources.plans.fields.end_date')}
                source="end_date"
              />
              <RowActionToolbar
                basePath="/plans"
                rowResource="plans"
                record={record}
                context={{ patientUid: record.id }}
                activable={true}
                clonable={true}
              />
            </Datagrid>
          </ListContextProvider>
        )}
      </div>

      <ShowToolBar basePath="/patients" />
    </>
  );
};
