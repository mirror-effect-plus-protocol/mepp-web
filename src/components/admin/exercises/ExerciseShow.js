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
  NumberField,
  Show,
  TextField,
  TranslatableFields,
  useRecordContext,
  useResourceDefinition,
  useTranslate,
} from 'react-admin';

import { useLocale } from '@hooks/locale/useLocale';

import { Typography } from '@components/admin/shared/dom/sanitize';
import VideoField from '@components/admin/shared/inputs/VideoField';
import { translatorInputStyle } from '@components/admin/shared/styles/shared';
import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

import { LANGUAGES } from '../../../locales';

const CategoryPath = () => {
  const { locale } = useLocale();
  const record = useRecordContext();
  if (!record) return null;

  return record.categories.map((category) => (
    <div key={category.id}>
      {category.parents.map((parent) => `${parent.i18n.name[locale]} -> `)}
      <span
        style={{ display: 'contents', fontWeight: 'bold' }}
      >{`${category.i18n.name[locale]}`}</span>
    </div>
  ));
};

export const ExerciseShow = () => {
  const { hasEdit } = useResourceDefinition();
  const t = useTranslate();
  const { locale } = useLocale();

  return (
    <Show actions={<TopToolbar hasEdit={hasEdit} />}>
      <BoxedShowLayout>
        <Typography variant="h6" gutterBottom>
          {t('resources.exercises.card.labels.definition')}
        </Typography>
        <TranslatableFields
          locales={LANGUAGES}
          defaultLocale={locale}
          sx={translatorInputStyle}
        >
          <TextField source="i18n.description" fullWidth />
        </TranslatableFields>
        <RaBox>
          <NumberField source="movement_duration" />
          <NumberField source="pause" />
          <NumberField source="repetition" />
        </RaBox>
        <Typography variant="h6" gutterBottom gutterTop>
          {t('resources.exercises.card.labels.video')}
        </Typography>
        <VideoField source="video" label={false} />
        <BooleanField source="video_with_audio" />
        <Typography variant="h6" gutterTop>
          {t('resources.exercises.card.labels.classification')}
        </Typography>
        <CategoryPath />
        <ShowToolBar />
      </BoxedShowLayout>
    </Show>
  );
};
