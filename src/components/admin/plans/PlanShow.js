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
import { BoxedShowLayout } from 'ra-compact-ui';
import React, { useEffect, useState } from 'react';
import {
  ArrayField,
  BooleanField,
  Datagrid,
  NumberField,
  NumberInput,
  Show,
  TextField,
  TranslatableFields,
  useLocale,
  usePermissions,
  useTranslate,
} from 'react-admin';

import { makeStyles } from '@mui/styles';

import ClinicianTextField from '@components/admin/clinicians/ClinicianTextField';
import { useTranslatorInputStyles } from '@components/admin/exercises/styles';
import { Typography } from '@components/admin/shared/dom/sanitize';
import { useOnelineStyles } from '@components/admin/shared/styles/oneline';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

import { LANGUAGES } from '../../../locales';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      '& .ra-field-exercises': {
        marginTop: '-15px',
        '& > .MuiFormControl-root': {
          width: '100%',
        },
      },
    },
  };
});

export const PlanShow = (props) => {
  const { permissions } = usePermissions();
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
        <ClinicianTextField show={permissions === 'admin'} />

        <TranslatableFields
          locales={LANGUAGES}
          defaultLocale={locale}
          classes={translatorClasses}
        >
          <TextField source="i18n.name" fullWidth={true} />
          <TextField source="i18n.description" fullWidth={true} />
        </TranslatableFields>
        <NumberField source="daily_repeat" className={onelineClasses.oneline} />
        <BooleanField source="is_system" className={onelineClasses.oneline} />
        <Typography variant="h6" gutterTop={true}>
          {t('resources.plans.card.labels.exercises')}
        </Typography>

        <ArrayField source="exercises" label="">
          <Datagrid bulkActionButtons={false}>
            <TextField
              source={`i18n.description.${locale}`}
              label={t('resources.plans.fields.exercise.description')}
            />
            <NumberField
              source="movement_duration"
              label={t('resources.plans.fields.exercise.movement_duration')}
            />
            <NumberField
              source="pause"
              label={t('resources.plans.fields.exercise.pause')}
            />
            <NumberField
              source="repeat"
              label={t('resources.plans.fields.exercise.repeat')}
            />
          </Datagrid>
        </ArrayField>

        <ShowToolBar basePath="/plans" patientUid={patientUid} />
      </BoxedShowLayout>
    </Show>
  );
};
