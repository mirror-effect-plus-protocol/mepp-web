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
import React, { useEffect, useState } from 'react';
import { BoxedShowLayout } from 'ra-compact-ui';
import {
  ArrayField,
  BooleanField,
  Datagrid,
  NumberField,
  Show,
  TextField,
  TranslatableFields,
  usePermissions, useResourceDefinition,
  useTranslate,
} from 'react-admin';

import { useLocale } from '@hooks/locale/useLocale';
import { makeStyles } from '@mui/styles';

import ClinicianTextField from '@components/admin/clinicians/ClinicianTextField';
import { Typography } from '@components/admin/shared/dom/sanitize';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

import { LANGUAGES } from '../../../locales';
import {translatorInputStyle} from "@components/admin/shared/styles/shared";

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
  const { hasEdit } = useResourceDefinition();
  const t = useTranslate();
  const { locale } = useLocale();
  const [patientUid, setPatientUid] = useState(undefined);
  const planShowClasses = useStyles();

  useEffect(() => {
    if (props.history?.location?.state?.patientUid) {
      setPatientUid(props.history.location.state.patientUid);
    }
  }, [patientUid]);

  return (
    <Show
      {...props}
      actions={<TopToolbar hasEdit={hasEdit} patientUid={patientUid} />}
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
          sx={translatorInputStyle}
        >
          <TextField source="i18n.name" />
        </TranslatableFields>
        <NumberField source="daily_repeat" />
        <BooleanField source="is_system" />
        <Typography
          variant="h6"
          gutterTop={true}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1em'
          }}
        >
          {t('resources.plans.card.labels.exercises')}
          <span style={{
            fontWeight: "normal",
            fontSize: '0.5em',
            marginTop: '7px'
          }}>
            {t('resources.plans.fields.randomize')}
            <BooleanField
              size="small"
              source="randomize"
              sx={{ marginLeft: '5px' }}
            />
          </span>
        </Typography>

        <ArrayField source="exercises" label="" sx={{ '&>.MuiStack-root': { width: '100%'} }}>
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
              source="repetition"
              label={t('resources.plans.fields.exercise.repetition')}
            />
          </Datagrid>
        </ArrayField>

        <ShowToolBar />
      </BoxedShowLayout>
    </Show>
  );
};
