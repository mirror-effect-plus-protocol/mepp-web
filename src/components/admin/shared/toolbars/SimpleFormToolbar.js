import React, {useMemo} from 'react';
import {
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
  useRefresh,
  useTranslate,
} from 'react-admin';
import { useLocation } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import ToggleArchiveButton from '../buttons/ToggleArchiveButton';
import { Div } from '@components/admin/shared/dom/sanitize';

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

const SimpleFormToolBar = ({identity, ...props}) => {
  const t = useTranslate();
  const theme = useTheme();
  const classes = useStyles();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const notify = useNotify();
  const location = useLocation();
  const [confirm, setConfirm] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const redirectLocation = typeof props.redirect === 'function'
    ? props.redirect()
    : props.basePath;
  const showEditButtons = useMemo(() => {
    if (identity === false) { return true; }
    return identity?.uid !== props?.record?.id;
  }, [identity, props.record]);
  const handleBackClick = (e) => {
    e.preventDefault();
    if (props.pristine) {
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

  const onProfileSaveSuccess = (args) => {
    // Update profile
    const profile = JSON.parse(localStorage.getItem('profile'));
    let reload = false;
    if (profile.first_name !== args.data.first_name ||
        profile.last_name !== args.data.last_name) {
      reload = true;
    }
    profile.first_name = args.data.first_name;
    profile.last_name = args.data.last_name;
    profile.full_name = `${profile.first_name} ${profile.last_name}`;
    profile.email = args.data.email;
    localStorage.setItem('profile', JSON.stringify(profile));
    notify('admin.shared.notifications.profile.success', {type: 'info'});
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
      handleSubmitWithRedirect: props.handleSubmitWithRedirect,
      onSave: props.onSave,
      onSuccess: props.onSuccess,
      onFailure: props.onFailure,
      transform: props.transform,
      icon: props.icon,
      invalid: props.invalid,
      label: props.label,
      onClick: props.onClick,
      disabled: props.pristine,
      saving: props.saving,
      submitOnEnter: props.submitOnEnter,
      variant: props.variant,
      basePath: props.basePath,
      handleSubmit: props.handleSubmit,
      record: props.record,
      resource: props.resource,
      undoable: props.undoable,
    };
    if (props.resource === 'clinicians' && identity && identity?.uid === props?.record?.id) {
      defaultProps.onSuccess = onProfileSaveSuccess;
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
        <Dialog
          fullScreen={fullScreen}
          open={confirm}
          onClose={handleClose}
        >
          <DialogTitle>
            {t('admin.shared.text.cancelDialog.title')}
          </DialogTitle>
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
      {showEditButtons && props.record && props.record.id && (
        <ToggleArchiveButton
          resource={props.resource}
          record={props.record}
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
