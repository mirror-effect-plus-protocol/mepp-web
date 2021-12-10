import React, {useEffect, useState} from 'react';
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  useLocale,
  useListFilterContext,
} from 'react-admin';
import { Card as MuiCard, CardContent, withStyles } from '@material-ui/core';
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
  const { data: clinicians, loaded } = useGetClinicians(permissions);
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
            {loaded &&
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
