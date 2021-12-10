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
  BooleanField,
  Show,
  NumberField,
  TextField,
  TranslatableFields,
  useGetList,
  useLocale,
  useTranslate,
} from 'react-admin';
import { Chip } from '@material-ui/core';
import { Typography} from '@components/admin/shared/dom/sanitize';
import { BoxedShowLayout, RaBox } from 'ra-compact-ui';

import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import {
  useCategoryChipsStyles,
  useTranslatorInputStyles,
} from '@components/admin/exercises/styles';
import ClinicianTextField from '@components/admin/clinicians/ClinicianTextField';
import { LANGUAGES } from '../../../locales';
import {useOnelineStyles} from "@components/admin/shared/styles/oneline";
import TopToolbar from "@components/admin/shared/toolbars/TopToolbar";


const CategoryChips = (props) => {
  const classes = useCategoryChipsStyles();

  return props.record.sub_categories.map((subCategory) => (
    <div key={`${subCategory.uid}.${subCategory.category__uid}`} data-name="chip-row" className={classes.root}>
      <Chip
        color="secondary"
        label={props.categories[subCategory.category__uid]}
      />
      <Chip
        color="secondary"
        label={props.subCategories[subCategory.uid]}
        variant="outlined"
      />
    </div>
    )
  )
};

export const ExerciseShow = (props) => {

  const t = useTranslate();
  const locale = useLocale();
  const translatorClasses = useTranslatorInputStyles();
  const onelineClasses = useOnelineStyles();
  const categories = {};
  const subCategories = {};
  const {data, ids, loaded} = useGetList(
    'categories',
    false,
    { field: 'i18n__name', order: 'ASC' },
    {language: locale}
  );

  if (loaded) {
    ids.forEach((catId) => {
      categories[catId] = data[catId].i18n.name[locale];
      data[catId]['sub_categories'].forEach((subCategory) => {
        subCategories[subCategory.id] = subCategory.i18n.name[locale];
      });
    });
  }

  return (
    <Show
      {...props}
      actions={<TopToolbar />}
    >
      <BoxedShowLayout>
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
        </Typography>
        <ClinicianTextField show={props.permissions === 'admin'} />
        <TranslatableFields
          locales={LANGUAGES}
          defaultLocale={locale}
          classes={translatorClasses}
        >
          <TextField
            source="i18n.description"
            fullWidth={true}
          />
        </TranslatableFields>
        <RaBox>
          <NumberField source="movement_duration" className={onelineClasses.oneline} />
          <NumberField source="pause" className={onelineClasses.oneline} />
          <NumberField source="repeat" className={onelineClasses.oneline} />
        </RaBox>
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('resources.exercises.card.labels.classification')}
        </Typography>
        <CategoryChips
          categories={categories}
          subCategories={subCategories}
          record={props.record}
        />
        <BooleanField source="is_system" className={onelineClasses.oneline}/>

        <ShowToolBar
          resource={props.resource}
          record={props.record}
          basePath={props.basePath}
        />
      </BoxedShowLayout>
    </Show>
  );
};
