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
import { BoxedShowLayout, RaBox } from 'ra-compact-ui';
import React from 'react';
import {
  BooleanField,
  Show,
  NumberField,
  TextField,
  TranslatableFields,
  useGetList,
  usePermissions,
  useRecordContext,
  useTranslate, useResourceDefinition,
} from 'react-admin';

import { useLocale } from '@hooks/locale/useLocale';
import { Chip } from '@mui/material';

import ClinicianTextField from '@components/admin/clinicians/ClinicianTextField';
import {
  useCategoryChipsStyles,
} from '@components/admin/exercises/styles';
import { Typography } from '@components/admin/shared/dom/sanitize';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

import { LANGUAGES } from '../../../locales';
import {translatorInputStyle} from "@components/admin/shared/styles/shared";

const CategoryChips = (props) => {
  const classes = useCategoryChipsStyles();
  const record = useRecordContext();
  if (!record) return null;
  return record.sub_categories.map((subCategory) => (
    <div
      key={`${subCategory.uid}.${subCategory.category__uid}`}
      data-name="chip-row"
      className={classes.root}
    >
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
  ));
};

export const ExerciseShow = () => {
  const { permissions } = usePermissions();
  const { hasEdit } = useResourceDefinition();
  const t = useTranslate();
  const { locale } = useLocale();
  const categories = {};
  const subCategories = {};
  const { data, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 9999 },
    sort: { field: 'i18n__name', order: 'ASC' },
    filter: { language: locale },
  });

  if (!isLoading) {
    data.forEach((category) => {
      categories[category.id] = category.i18n.name[locale];
      category.sub_categories.forEach((subCategory) => {
        subCategories[subCategory.id] = subCategory.i18n.name[locale];
      });
    });
  }
  return (
    <Show actions={<TopToolbar hasEdit={hasEdit} />}>
      <BoxedShowLayout>
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
        </Typography>
        <ClinicianTextField show={permissions === 'admin'} />
        <TranslatableFields
          locales={LANGUAGES}
          defaultLocale={locale}
          sx={translatorInputStyle}
        >
          <TextField source="i18n.description" fullWidth={true} />
        </TranslatableFields>
        <RaBox>
          <NumberField
            source="movement_duration"
          />
          <NumberField source="pause" />
          <NumberField source="repeat" />
        </RaBox>
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('resources.exercises.card.labels.classification')}
        </Typography>
        <CategoryChips categories={categories} subCategories={subCategories} />
        <BooleanField source="is_system" />
        <ShowToolBar />
      </BoxedShowLayout>
    </Show>
  );
};
