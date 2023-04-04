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

import React, {useEffect, useCallback, useState} from 'react';
import {
  ArrayInput,
  Edit,
  NumberInput,
  ReferenceField,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  TranslatableInputs,
  useLocale,
  useTranslate,
} from 'react-admin';
import { Typography} from '@components/admin/shared/dom/sanitize';

import {requiredLocalizedField} from '@components/admin/shared/validators';
import {
  useSimpleFormIteratorStyles,
  useTranslatorInputStyles,
} from '@components/admin/plans/styles';

import { LANGUAGES } from "../../../locales";
import { validateExercises } from '@components/admin/plans/validators';
import { validateNumber } from '@components/admin/shared/validators';

import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import ExerciseRow from './ExerciseRow';
import IsSystemInput from '@components/admin/plans/IsSystem';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';
import {
  useGetCategories,
  useGetSubCategories,
} from '@components/admin/shared/hook';
import {
  contextualRedirect,
  preSave
} from '@components/admin/plans/callbacks';

export const PlanEdit = (props) => {

  const t = useTranslate();
  const locale = useLocale();
  const simpleFormIteratorclasses = useSimpleFormIteratorStyles();
  const translatorClasses = useTranslatorInputStyles();
  const [patientUid, setPatientUid] = useState(undefined);
  const [asTemplate, setAsTemplate] = useState(true);
  const validateI18n = (record) => {
    return requiredLocalizedField(record, locale, ['name', 'description']);
  }
  const categories = useGetCategories(locale);
  const subCategories = useGetSubCategories(locale);
  const redirect = useCallback(() => (
    contextualRedirect(patientUid)
  ), [patientUid]);
  const transform = useCallback((record) => (
    preSave(record, locale, patientUid, asTemplate)
  ), [patientUid, asTemplate]);

  useEffect(() => {
    setPatientUid(props?.history?.location?.state?.patientUid);
  }, [props?.history?.location?.state?.patientUid]);

  useEffect(() => {
    setAsTemplate(patientUid === undefined)
  }, [patientUid]);

  return (
    <Edit
      actions={<TopToolbar patientUid={patientUid} />}
      undoable={false}
      {...props}
    >
      <SimpleForm
        redirect={redirect}
        validate={validateI18n}
        toolbar={<SimpleFormToolBar identity={false} transform={transform} />}
      >
        <Typography variant="h6" gutterBottom>
          {t('resources.plans.card.labels.definition')}
        </Typography>
        {props.permissions === 'admin' && (
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
          classes={translatorClasses}
        >
          <TextInput
            source="i18n.name"
            fullWidth
          />
          <TextInput
            source="i18n.description"
            fullWidth
            multiline
          />
        </TranslatableInputs>
        {props.permissions === 'admin' && asTemplate &&
          <IsSystemInput/>
        }
        <NumberInput
          source="daily_repeat"
          validate={validateNumber}
        />

        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('resources.plans.card.labels.exercises')}
        </Typography>

        <ArrayInput
          source="exercises"
          fullWidth={false}
          label=""
          validate={validateExercises}
        >
          <SimpleFormIterator
            classes={simpleFormIteratorclasses}
          >
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
