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
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import React, { Fragment, useMemo, useState } from 'react';
import {
  useGetIdentity,
  useGetList,
  useLocale,
  useNotify,
  useTranslate,
} from 'react-admin';

import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Box,
  Card,
  CardActions,
  Button,
  DialogTitle,
  DialogContent,
  TextField as TextFieldMui,
  CircularProgress,
  DialogActions,
  Dialog,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';

import { MirrorIcon } from '@components/admin/shared/icons/MirrorIcon';

const useStyles = makeStyles((theme) => ({
  actions: {
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
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
  const { isLoading: identityLoading } = useGetIdentity();
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(undefined);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
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
        const qs = new URLSearchParams({
          tt: response.json['token'],
        }).toString();
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
  const { data, isLoading: patientsLoading } = useGetList('patients', {
    pagination: { page: 1, perPage: 9999 },
    sort: { field: 'full_name', order: 'ASC' },
    filter: {
      language: locale,
      archived: false,
    },
  });

  const patients = useMemo(() => {
    if (data) {
      return Object.values(data).map((patient) => ({
        name: patient.full_name,
        id: patient.id,
      }));
    } else {
      return [];
    }
  }, [data]);

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
            <Dialog open={openDialog}>
              <DialogTitle>
                {t('admin.dashboard.mirror_dialog.title')}
              </DialogTitle>
              <DialogContent>
                <Autocomplete
                  options={patients}
                  autoHighlight
                  loading={patientsLoading}
                  onChange={handleAutocompleteChange}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextFieldMui
                      {...params}
                      label={t(
                        'admin.dashboard.mirror_dialog.labels.autocomplete',
                      )}
                      variant="filled"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {patientsLoading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
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
