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
import React, { useMemo } from 'react';
import {
  SaveButton,
  Toolbar,
  useRecordContext,
  useRedirect,
  useResourceContext, useStore,
  useTranslate,
} from 'react-admin';
import { useFormState } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import { Div } from '@components/admin/shared/dom/sanitize';

import ToggleArchiveButton from '../buttons/ToggleArchiveButton';

const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cancelButton: {
      marginRight: theme.spacing(2),
    },
  };
});

const SimpleFormToolBar = ({ identity }) => {
  const t = useTranslate();
  const theme = useTheme();
  const classes = useStyles();
  const record = useRecordContext();
  const redirect = useRedirect();
  const resource = useResourceContext();
  const { isDirty } = useFormState();
  const [confirm, setConfirm] = React.useState(false);
  const [patientUid, setPatientUid] = useStore('patient.uid', false);
  const [searchParams, setSearchParams] = useSearchParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const showEditButtons = useMemo(() => {
    if (identity === false) {
      return true;
    }
    return identity?.uid !== record?.id;
  }, [identity, record]);

  const handleBackClick = (e) => {
    e.preventDefault();
    if (isDirty) {
      setConfirm(true);
    } else {
      const redirectUrl = getRedirectUrl;
      setPatientUid(false);
      redirect(redirectUrl);
    }
  };
  const handleClose = () => {
    setConfirm(false);
  };

  const handleConfirmClose = () => {
    const redirectUrl = getRedirectUrl;
    setPatientUid(false);
    redirect(redirectUrl);
  };

  const getRedirectUrl = useMemo(() => {
    if (!showEditButtons) {
      if (searchParams.get('back')) {
        return decodeURIComponent(searchParams.get('back'));
      } else {
        return '/';
      }
    } else {
      return (patientUid && resource !== 'patients')
        ? `/patients/${patientUid}/show`
        : `/${resource}`;
    }
  }, [showEditButtons]);

  return (
    <Toolbar className={classes.toolbar}>
      <Div>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          className={classes.cancelButton}
          onClick={handleBackClick}
        >
          {t('admin.shared.labels.cancelButton')}
        </Button>
        <Dialog fullScreen={fullScreen} open={confirm} onClose={handleClose}>
          <DialogTitle>{t('admin.shared.text.cancelDialog.title')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('admin.shared.text.cancelDialog.body')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<ErrorOutlineIcon />}
            >
              {t('admin.shared.labels.cancelButton')}
            </Button>
            <Button
              onClick={handleConfirmClose}
              color="primary"
              variant="contained"
              startIcon={<CheckCircle />}
            >
              {t('admin.shared.labels.confirmButton')}
            </Button>
          </DialogActions>
        </Dialog>
        <SaveButton size="small" />
      </Div>
      {showEditButtons && record && record?.id && (
        <ToggleArchiveButton
          resource={resource}
          record={record}
          className=""
          showLabel
          showLocation
          variant="outlined"
        />
      )}
    </Toolbar>
  );
};

export default SimpleFormToolBar;
