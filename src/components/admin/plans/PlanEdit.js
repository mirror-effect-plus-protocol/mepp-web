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
  Edit,
  FormDataConsumer,
  NumberInput,
  ReferenceField,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  TranslatableInputs,
  usePermissions,
  useResourceDefinition,
  useStore,
  useTranslate,
} from 'react-admin';

import { useLocale } from '@hooks/locale/useLocale';
import IsSystemInput from '@components/admin/plans/IsSystem';
import { contextualRedirect, preSave } from '@components/admin/plans/callbacks';
import { validateExercises } from '@components/admin/plans/validators';
import { Typography } from '@components/admin/shared/dom/sanitize';
import {
  useGetCategories,
  useGetSubCategories,
} from '@components/admin/shared/hook';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';
import { requiredLocalizedField } from '@components/admin/shared/validators';
import { validateNumber } from '@components/admin/shared/validators';

import { LANGUAGES } from '../../../locales';
import ExerciseRow from './ExerciseRow';
import { translatorInputStyle, categoriesSelectorStyle } from '@components/admin/shared/styles/shared';

export const PlanEdit = () => {
  const { permissions } = usePermissions();
  const { hasShow } = useResourceDefinition();
  const t = useTranslate();
  const { locale } = useLocale();
  const [asTemplate, setAsTemplate] = useState(true);
  const [patientUid, setPatientUid] = useStore('patient.uid', false);
  const validateI18n = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'description');
  };
  const categories = useGetCategories(locale);
  const subCategories = useGetSubCategories(locale);
  const redirect = useCallback(
    () => contextualRedirect(patientUid),
    [patientUid]
  );
  const transform = useCallback(
    (record) => preSave(record, locale, patientUid, asTemplate),
    [patientUid, asTemplate]
  );

  useEffect(() => {
    setAsTemplate(patientUid === false);
  }, [patientUid]);

  const onError = (error) => {
    let message = '';
    if (error?.body) {
      Object.entries(error.body).forEach(([key, values]) => {
        message += t(`resources.${resourceName}.errors.${key}`);
      });
    } else {
      message = t('api.error.generic');
    }
    notify(message, { type: 'error' });
  };

  return (
    <Edit
      actions={<TopToolbar hasShow={hasShow} patientUid={patientUid} />}
      mutationMode="pessimistic"
      redirect={redirect}
      transform={transform}
      mutationOptions={{ onError: onError }}
    >
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
          <TextInput
            source="i18n.description"
            validate={validateI18n}
            fullWidth
            multiline
          />
        </TranslatableInputs>
        {permissions === 'admin' && asTemplate && (
          <FormDataConsumer>
            {({ formData, ...rest }) => <IsSystemInput data={formData} />}
          </FormDataConsumer>
        )}
        <NumberInput source="daily_repeat" validate={validateNumber} />

        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('resources.plans.card.labels.exercises')}
        </Typography>

        <ArrayInput
          source="exercises"
          fullWidth={false}
          label=""
          validate={validateExercises}
        >
          <SimpleFormIterator sx={categoriesSelectorStyle}>
            <ExerciseRow
              categories={categories}
              subCategories={subCategories}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
