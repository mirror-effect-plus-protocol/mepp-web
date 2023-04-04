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
import { Typography } from '@components/admin/shared/dom/sanitize';
import { makeStyles } from '@material-ui/core/styles';
import { CompactForm, RaBox } from 'ra-compact-ui';
import {
  Create,
  SelectInput,
  PasswordInput,
  TextInput,
  BooleanInput,
  useTranslate,
  useNotify,
} from 'react-admin';

import SimpleFormToolBar from '../shared/toolbars/SimpleFormToolbar';
import {
  validateEmail,
  validateFirstName,
  validateLanguage,
  validateLastName,
  validatePasswordRequired as validatePassword,
  validatePasswords,
} from '@components/admin/shared/validators';
import Options from '@components/admin/shared/options';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      flex: '0 0 45%',
    },
  },
}));

export const ClinicianCreate = (props) => {
  const t = useTranslate();
  const classes = useStyles();
  const options = Options();
  const notify = useNotify();
  const onFailure = (error) => {
    let message = '';
    Object.entries(error.body).forEach(([key, values]) => {
      message += t(`resources.${props.resource}.errors.${key}`);
    });
    notify(message, {type: 'error'});
  };

  return (
    <Create
      onFailure={onFailure}
      {...props}
    >
      <CompactForm
        layoutComponents={[RaBox]}
        toolbar={<SimpleFormToolBar identity={false}/>}
        validate={validatePasswords}
        redirect="list"
      >
        <Typography variant="h6" gutterBottom>
          {t('admin.shared.labels.card.identity')}
        </Typography>
        <RaBox className={classes.root}>
          <TextInput
            source="first_name"
            fullWidth
            validate={validateFirstName}
          />
          <TextInput
            source="last_name"
            fullWidth
            validate={validateLastName}
          />
        </RaBox>
        <RaBox className={classes.root}>
          <TextInput
            source="email"
            fullWidth
            validate={validateEmail}
          />
        </RaBox>
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('admin.shared.labels.card.informations')}
        </Typography>
          <RaBox className={classes.root}>
            <SelectInput
              source="language"
              choices={options.languages}
              fullWidth
              validate={validateLanguage}
            />
            <BooleanInput
              source="is_superuser"
            />
          </RaBox>
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('admin.shared.labels.card.create_password')}
        </Typography>
        <RaBox className={classes.root}>
          <PasswordInput
            label={t('resources.clinicians.fields.password')}
            source="new_password"
            validate={validatePassword}
            fullWidth
          />
          <PasswordInput
            label={t('resources.clinicians.fields.confirm_password')}
            source="confirm_password"
            fullWidth
          />
        </RaBox>
      </CompactForm>
    </Create>
  );
};
