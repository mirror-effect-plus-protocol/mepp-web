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
  FormDataConsumer,
  NumberInput,
  ReferenceField,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  TranslatableInputs,
  useGetList,
  usePermissions,
  useResourceDefinition,
  useTranslate,
} from 'react-admin';

import GTranslateIcon from '@mui/icons-material/GTranslate';

import { useLocale } from '@hooks/locale/useLocale';

import SubCategoryInput from '@components/admin/exercises/SubCategoryInput';
import { preSave } from '@components/admin/exercises/callbacks';
import { useNumberStyles } from '@components/admin/exercises/styles';
import {
  validateCategory,
  validateSubCategory,
  validateSubCategories,
} from '@components/admin/exercises/validators';
import { Typography, Div } from '@components/admin/shared/dom/sanitize';
import AutoTranslate from '@components/admin/shared/inputs/AutoTranslate';
import VideoInput from '@components/admin/shared/inputs/VideoInput';
import {
  translatorInputStyle,
  categoriesSelectorStyle,
} from '@components/admin/shared/styles/shared';
import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';
import { validateNumber } from '@components/admin/shared/validators';
import { requiredLocalizedField } from '@components/admin/shared/validators';
import ResourceEdit from '@components/admin/shared/resources/ResourceEdit';

import { LANGUAGES } from '../../../locales';

export const ExerciseEdit = () => {
  const t = useTranslate();
  const { permissions } = usePermissions();
  const { hasShow } = useResourceDefinition();
  const numberClasses = useNumberStyles();
  const { locale } = useLocale();
  const [updatedSubCategoryInputs, setUpdatedSubCategoryInputs] = useState({});
  let categories = [];
  let subCategories = {};
  const { data, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 9999 },
    sort: { field: 'i18n__name', order: 'ASC' },
    filter: { language: locale },
  });

  const validateI18n = (value, record) => {
    return requiredLocalizedField(value, record, locale, 'description');
  };
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
      ...updates,
    });
  };
  // ToDo refactor
  if (!isLoading) {
    data.forEach((category) => {
      categories.push({
        'id': category.id,
        'name': category.i18n.name[locale],
      });
      subCategories[category.id] = category.sub_categories.map(
        (subCategory) => {
          return {
            'id': subCategory.id,
            'name': subCategory.i18n.name[locale],
          };
        },
      );
    });
  }

  return (
    <ResourceEdit
      transform={transform}
      actions={<TopToolbar hasShow={hasShow} />}
    >
      <SimpleForm
        redirect="list"
        toolbar={<SimpleFormToolBar identity={false} />}
      >
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
        {permissions === 'admin' && <BooleanInput source="is_system" />}
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
        {!isLoading && (
          <ArrayInput
            source="sub_categories"
            validate={validateSubCategories}
            fullWidth={false}
          >
            <SimpleFormIterator
              sx={categoriesSelectorStyle}
              disableReordering
              inline
            >
              <SelectInput
                label={t('resources.categories.labels.category')}
                source="category__uid"
                choices={categories}
                onChange={handleChange}
                validate={validateCategory}
              />
              <FormDataConsumer>
                {({ scopedFormData, getSource }) =>
                  scopedFormData ? (
                    <SubCategoryInput
                      label={t('resources.categories.labels.sub_category')}
                      source={getSource('uid')}
                      data={scopedFormData}
                      updatedSubCategoryInputs={updatedSubCategoryInputs}
                      subCategories={subCategories}
                      validate={validateSubCategory}
                    />
                  ) : null
                }
              </FormDataConsumer>
            </SimpleFormIterator>
          </ArrayInput>
        )}
      </SimpleForm>
    </ResourceEdit>
  );
};
