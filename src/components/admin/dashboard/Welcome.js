import React, {Fragment, useMemo, useState} from 'react';
import {
  useGetIdentity,
  useGetList,
  useLocale,
  useNotify,
  useTranslate,
} from 'react-admin';
import {
  Box,
  Card,
  CardActions,
  Button,
  DialogTitle,
  DialogContent,
  TextField as TextFieldMui,
  CircularProgress,
  DialogActions, Dialog,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MirrorIcon } from '@components/admin/shared/icons/MirrorIcon';
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircle from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      padding: 0,
      flexWrap: 'wrap',
      '& button': {
        marginBottom: '0.5em',
        marginTop: '0.5em',
        marginLeft: '0!important',
      },
    },
  },
}));

export const Welcome = () => {
  const classes = useStyles();
  const t = useTranslate();
  const locale = useLocale();
  const notify = useNotify();
  const { loading: identityLoading } = useGetIdentity();
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(undefined);
  const handleOpenDialog = () => { setOpenDialog(true) };
  const handleCloseDialog = () => { setOpenDialog(false); };
  const handleAutocompleteChange = (event, patient) => {
    setSelectedPatient(patient);
    setConfirmDisabled(patient ? false : true);
  };
  const handleConfirmClick = (e) => {
    e.stopPropagation();
    // Wait for the click action to be triggered before reset selectedIds
    const url = `${process.env.API_ENDPOINT}/token/`;

    fetchJsonWithAuthToken(url, {
      method: 'POST',
      body: `{"type":"mirror", "patient_uid": "${selectedPatient.id}"}`,
    })
      .then((response) => {
        const qs = new URLSearchParams({tt: response.json['token']}).toString();
        const mirrorUrl = `/?${qs}#/intro`;
        setOpenDialog(false);
        setSelectedPatient(undefined);
        setConfirmDisabled(true);
        window.open(mirrorUrl, 'mirror', 'width=1024');
      })
      .catch(() => {
        notify('admin.shared.notifications.mirror.failure', 'error');
      });
  };
  const {data, loading: patientsLoading, loaded} = useGetList(
    'patients',
    false,
    { field: 'full_name', order: 'ASC' },
    {
      language: locale,
      archived: false
    }
  );

  const patients = useMemo(() => {
    return Object.values(data).map((patient) => ({
      name: patient.full_name,
      id: patient.id
    }));
  }, [data, loaded]);

  if (identityLoading) return <></>;

  return (
    <Card>
      <Box display="flex">
        <Box flex="1">
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              startIcon={<MirrorIcon />}
              color="secondary"
            >
              {t('admin.dashboard.labels.openMirrorButton')}
            </Button>
            <Dialog
              open={openDialog}
            >
              <DialogTitle>{t('admin.dashboard.mirror_dialog.title')}</DialogTitle>
              <DialogContent>
                <Autocomplete
                  options={patients}
                  autoHighlight
                  loading={patientsLoading}
                  onChange={handleAutocompleteChange}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextFieldMui {...params}
                      label={t('admin.dashboard.mirror_dialog.labels.autocomplete')}
                      variant="filled"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {patientsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseDialog}
                  autoFocus
                  color="secondary"
                  variant="contained"
                  startIcon={<ErrorOutlineIcon />}
                >
                  {t('admin.shared.labels.cancelButton')}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<CheckCircle />}
                  disabled={confirmDisabled}
                  onClick={handleConfirmClick}
                >
                  {t('admin.shared.labels.confirmButton')}
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};
