import React, {useEffect, useState} from 'react';
import {
  ArrayField, BooleanField,
  Datagrid,
  NumberField, NumberInput,
  Show,
  TextField,
  TranslatableFields,
  useLocale,
  useTranslate,
} from 'react-admin';
import { BoxedShowLayout } from 'ra-compact-ui';
import { useTranslatorInputStyles } from '@components/admin/exercises/styles';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';
import {LANGUAGES} from "../../../locales";
import { Typography } from '@components/admin/shared/dom/sanitize';
import ClinicianTextField
  from '@components/admin/clinicians/ClinicianTextField';
import { makeStyles } from '@material-ui/core/styles';
import { useOnelineStyles } from '@components/admin/shared/styles/oneline';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .ra-field-exercises': {
        marginTop: '-15px',
        '& > .MuiFormControl-root' : {
          width: '100%'
        }
      }
    }
  };
});

export const PlanShow = (props) => {
  const t = useTranslate();
  const locale = useLocale();
  const translatorClasses = useTranslatorInputStyles();
  const [patientUid, setPatientUid] = useState(undefined);
  const onelineClasses = useOnelineStyles();
  const planShowClasses = useStyles();

  useEffect(() => {
    if (props.history?.location?.state?.patientUid) {
      setPatientUid(props.history.location.state.patientUid);
    }
  }, [patientUid]);

  return (
    <Show
      {...props}
      actions={<TopToolbar patientUid={patientUid} />}
      className={planShowClasses.root}
    >
      <BoxedShowLayout>
        <Typography variant="h6" gutterBottom>
          {t('resources.plans.card.labels.definition')}
        </Typography>
        <ClinicianTextField show={props.permissions === 'admin'} />

        <TranslatableFields
          locales={LANGUAGES}
          defaultLocale={locale}
          classes={translatorClasses}
        >
          <TextField
            source="i18n.name"
            fullWidth={true}
          />
          <TextField
            source="i18n.description"
            fullWidth={true}
          />
        </TranslatableFields>
        <NumberField source="daily_repeat" className={onelineClasses.oneline} />
        <BooleanField source="is_system" className={onelineClasses.oneline} />
        <Typography variant="h6" gutterTop={true}>
          {t('resources.plans.card.labels.exercises')}
        </Typography>

        <ArrayField source="exercises" label="">
          <Datagrid>
            <TextField
              source={`i18n.description.${locale}`}
              label={t('resources.plans.fields.exercise.description')}
            />
            <NumberField
              source="movement_duration"
              label={t('resources.plans.fields.exercise.movement_duration')}
            />
            <NumberField
              source="repeat"
              label={t('resources.plans.fields.exercise.pause')}
            />
            <NumberField
              source="pause"
              label={t('resources.plans.fields.exercise.repeat')}
            />
          </Datagrid>
        </ArrayField>

        <ShowToolBar
          resource={props.resource}
          record={props.record}
          basePath={props.basePath}
          patientUid={patientUid}
        />
      </BoxedShowLayout>
    </Show>
  );
};
