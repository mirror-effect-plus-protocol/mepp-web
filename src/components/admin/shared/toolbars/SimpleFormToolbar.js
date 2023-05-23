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
  useNotify,
  useRecordContext,
  useRedirect,
  useRefresh,
  useResourceContext,
  useTranslate,
} from 'react-admin';
import { useFormState } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

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

const SimpleFormToolBar = ({ identity, ...props }) => {
  const t = useTranslate();
  const theme = useTheme();
  const classes = useStyles();
  const record = useRecordContext();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const resourceName = useResourceContext();
  const { invalid, pristine } = useFormState();
  const basePath = `/${resourceName}`;
  const notify = useNotify();
  const location = useLocation();
  const [confirm, setConfirm] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const redirectLocation = basePath;
  const showEditButtons = useMemo(() => {
    if (identity === false) {
      return true;
    }
    return identity?.uid !== record?.id;
  }, [identity, record]);
  const handleBackClick = (e) => {
    e.preventDefault();
    if (pristine) {
      redirect(formRedirect);
    } else {
      setConfirm(true);
    }
  };
  const handleClose = () => {
    setConfirm(false);
  };

  const handleConfirmClose = () => {
    redirect(formRedirect);
  };

  const formRedirect = useMemo(() => {
    const search = location.search;
    const params = new URLSearchParams(search);
    if (!showEditButtons) {
      if (params.has('back')) {
        return decodeURIComponent(params.get('back'));
      } else {
        return '/';
      }
    } else {
      return redirectLocation;
    }
  }, [showEditButtons, redirectLocation]);

  const onProfileSaveSuccess = (data) => {
    // Update profile
    const profile = JSON.parse(localStorage.getItem('profile'));
    let reload = false;
    if (
      profile.first_name !== data.first_name ||
      profile.last_name !== data.last_name
    ) {
      reload = true;
    }
    profile.first_name = data.first_name;
    profile.last_name = data.last_name;
    profile.full_name = `${profile.first_name} ${profile.last_name}`;
    profile.email = data.email;
    localStorage.setItem('profile', JSON.stringify(profile));
    notify('admin.shared.notifications.profile.success', { type: 'info' });
    // force window reload if full name has changed.
    // React-Admin Appbar does not reload itself when identity has changed.
    // ToDo find a way to refresh the component without loading the whole app
    if (reload) {
      window.location.href = `#${formRedirect}`;
      window.location.reload();
    } else {
      redirect(formRedirect);
      refresh();
    }
  };

  const saveButtonProps = useMemo(() => {
    const defaultProps = {
      classes: props.classes,
      className: props.className,
      transform: props.transform,
      icon: props.icon,
      invalid: invalid,
      label: props.label,
      onClick: props.onClick,
      disabled: pristine,
      saving: props.saving,
      variant: props.variant,
      record: record,
      resource: resourceName,
    };
    if (
      resourceName === 'clinicians' &&
      identity &&
      identity?.uid === record?.id
    ) {
      defaultProps.mutationOptions = { onSuccess: onProfileSaveSuccess };
    }
    return defaultProps;
  }, [showEditButtons, redirectLocation, props]);

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
        <SaveButton
          redirect={formRedirect}
          size="small"
          {...saveButtonProps}
        />
      </Div>
      {showEditButtons && record && record?.id && (
        <ToggleArchiveButton
          resource={resourceName}
          record={record}
          className=""
          showLabel={true}
          showLocation={true}
          redirectLocation={redirectLocation}
          variant="outlined"
        />
      )}
    </Toolbar>
  );
};

export default SimpleFormToolBar;
