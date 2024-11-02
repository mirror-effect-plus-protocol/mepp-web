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
import React, { useEffect, useCallback, useState } from 'react';
import {
  ArrayInput,
  BooleanInput,
  FormDataConsumer,
  NumberInput,
  ReferenceField,
  SimpleForm,
  TextField,
  TextInput,
  TranslatableInputs,
  usePermissions,
  useRecordContext,
  useStore,
  useTranslate,
  SimpleFormIterator,
} from 'react-admin';

import GTranslateIcon from '@mui/icons-material/GTranslate';

import { useLocale } from '@hooks/locale/useLocale';

import IsSystemInput from '@components/admin/plans/IsSystem';
import { contextualRedirect, preSave } from '@components/admin/plans/callbacks';
import { Typography } from '@components/admin/shared/dom/sanitize';
import AutoTranslate from '@components/admin/shared/inputs/AutoTranslate';
import ResourceEdit from '@components/admin/shared/resources/ResourceEdit';
import { translatorInputStyle } from '@components/admin/shared/styles/shared';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import { requiredLocalizedField } from '@components/admin/shared/validators';
import { validateNumber } from '@components/admin/shared/validators';

import { LANGUAGES } from '../../../locales';
import ExerciceRow from './ExerciceRow';

export const PlanEdit = () => {
  const [patientUid] = useStore('patient.uid', false);
  const [asTemplate, setAsTemplate] = useState(true);
  const { locale } = useLocale();
  const redirect = useCallback(
    () => contextualRedirect(patientUid),
    [patientUid],
  );
  const transform = useCallback(
    (record) => preSave(record, locale, patientUid, asTemplate),
    [patientUid, asTemplate],
  );

  useEffect(() => {
    setAsTemplate(patientUid === false);
  }, [patientUid]);

  return (
    <ResourceEdit redirect={redirect} transform={transform}>
      <SimplePlanEditForm locale={locale} asTemplate={asTemplate} />
    </ResourceEdit>
  );
};

const SimplePlanEditForm = ({ locale, asTemplate }) => {
  const record = useRecordContext();
  const { permissions } = usePermissions();
  const t = useTranslate();
  const [, setRandomize] = useState(record.randomize);
  const validateI18n = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'name');
  };

  const handleRandomizeClick = (event) => {
    setRandomize(event.target.checked);
  };

  return (
    <SimpleForm toolbar={<SimpleFormToolBar identity={false} />}>
      <Typography variant="h6" gutterBottom>
        {t('resources.plans.card.labels.definition')}
      </Typography>
      {permissions === 'admin' && (
        <ReferenceField
          source="clinician_uid"
          reference="clinicians"
          link="show"
        >
          <TextField source="full_name" />
        </ReferenceField>
      )}
      <TranslatableInputs
        locales={LANGUAGES}
        defaultLocale={locale}
        sx={translatorInputStyle}
      >
        <TextInput source="i18n.name" validate={validateI18n} fullWidth />
        <div
          style={{
            fontSize: '0.7em',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gridGap:
              '10px' /* Adjust the value to add space between the image and text */,
            alignItems: 'center',
          }}
        >
          <GTranslateIcon /> {t('resources.shared.labels.translate_on_save')}
        </div>
        <div
          style={{
            fontSize: '0.7em',
          }}
        >
          <FormDataConsumer>
            {({ formData }) => <AutoTranslate data={formData} />}
          </FormDataConsumer>
        </div>
      </TranslatableInputs>
      {permissions === 'admin' && asTemplate && (
        <FormDataConsumer>
          {({ formData }) => <IsSystemInput data={formData} />}
        </FormDataConsumer>
      )}
      <NumberInput source="daily_repeat" validate={validateNumber} />

      <Typography
        variant="h6"
        gutterBottom
        gutterTop
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1em',
        }}
      >
        {t('resources.plans.card.labels.exercises')}
        <BooleanInput
          size="small"
          source="randomize"
          onClick={handleRandomizeClick}
          sx={{ marginTop: '5px' }}
        />
      </Typography>

      <ArrayInput
        source="exercises"
        label=""
        sx={{
          '& .RaSimpleFormIterator-action': {
            visibility: 'visible!important',
            margin: '0 !important',
            position: 'absolute',
            right: 0,
          },
          minWidth: '525',
          maxWidth: '50%',
          '& .RaSimpleFormIterator-line': {
            display: 'flex',
            alignItems: 'center',
            ':last-child': {
              marginBottom: 0.5,
            },
          },
        }}
      >
        <SimpleFormIterator disableReordering inline>
          <ExerciceRow />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};
