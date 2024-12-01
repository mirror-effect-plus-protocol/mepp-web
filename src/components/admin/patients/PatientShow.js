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
import React, { useEffect, useState } from 'react';
import {
  Datagrid,
  Show,
  BooleanField,
  TextField,
  NumberField,
  DateField,
  EmailField,
  FunctionField,
  Labeled,
  ListContextProvider,
  useGetList,
  useNotify,
  usePermissions,
  useRecordContext,
  useResourceContext,
  useResourceDefinition,
  useStore,
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

import { useLocale } from '@hooks/locale/useLocale';

import ClinicianTextField from '@components/admin/clinicians/ClinicianTextField';
import AddPlanButton from '@components/admin/patients/AddPlanButton';
import { PatientWidget } from '@components/admin/patients/PatientWidget';
import Spinner from '@components/admin/shared/Spinner';
import { Typography } from '@components/admin/shared/dom/sanitize';
import { useRaBoxStyles } from '@components/admin/shared/styles/shared';
import RowActionToolbar from '@components/admin/shared/toolbars/RowActionToolbar';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

const useArchivesStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
  },
}));

export const PatientShow = () => {
  const { hasEdit } = useResourceDefinition();
  return (
    <Show actions={<TopToolbar showExport hasEdit={hasEdit} hasShow={false} />}>
      <PatientShowRecord />
    </Show>
  );
};

export const PatientShowRecord = () => {
  const record = useRecordContext();
  if (!record) return null;
  const [, setPatientUid] = useStore('patient.uid', record.id);
  const classes = useRaBoxStyles();

  useEffect(() => {
    setPatientUid(record.id);
  }, [record]);

  return (
    <BoxedShowLayout className={classes.container}>
      <PatientShowLayout record={record}></PatientShowLayout>
    </BoxedShowLayout>
  );
};

export const PatientShowLayout = ({ record }) => {
  const t = useTranslate();
  const { locale } = useLocale();
  const notify = useNotify();
  const resource = useResourceContext();
  const { permissions } = usePermissions();
  const classes = useRaBoxStyles();
  const archivesToggleClasses = useArchivesStyles();
  const [sort] = useState({ field: 'start_date', order: 'DESC' });
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

  const handleOpenDialogEmail = () => {
    setOpenDialogEmail(true);
  };

  const handleCloseDialogEmail = () => {
    setOpenDialogEmail(false);
  };

  const handleSendOnboarding = () => {
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
      .catch(() => {
        notify('resources.patients.notifications.email.send.failure', {
          type: 'error',
        });
      })
      .finally(() => {});
  };

  return (
    <BoxedShowLayout className={classes.container}>
      <RaBox className={classes.root}>
        <RaBox className={classes.oneColumn}>
          <Typography variant="h6" gutterBottom>
            {t('admin.shared.labels.card.identity')}
          </Typography>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <Labeled>
                <TextField source="first_name" />
              </Labeled>
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <EmailField source="email" sx={{ marginRight: '5px' }} />
                  <IconButton size="small" onClick={handleOpenDialogEmail}>
                    <MailOutlineIcon />
                  </IconButton>
                </div>
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
              </>
            </RaBox>
            <RaBox className={classes.innerChild}>
              <Labeled>
                <TextField source="last_name" />
              </Labeled>
              <RaBox className={classes.innerChild}>
                <ClinicianTextField show={permissions === 'admin'} />
              </RaBox>
            </RaBox>
          </RaBox>
        </RaBox>
      </RaBox>
      <RaBox className={classes.root}>
        <RaBox className={classes.oneColumn}>
          <Typography variant="h6" gutterBottom>
            {t('admin.shared.labels.card.informations')}
          </Typography>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <Labeled>
                <FunctionField
                  label={t('resources.patients.fields.language')}
                  render={(record) => t(`languages.${record.language}`)}
                />
              </Labeled>
            </RaBox>
            <RaBox className={classes.innerChild}>
              <Labeled>
                <FunctionField
                  label={t('resources.patients.fields.side')}
                  render={(record) =>
                    t(`resources.patients.shared.side.${record.side}`)
                  }
                />
              </Labeled>
            </RaBox>
          </RaBox>
        </RaBox>
      </RaBox>
      <RaBox className={classes.root}>
        <RaBox className={classes.oneColumn}>
          <Typography variant="h6" gutterBottom>
            {t('admin.shared.labels.card.instructions')}
          </Typography>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <Labeled>
                <FunctionField
                  label={t('resources.patients.fields.use_audio')}
                  render={(record) =>
                    t(`resources.patients.shared.audio.${record.use_audio}`)
                  }
                />
              </Labeled>
            </RaBox>
            <RaBox className={classes.innerChild}>
              <Labeled>
                <FunctionField
                  label={t('resources.patients.fields.use_video_only')}
                  render={(record) =>
                    t(
                      `resources.patients.shared.video.${record.use_video_only}`,
                    )
                  }
                />
              </Labeled>
            </RaBox>
          </RaBox>
        </RaBox>
      </RaBox>
      <RaBox className={classes.buttonLine}>
        <RaBox className={classes.buttonLineLeft}>
          <Typography variant="h6" gutterBottom>
            {t('resources.patients.card.labels.plans')}
          </Typography>
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
        </RaBox>
        <AddPlanButton patientUid={record.id} />
      </RaBox>
      <div>
        {isLoading && <Spinner />}
        {!isLoading && (
          <ListContextProvider
            value={{
              data,
              total,
              sort,
              resource,
              selectedIds: [],
            }}
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
              <BooleanField
                textAlign="center"
                label={t('resources.plans.fields.randomize')}
                source="randomize"
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
                rowResource="plans"
                record={record}
                context={{ patientUid: record.id }}
                activable
                clonable
              />
            </Datagrid>
          </ListContextProvider>
        )}
        <div
          style={{
            marginTop: '30px',
          }}
        >
          <PatientWidget widget="sessions" patientUid={record.id} />
        </div>
      </div>
      <ShowToolBar />
    </BoxedShowLayout>
  );
};
