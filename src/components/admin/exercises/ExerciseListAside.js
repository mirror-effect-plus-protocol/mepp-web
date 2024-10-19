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
  useGetIdentity,
  useListContext,
  useListFilterContext,
  useGetList,
} from 'react-admin';

import { useLocale } from '@hooks/locale/useLocale';
import { Card as MuiCard, CardContent } from '@mui/material';
import {
  CategoryIcon,
  ClinicianIcon,
  SubCategoryIcon,
} from '@components/admin/shared/icons';
import { ASide } from '@components/admin/shared/cards/ASide';

const styles = {
  asideContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1rem',
    marginBottom: '1rem',
  },
  searchContainer: {
    width: '100%',  // Conteneur pleine largeur
    marginBottom: '1rem',
  },
  categoryFiltersContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  filterListWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  cardContent: {
    padding: 0,
  },
};

// Composant pour les listes de filtres dynamiques avec indexation
const DynamicCategoryFilterList = ({ categories, locale, level, onCategoryClick, activeParentId }) => {
  const [subCategory, setSubCategory] = useState(null);

  const handleCategoryClick = (category) => {

    if (activeParentId !== category.id) {
      console.log('ACTIVE APRENT ID', activeParentId);
      setSubCategory(null);
      console.log('category.id', category.id);
    }

    onCategoryClick(category, level);

    if (category.children && category.children.length > 0) {
      setSubCategory(category);
    }
  };

  return (
    <div style={styles.filterListWrapper}>
      <CardContent style={styles.cardContent}>
        <FilterList>
          {categories.map((category) => {
            const filterKey = `category${level}__uid`;
            return (
              <FilterListItem
                label={category.i18n.name[locale]}
                key={category.id}
                value={{ [filterKey]: category.id }}
                onClick={() => handleCategoryClick(category)}
              />
            );
          })}
        </FilterList>
      </CardContent>
      {/* Afficher les sous-catégories si la catégorie est développée */}
      {subCategory && (
        <DynamicCategoryFilterList
          categories={subCategory.children}
          locale={locale}
          level={level + 1}
          onCategoryClick={onCategoryClick}
          activeParentId={subCategory.id}
        />
      )}
    </div>
  );
};


const ExerciseListAside = ({permissions}) => {
  const {filterValues, setFilters} = useListFilterContext();
  const { locale } = useLocale();
  const { data: categories, isLoading } = useGetList('categories', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' },
  });
  const [localFilters, setLocalFilters] = useState(filterValues);
  const [activeParentId, setActiveParentId] = useState(null);

  const handleCategorySelect = (category, index = 0) => {
    const filterKey = `category${index}__uid`;
    const newFilters = { ...localFilters, [filterKey]: category.id };

    if (activeParentId !== category.id) {
      setActiveParentId(category.id);
    }
    setLocalFilters(newFilters);
    setFilters(newFilters, null);

    console.log('index', index);
    console.log('category.id', category.id);
    console.log('filterKey', filterKey);
  };

  useEffect(() => {
    console.log('filterValues updated:', filterValues);
    setLocalFilters(filterValues); // Sync local state with global filterValues
  }, [filterValues]);

  return (
    <div style={styles.asideContainer}>
      <div style={styles.searchContainer}>
        <FilterLiveSearch source="fulltext_search"/>
      </div>
      <div style={styles.categoryFiltersContainer}>
        {!isLoading && (
          <DynamicCategoryFilterList
            categories={categories}
            locale={locale}
            level={0}
            onCategoryClick={handleCategorySelect}
            activeParentId={activeParentId}
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseListAside;
