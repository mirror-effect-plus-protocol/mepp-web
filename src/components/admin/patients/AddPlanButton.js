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
  useGetList,
  useLocale,
  useRefresh,
  useNotify,
  useRedirect,
  useTranslate,
} from 'react-admin';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField as TextFieldMui,
  CircularProgress,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const AddPlanButton = ({ patientUid }) => {
  const t = useTranslate();
  const locale = useLocale();
  const refresh = useRefresh();
  const notify = useNotify();
  const redirect = useRedirect();
  const [treatmentPlanChoice, setTreatmentPlanChoice] = useState('template');
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [autocompleteDisabled, setAutocompleteDisabled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanChoice = (event) => {
    const radioValue = event.target.value;
    setTreatmentPlanChoice(radioValue);
    setAutocompleteDisabled(radioValue !== 'template');
    setConfirmDisabled(radioValue === 'template' && selectedPlan === null);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleTemplatesChange = (event, template) => {
    setSelectedPlan(template);
    setConfirmDisabled(template === null);
  };
  const handleConfirmClick = () => {
    if (treatmentPlanChoice === 'new') {
      redirect('create', '/plans', undefined, undefined, {
        patientUid: patientUid,
      });
    } else {
      const updatedRecord = { treatment_plan_uid: selectedPlan.id };
      const url = `${process.env.API_ENDPOINT}/patients/${patientUid}/assign_plan/`;

      setConfirmDisabled(true);
      // notify(fetchStart()); // start the global loading indicator

      fetchJsonWithAuthToken(url, {
        method: 'POST',
        body: JSON.stringify(updatedRecord),
      })
        .then(() => {
          notify('resources.patients.notifications.plans.add.success', 'info');
          refresh();
        })
        .catch((e) => {
          notify('resources.patients.notifications.plans.add.failure', 'error');
        })
        .finally(() => {
          setConfirmDisabled(false);
          setOpenDialog(false);
          // notify(fetchEnd()); // stop the global loading indicator
        });
    }
  };

  const { data, isLoading } = useGetList('plans', {
    pagination: { page: 1, perPage: 9999 },
    sort: { field: 'i18n__name', order: 'ASC' },
    filter: {
      language: locale,
      archived: false,
      is_template: true,
    },
  });

  const treatmentPlans = useMemo(() => {
    if (data) {
      return Object.values(data).map((plan) => ({
        name: plan.i18n.name[locale],
        id: plan.id,
      }));
    } else {
      return [];
    }
  }, [data, isLoading]);

  return (
    <>
      <Button
        style={{ float: 'right' }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleOpenDialog}
        size="small"
        color="primary"
      >
        {t('ra.action.add')}
      </Button>
      <Dialog open={openDialog}>
        <DialogTitle>
          {t('resources.patients.card.plan_dialog.title')}
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="treatment_plan"
              name="treatment_plan"
              value={treatmentPlanChoice}
              onChange={handlePlanChoice}
            >
              <FormControlLabel
                value="template"
                control={<Radio />}
                label={t(
                  'resources.patients.card.plan_dialog.labels.radio_template',
                )}
              />
              <Autocomplete
                /*classes={autocompleteClasses}*/
                options={treatmentPlans}
                autoHighlight
                loading={isLoading}
                disabled={autocompleteDisabled}
                onChange={handleTemplatesChange}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextFieldMui
                    {...params}
                    label={t(
                      'resources.patients.card.plan_dialog.labels.autocomplete',
                    )}
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
              />
              <FormControlLabel
                value="new"
                control={<Radio />}
                label={t(
                  'resources.patients.card.plan_dialog.labels.radio_new',
                )}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            autoFocus
            startIcon={<ErrorOutlineIcon />}
            color="secondary"
            variant="contained"
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
    </>
  );
};

export default AddPlanButton;
