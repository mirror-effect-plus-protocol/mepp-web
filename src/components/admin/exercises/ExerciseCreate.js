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
import {
  ArrayInput,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  TranslatableInputs,
  useTranslate,
} from 'react-admin';

import GTranslateIcon from '@mui/icons-material/GTranslate';

import { useLocale } from '@hooks/locale/useLocale';

import { preSave } from '@components/admin/exercises/callbacks';
import { useNumberStyles } from '@components/admin/exercises/styles';
import { Typography, Div } from '@components/admin/shared/dom/sanitize';
import VideoInput from '@components/admin/shared/inputs/VideoInput';
import ResourceCreate from '@components/admin/shared/resources/ResourceCreate';
import { translatorInputStyle } from '@components/admin/shared/styles/shared';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import { validateNumber } from '@components/admin/shared/validators';
import { requiredLocalizedField } from '@components/admin/shared/validators';

import { LANGUAGES } from '../../../locales';
import CategoryRow from './CategoryRow';

export const ExerciseCreate = () => {
  const t = useTranslate();
  const numberClasses = useNumberStyles();
  const { locale } = useLocale();

  const validateI18n = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'description');
  };

  /* Update description translations if empty */
  const transform = (record) => preSave(record, locale);

  return (
    <ResourceCreate transform={transform}>
      <SimpleForm toolbar={<SimpleFormToolBar identity={false} />}>
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
        </Typography>
        <TranslatableInputs
          locales={LANGUAGES}
          defaultLocale={locale}
          sx={translatorInputStyle}
        >
          <TextInput
            source="i18n.description"
            multiline
            fullWidth
            validate={validateI18n}
          />
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
        </TranslatableInputs>
        <Div className={numberClasses.numbers}>
          <NumberInput
            source="movement_duration"
            validate={validateNumber}
            label={t('resources.exercises.fields.movement_duration')}
            defaultValue="10"
            InputProps={{
              inputProps: { min: 1 },
            }}
          />
          <NumberInput
            source="pause"
            validate={validateNumber}
            label={t('resources.exercises.fields.pause')}
            defaultValue="10"
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
          <NumberInput
            source="repetition"
            validate={validateNumber}
            label={t('resources.exercises.fields.repetition')}
            defaultValue="5"
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
        </Div>
        <Typography variant="h6" gutterBottom gutterTop>
          {t('resources.exercises.card.labels.video')}
        </Typography>
        <VideoInput source="video" label={false} />
        <Typography variant="h6" gutterBottom gutterTop>
          {t('resources.exercises.card.labels.classification')}
        </Typography>
        <ArrayInput
          source="categories"
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
            <CategoryRow />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceCreate>
  );
};
