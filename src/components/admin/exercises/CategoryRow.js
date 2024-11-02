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
import { useTranslate } from 'react-admin';
import { useFormContext } from 'react-hook-form';

import { EditRounded } from '@mui/icons-material';

import { useLocale } from '@hooks/locale/useLocale';

import { ExerciseListFilterModal } from '@components/admin/exercises/ExerciseListFilter';

const CategoryRow = (props) => {
  const t = useTranslate();
  const { locale } = useLocale();
  const form = useFormContext();
  const categories = form.watch('categories', []);
  const [selectedCategory, setSelectedCategory] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sourceIndex = parseInt(props.source.split('.')[1]);
    categories.forEach((category, index) => {
      if (index === sourceIndex) {
        if (category === '') {
          setReady(true);
          form.setValue(`${props.source}.id`, '');
        } else {
          setSelectedCategory(category);
        }
      }
    });
  }, [categories]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    form.setValue(`${props.source}.id`, category.id);
    form.setValue(`${props.source}.i18n`, category.i18n);
    form.setValue(`${props.source}.parents`, category.parents || []);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 70,
      }}
    >
      {ready && !selectedCategory?.id && (
        <ExerciseListFilterModal
          buttonLabel={t('resources.exercises.fields.empty.categories.label')}
          buttonIcon={<EditRounded fontSize="small" />}
          onSelect={(category) => selectCategory(category)}
        />
      )}

      {selectedCategory?.id && (
        <>
          {selectedCategory?.parents.map(
            (parent) => `${parent.i18n.name[locale]} -> `,
          )}
          <span
            style={{ display: 'contents', fontWeight: 'bold' }}
          >{`${selectedCategory.i18n.name[locale]}`}</span>
          <div style={{ position: 'absolute', right: 30 }}>
            <ExerciseListFilterModal
              buttonIcon={<EditRounded fontSize="small" />}
              onSelect={(category) => selectCategory(category)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryRow;
