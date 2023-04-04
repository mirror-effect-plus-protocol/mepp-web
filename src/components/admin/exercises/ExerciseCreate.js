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

import React, { useState } from 'react';
import {
  ArrayInput,
  BooleanInput,
  Create,
  NumberInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  TranslatableInputs,
  useGetList,
  useLocale,
  useTranslate,
} from 'react-admin';
import {
  validateCategory,
  validateSubCategory,
  validateSubCategories,
} from '@components/admin/exercises/validators';
import { validateNumber } from '@components/admin/shared/validators';
import {
  useNumberStyles,
  useSimpleFormIteratorStyles,
  useTranslatorInputStyles,
} from '@components/admin/exercises/styles';
import SubCategoryInput from '@components/admin/exercises/SubCategoryInput';
import { LANGUAGES } from '../../../locales';
import {requiredLocalizedField} from '@components/admin/shared/validators';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import {
  preSave
} from '@components/admin/exercises/callbacks';
import { Typography, Div } from '@components/admin/shared/dom/sanitize';

export const ExerciseCreate = (props) => {

  const t = useTranslate();
  const simpleFormIteratorclasses = useSimpleFormIteratorStyles();
  const numberClasses = useNumberStyles();
  const translatorClasses = useTranslatorInputStyles();
  const locale = useLocale();
  const [updatedSubCategoryInputs, setUpdatedSubCategoryInputs] = useState({});
  let categories = [];
  let subCategories = {};
  const {data, ids, loaded} = useGetList(
    'categories',
    { page: 1, perPage: 9999},
    { field: 'i18n__name', order: 'ASC' },
    { language: locale }
  );

  const validateI18n = (record) => {
    return requiredLocalizedField(record, locale, 'description');
  }
  /* Update description translations if empty */
  const transform = (record) => {
    return preSave(record, locale);
  };

  /* Populate dynamically subcategories */
  const handleChange = (event) => {
    const categoryInput = event.target;
    const updates = {};

    updates[categoryInput.name.replace('category__', '')] = categoryInput.value;
    setUpdatedSubCategoryInputs({
      ...updatedSubCategoryInputs,
      ...updates
    });
  };

  // ToDo refactor
  if (loaded) {
    ids.forEach((categoryUid) => {
      categories.push({'id': categoryUid, 'name': data[categoryUid].i18n.name[locale]});
      subCategories[categoryUid] = data[categoryUid]['sub_categories'].map((subCategory) => {
        return {'id': subCategory.id, 'name': subCategory.i18n.name[locale]};
      });
    });
  }

  return (
    <Create
      transform={transform}
      {...props}
    >
      <SimpleForm
        redirect="show"
        validate={validateI18n}
        toolbar={<SimpleFormToolBar identity={false} />}
      >
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
        </Typography>
        <TranslatableInputs
          locales={LANGUAGES}
          defaultLocale={locale}
          classes={translatorClasses}
        >
          <TextInput
            source="i18n.description"
            multiline={true}
            fullWidth={true}
          />
        </TranslatableInputs>
        {props.permissions === 'admin' &&
          <BooleanInput
            source="is_system"
          />
        }
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
            source="repeat"
            validate={validateNumber}
            label={t('resources.exercises.fields.repeat')}
          />
        </Div>
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('resources.exercises.card.labels.classification')}
        </Typography>
        {loaded && (
          <ArrayInput
            source="sub_categories"
            validate={validateSubCategories}
            fullWidth={false}
          >
            <SimpleFormIterator
              classes={simpleFormIteratorclasses}
              disableReordering={true}
            >
              <SelectInput
                source="category__uid"
                choices={categories}
                onChange={handleChange}
                validate={validateCategory}
              />
              <SubCategoryInput
                source="uid"
                updatedSubCategoryInputs={updatedSubCategoryInputs}
                subCategories={subCategories}
                validate={validateSubCategory}
              />
            </SimpleFormIterator>
          </ArrayInput>
        )}
      </SimpleForm>
    </Create>
  );
};
