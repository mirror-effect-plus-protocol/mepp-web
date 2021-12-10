import React, {useEffect, useState} from 'react';
import {
  ArrayInput,
  BooleanInput,
  Edit,
  NumberInput,
  ReferenceField,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  TranslatableInputs,
  useGetList,
  useLocale,
  useTranslate,
} from 'react-admin';

import SimpleFormToolBar from '@components/admin/shared/toolbars/SimpleFormToolBar';
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
import {requiredLocalizedField} from '@components/admin/shared/validators';
import { LANGUAGES } from '../../../locales';
import {preSave} from '@components/admin/exercises/callbacks';
import { Typography, Div } from '@components/admin/shared/dom/sanitize';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

export const ExerciseEdit = (props) => {

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
    false,
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
    <Edit
      transform={transform}
      undoable={false}
      actions={<TopToolbar />}
      {...props}
    >
      <SimpleForm
        toolbar={<SimpleFormToolBar identity={false}/>}
        validate={validateI18n}
      >
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
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
            <SimpleFormIterator classes={simpleFormIteratorclasses} disableReordering={true}>
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
    </Edit>
  );
};
