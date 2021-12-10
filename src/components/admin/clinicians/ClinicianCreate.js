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

import SimpleFormToolBar from '../shared/toolbars/SimpleFormToolBar';
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
