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
import { RaBox } from 'ra-compact-ui';
import React from 'react';
import {
  BooleanInput,
  SelectInput,
  SimpleForm,
  PasswordInput,
  TextInput,
  useGetIdentity,
  useRecordContext,
  useResourceContext,
  useTranslate,
  useNotify,
  useRedirect,
} from 'react-admin';
import { useSearchParams } from 'react-router-dom';

import { makeStyles } from '@mui/styles';

import { Typography } from '@components/admin/shared/dom/sanitize';
import Options from '@components/admin/shared/options';
import ResourceEdit from '@components/admin/shared/resources/ResourceEdit';
import {
  validateEmail,
  validateFirstName,
  validateLanguage,
  validateLastName,
  validatePasswordOptional as validatePassword,
  validatePasswords,
} from '@components/admin/shared/validators';

import SimpleFormToolBar from '../shared/toolbars/SimpleFormToolbar';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      flex: '0 0 45%',
    },
  },
}));

const ProfileRow = ({ identity, identityLoading, ...props }) => {
  const record = useRecordContext();
  if (identityLoading || identity?.uid === record?.id) {
    return false;
  } else {
    return props.children;
  }
};

export const ClinicianEdit = () => {
  const t = useTranslate();
  const { identity, isLoading: identityLoading, refetch } = useGetIdentity();
  const resource = useResourceContext();
  const redirect = useRedirect();
  const [searchParams] = useSearchParams();
  const classes = useStyles();
  const notify = useNotify();
  const options = Options();

  const onSuccess = (data) => {
    if (identity?.uid === data.id) {
      const backUrl = decodeURIComponent(searchParams.get('back'));
      const profile = JSON.parse(localStorage.getItem('profile'));

      profile.first_name = data.first_name;
      profile.last_name = data.last_name;
      profile.full_name = `${profile.first_name} ${profile.last_name}`;
      profile.email = data.email;
      localStorage.setItem('profile', JSON.stringify(profile));
      refetch();
      redirect(backUrl);
      notify('admin.shared.notifications.profile.success', { type: 'info' });
    } else {
      redirect(`/${resource}`);
      notify('ra.notification.updated', {
        type: 'info',
        messageArgs: { smart_count: 1 },
      });
    }
  };

  return (
    <ResourceEdit mutationOptions={{ onSuccess }} identity={identity}>
      <SimpleForm toolbar={<SimpleFormToolBar identity={identity} />}>
        <Typography variant="h6" gutterBottom>
          {t('admin.shared.labels.card.identity')}
        </Typography>
        <RaBox className={classes.root}>
          <TextInput
            source="first_name"
            fullWidth
            validate={validateFirstName}
          />
          <TextInput source="last_name" fullWidth validate={validateLastName} />
        </RaBox>
        <RaBox className={classes.root}>
          <TextInput source="email" fullWidth validate={validateEmail} />
        </RaBox>
        <ProfileRow identity={identity} identityLoading={identityLoading}>
          <Typography variant="h6" gutterBottom gutterTop>
            {t('admin.shared.labels.card.informations')}
          </Typography>
          <RaBox className={classes.root}>
            <SelectInput
              source="language"
              label={t('resources.clinicians.fields.language')}
              choices={options.languages}
              fullWidth
              validate={validateLanguage}
            />
            <BooleanInput
              label={t('resources.clinicians.fields.is_superuser')}
              source="is_superuser"
            />
          </RaBox>
        </ProfileRow>
        <Typography variant="h6" gutterBottom gutterTop>
          {t('admin.shared.labels.card.reset_password')}
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
            validate={validatePasswords}
            fullWidth
          />
        </RaBox>
      </SimpleForm>
    </ResourceEdit>
  );
};
