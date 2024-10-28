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
import React, {useEffect, useState} from 'react';
import {
  ArrayInput,
  FormDataConsumer,
  NumberInput,
  ReferenceField,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  TranslatableInputs,
  usePermissions,
  useTranslate,
  useRecordContext,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';


import GTranslateIcon from '@mui/icons-material/GTranslate';

import { useLocale } from '@hooks/locale/useLocale';

import { preSave } from '@components/admin/exercises/callbacks';
import { useNumberStyles } from '@components/admin/exercises/styles';
import { Typography, Div } from '@components/admin/shared/dom/sanitize';
import AutoTranslate from '@components/admin/shared/inputs/AutoTranslate';
import VideoInput from '@components/admin/shared/inputs/VideoInput';
import ResourceEdit from '@components/admin/shared/resources/ResourceEdit';
import { translatorInputStyle } from '@components/admin/shared/styles/shared';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import { validateNumber } from '@components/admin/shared/validators';
import { requiredLocalizedField } from '@components/admin/shared/validators';

import { LANGUAGES } from '../../../locales';
import { ExerciseListFilterHandle } from './ExerciseListFilter';

/*
const CategoryPath = () => {
  const { locale } = useLocale();
  const record = useRecordContext();
  if (!record) return null;

  return record.categories.map((category) => {
    return (
      <div key={category.uid}>
        {category.parents.map((parent) => `${parent.i18n[locale]} -> `)}
        <span style={{ fontWeight: 'bold' }}>{`${category.i18n[locale]}`}</span>
      </div>
    );
  });
}; */


export const ExerciseEdit = () => {
  const t = useTranslate();
  const {permissions} = usePermissions();
  const numberClasses = useNumberStyles();
  const {locale} = useLocale();

  const CategoryRow = (props) => {
    const form = useFormContext();
    const record = useRecordContext();
    const categories = form.watch('categories', []);
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
      const sourceIndex = props.source.split('.')[1];
      categories.forEach((category, index) => {
        if (index === sourceIndex && category === '') {
          form.setValue(`${props.source}.uid`, '');
        }
      });
    }, [categories]);

    useEffect(() => {
      const index = props.source.split('.')[1];
      if (record && record.categories[index]) {
        setSelectedCategory(record.categories[index]);
      }
    }, [record]);

    const selectCategory = (category) => {
      console.log('CATEGORY', category);
      console.log('select Castegyr:', `${props.source}.uid`);
      setSelectedCategory(category);
      form.setValue(`${props.source}.uid`, category.uid);
    };

    const CategoryPath = () => {
      /* const { locale } = useLocale();
      const currentCategory = useWatch({
        name: `categories[${index}]`,
      }); */

      console.log('SELECTED CATEGORY', selectedCategory);
      if (!selectedCategory) return;
      /* FIX backend to include "NAME" all the time */
      const label = 'name' in selectedCategory.i18n
        ? selectedCategory.i18n.name[locale]
        : selectedCategory.i18n[locale];

      return (
        <div key={selectedCategory.uid}>
          {selectedCategory.parents.map((parent) => `${parent.i18n[locale]} -> `)}
          <span style={{fontWeight: 'bold'}}>{label}</span>
        </div>
      );
    };

    return (
      <div>
        <FormDataConsumer>
          {({ formData, scopedFormData, ...rest }) => {
            console.log('consumer', scopedFormData, rest);
            return (
              <input type="hidden" name={`${props.source}.uid`} value={formData.uid} />
            );
          }}
        </FormDataConsumer>
        <CategoryPath />
        <ExerciseListFilterHandle
          onSelect={(category, level) => {

            /* todo retrieve parents */
            const addParents = (category) => {
              return {...category, 'parents': [] };
            };
            selectCategory(addParents(category));
            console.log('AJOUTER:', category, level);
          }}
        />
      </div>
    );
  };

  const validateI18n = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'description');
  };
  /* Update description translations if empty */
  const transform = (record) => {
    return preSave(record, locale);
  };

  return (
    <ResourceEdit transform={transform}>
      <SimpleForm toolbar={<SimpleFormToolBar identity={false} />}>
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
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
        <Div className={numberClasses.numbers}>
          <NumberInput
            source="movement_duration"
            validate={validateNumber}
            label={t('resources.exercises.fields.movement_duration')}
          />
          <NumberInput
            source="pause"
            validate={validateNumber}
            label={t('resources.exercises.fields.pause')}
          />
          <NumberInput
            source="repetition"
            validate={validateNumber}
            label={t('resources.exercises.fields.repetition')}
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
          fullWidth={false}
        >
          <SimpleFormIterator
            disableReordering
            inline
          >
            <CategoryRow />
          </SimpleFormIterator>
        </ArrayInput>


      </SimpleForm>
    </ResourceEdit>
  );
};
