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
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useLocale,
  useListFilterContext,
} from 'react-admin';
import { Card as MuiCard, CardContent } from '@mui/material';
import {
  CategoryIcon,
  ClinicianIcon,
  SubCategoryIcon,
} from '@components/admin/shared/icons';
import {
  useGetCategories,
  useGetClinicians,
  useGetSubCategories,
} from "@components/admin/shared/hook";
import { ASide } from '@components/admin/shared/cards/ASide';

const ExerciseListAside = ({permissions}) => {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const { data: clinicians, isLoading } = useGetClinicians(permissions);
  const categories = useGetCategories(locale);
  const subCategories = useGetSubCategories(locale);
  const { filterValues, setFilters } = useListFilterContext();
  useEffect(() => {
    if (filterValues && filterValues.category__uid) {
      setSelectedCategory(filterValues.category__uid);
    } else {
      setSelectedCategory('all');
      if (filterValues && filterValues.sub_category__uid) {
        setFilters({
          ...filterValues,
          'sub_category__uid': undefined
        });
      }
    }
  }, [filterValues]);

  return (
    <ASide>
      <CardContent>
        <FilterLiveSearch source="fulltext_search" />

        <FilterList
          label="resources.exercises.fields.category__uid"
          icon={<CategoryIcon/>}
        >
          {
            categories.map((category) => (
              <FilterListItem
                label={category.name}
                key={category.id}
                value={{ category__uid: category.id }}
              />
            ))
          }
        </FilterList>

        {subCategories.hasOwnProperty(selectedCategory) &&
          <FilterList
            label="resources.exercises.fields.uid"
            icon={<SubCategoryIcon/>}
          >
            {
              subCategories[selectedCategory].map((sub_category) => (
                <FilterListItem
                  label={sub_category.name}
                  key={sub_category.id}
                  value={{sub_category__uid: sub_category.id}}
                />
              ))
            }
          </FilterList>
        }

        {permissions === 'admin' && (
          <FilterList
            label="resources.exercises.fields.clinician_uid"
            icon={<ClinicianIcon />}
          >
            {!isLoading &&
              clinicians.map((clinician) => (
                <FilterListItem
                  label={clinician.name}
                  key={clinician.id}
                  value={{ clinician_uid: clinician.id }}
                />
              ))
            }
          </FilterList>
        )}
      </CardContent>
    </ASide>
  );
};

export default ExerciseListAside;
