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
import React, { useState } from 'react';
import {
  BooleanField,
  Show,
  TextField,
  EmailField,
  FunctionField,
  useTranslate,
  useResourceDefinition,
  useNotify,
  useRecordContext,
} from 'react-admin';

import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';

import { Typography } from '@components/admin/shared/dom/sanitize';
import { useRaBoxStyles } from '@components/admin/shared/styles/shared';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

export const ClinicianShow = () => {
  const { hasEdit } = useResourceDefinition();

  return (
    <Show actions={<TopToolbar hasEdit={hasEdit} />}>
      <ClinicianShowRecord />
    </Show>
  );
};

export const ClinicianShowRecord = () => {
  const record = useRecordContext();
  if (!record) return null;
  const classes = useRaBoxStyles();

  return (
    <BoxedShowLayout className={classes.container}>
      <ClinicianShowLayout record={record}></ClinicianShowLayout>
    </BoxedShowLayout>
  );
};

export const ClinicianShowLayout = ({ record }) => {
  const t = useTranslate();
  const notify = useNotify();
  const classes = useRaBoxStyles();
  const [openDialogEmail, setOpenDialogEmail] = useState(false);

  const handleOpenDialogEmail = (event) => {
    setOpenDialogEmail(true);
  };

  const handleCloseDialogEmail = (event) => {
    setOpenDialogEmail(false);
  };

  const handleSendOnboarding = (event) => {
    setOpenDialogEmail(false);
    const url = `${process.env.API_ENDPOINT}/clinicians/${record.id}/resend/`;

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
    <BoxedShowLayout className={classes.container}>
      <Typography variant="h6" gutterBottom>
        {t('admin.shared.labels.card.identity')}
      </Typography>
      <RaBox>
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
      <Typography variant="h6" gutterBottom gutterTop>
        {t('admin.shared.labels.card.informations')}
      </Typography>
      <RaBox>
        <RaBox className={classes.columnChild}>
          <RaBox className={classes.innerChild}>
            <FunctionField
              label={t('resources.clinicians.fields.language')}
              render={(record) => t(`languages.${record.language}`)}
            />
          </RaBox>
          <RaBox className={classes.innerChild}>
            <BooleanField source="is_superuser" />
          </RaBox>
        </RaBox>
      </RaBox>

      <ShowToolBar />
    </BoxedShowLayout>
  );
};
