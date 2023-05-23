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
import React from 'react';
import {
  Edit,
  SelectInput,
  SimpleForm,
  PasswordInput,
  ReferenceInput,
  TextInput,
  usePermissions,
  useRefresh,
  useResourceContext,
  useTranslate,
  useNotify,
} from 'react-admin';

import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { Typography } from '@components/admin/shared/dom/sanitize';
import Options from '@components/admin/shared/options';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';
import {
  validateEmail,
  validateFirstName,
  validateLanguage,
  validateLastName,
  validatePasswordOptional as validatePassword,
  validatePasswords,
} from '@components/admin/shared/validators';

import { validateAudio, validateClinician, validateSide } from './validators';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      flex: '0 0 45%',
    },
  },
}));

export const PatientEdit = (props) => {
  const resourceName = useResourceContext();
  const t = useTranslate();
  const classes = useStyles();
  const options = Options();
  const notify = useNotify();
  const { permissions } = usePermissions();
  const handleFailure = (error) => {
    let message = '';
    Object.entries(error.body).forEach(([key, values]) => {
      message += t(`resources.${resourceName}.errors.${key}`);
    });
    notify(message, { type: 'error' });
  };

  return (
    <Edit
      mutationOptions={{ onError: handleFailure }}
      actions={<TopToolbar />}
      {...props}
    >
      <SimpleForm
        toolbar={<SimpleFormToolBar identity={false} />}
      >
        <Typography variant="h6" gutterBottom>
          {t('admin.shared.labels.card.identity')}
        </Typography>
        <Box className={classes.root}>
          <TextInput
            source="first_name"
            fullWidth
            validate={validateFirstName}
          />
          <TextInput source="last_name" fullWidth validate={validateLastName} />
        </Box>
        <Box className={classes.root}>
          <TextInput source="email" fullWidth validate={validateEmail} />
        </Box>
        <Typography variant="h6" gutterBottom>
          {t('admin.shared.labels.card.informations')}
        </Typography>
        <Box className={classes.root}>
          <SelectInput
            source="use_audio"
            choices={options.audio}
            fullWidth
            validate={validateAudio}
          />
          <SelectInput
            source="side"
            choices={options.sides}
            fullWidth
            validate={validateSide}
          />
        </Box>
        {permissions === 'admin' && (
          <Box className={classes.root}>
            <ReferenceInput
              source="clinician_uid"
              reference="clinicians"
              validate={validateClinician}
              perPage={9999}
              sort={{ field: 'full_name', order: 'ASC' }}
            >
              <SelectInput optionText="full_name" style={{ width: '100%' }} />
            </ReferenceInput>
            <SelectInput
              source="language"
              choices={options.languages}
              fullWidth
              validate={validateLanguage}
            />
          </Box>
        )}
        {permissions !== 'admin' && (
          <Box className={classes.root}>
            <SelectInput
              source="language"
              choices={options.languages}
              fullWidth
              validate={validateLanguage}
            />
          </Box>
        )}
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('admin.shared.labels.card.reset_password')}
        </Typography>
        <Box className={classes.root}>
          <PasswordInput
            label={t('resources.patients.fields.password')}
            source="new_password"
            validate={validatePassword}
            fullWidth
          />
          <PasswordInput
            label={t('resources.patients.fields.confirm_password')}
            source="confirm_password"
            fullWidth
            validate={validatePasswords}
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
};
