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

import React, { Fragment, useState } from 'react';
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
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';
import { BoxedShowLayout, RaBox } from 'ra-compact-ui';
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
  useTranslate,
} from 'react-admin';

import AddPlanButton from '../patients/AddPlanButton';
import ClinicianTextField from '../clinicians/ClinicianTextField';
import ShowToolBar from '../shared/toolbars/ShowToolbar';
import Spinner from '../shared/Spinner';
import RowActionToolbar from '../shared/toolbars/RowActionToolbar';
import TopToolbar from '../shared/toolbars/TopToolbar';
import { Typography } from '../shared/dom/sanitize';
import { sanitizeRestProps } from '../../../admin/utils/props';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';

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
  const t = useTranslate();
  const locale = useLocale();
  const notify = useNotify();
  const classes = useRaBoxStyles();
  const archivesToggleClasses = useArchivesStyles();
  const [sort, setSort] = useState({ field: 'start_date', order: 'DESC' });
  const [openDialogEmail, setOpenDialogEmail] = useState(false);
  const [archives, setArchives] = useState(false);
  const { data, ids, total, loaded } = useGetList(
    'plans',
    false,
    { field: 'start_date', order: 'DESC' },
    { language: locale, patient_id: props.id, archived: archives },
  );
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
    const url = `${process.env.REACT_APP_API_ENDPOINT}/patients/${props.id}/resend/`;
    fetchJsonWithAuthToken(url, {
      method: 'POST',
      body: JSON.stringify({ 'confirm': true }),
    })
      .then(() => {
        notify('resources.patients.notifications.email.send.success', 'info');
      })
      .catch((e) => {
        notify('resources.patients.notifications.email.send.failure', 'error');
      })
      .finally(() => {});
  };

  return (
    <Show actions={<TopToolbar showExport={true} />} {...props}>
      <BoxedShowLayout>
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
                <ClinicianTextField show={props.permissions === 'admin'} />
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
          <AddPlanButton patientUid={props.id} />
        </Typography>
        <div>
          {!loaded && <Spinner />}
          {loaded && (
            <ListContextProvider
              value={{
                data: data,
                ids: ids,
                total,
                currentSort: sort,
                basePath: props.basePath,
                resource: props.resource,
                selectedIds: [],
              }}
              {...sanitizeRestProps(props, ['label'], true)}
            >
              <Datagrid>
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
                  context={{ patientUid: props.id }}
                  activable={true}
                  clonable={true}
                />
              </Datagrid>
            </ListContextProvider>
          )}
        </div>

        <ShowToolBar
          resource={props.resource}
          record={props.record}
          basePath={props.basePath}
        />
      </BoxedShowLayout>
    </Show>
  );
};
