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
import {
  useTranslate,
  NumberInput,
  TextInput,
  FormDataConsumer,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

import { EditRounded } from '@mui/icons-material';

import { useLocale } from '@hooks/locale/useLocale';

import { ExerciceFilterModal } from '@components/admin/plans/ExerciceFilter';
import { validateNumber } from '@components/admin/shared/validators';

const ExerciceRow = (props) => {
  const t = useTranslate();
  const { locale } = useLocale();
  const form = useFormContext();
  const exercices = form.watch('exercises', []);
  const [selectedExercice, setSelectedExercice] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sourceIndex = parseInt(props.source.split('.')[1]);
    exercices.forEach((exercice, index) => {
      if (index === sourceIndex) {
        if (exercice === '') {
          form.setValue(`${props.source}.id`, '');
        } else {
          setSelectedExercice(exercice);
        }
      }
    });
    setReady(true);
  }, [exercices]);

  const selectExercice = (exercice) => {
    form.setValue(`${props.source}.id`, exercice.id);
    form.setValue(`${props.source}.i18n`, exercice.i18n);
    form.setValue(
      `${props.source}.movement_duration`,
      exercice.movement_duration,
    );
    form.setValue(`${props.source}.pause`, exercice.pause);
    form.setValue(`${props.source}.repetition`, exercice.repetition);
    setSelectedExercice(exercice);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 100,
        flexWrap: 'wrap',
      }}
    >
      {ready && !selectedExercice?.id && (
        <ExerciceFilterModal
          buttonLabel={t(
            'resources.plans.fields.exercise.empty.exercise.label',
          )}
          buttonIcon={<EditRounded fontSize="small" />}
          onSelect={(exercice) => selectExercice(exercice)}
        />
      )}

      {selectedExercice?.id && (
        <>
          <FormDataConsumer>
            {() => {
              return (
                <input
                  type="hidden"
                  name={`${props.source}.id`}
                  value={selectedExercice.id}
                />
              );
            }}
          </FormDataConsumer>
          <TextInput
            source={`${props.source}.i18n.description.${locale}`}
            label={t('resources.plans.fields.exercise.description')}
            multiline
            fullWidth
            disabled
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '1em',
            }}
          >
            <NumberInput
              source={`${props.source}.movement_duration`}
              validate={validateNumber}
              label={t('resources.plans.fields.exercise.movement_duration')}
              defaultValue="10"
            />
            <NumberInput
              source={`${props.source}.pause`}
              validate={validateNumber}
              label={t('resources.plans.fields.exercise.pause')}
              defaultValue="5"
            />
            <NumberInput
              source={`${props.source}.repetition`}
              validate={validateNumber}
              label={t('resources.plans.fields.exercise.repetition')}
              defaultValue="10"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciceRow;
