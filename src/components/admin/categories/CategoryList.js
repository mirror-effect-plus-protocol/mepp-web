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
  List,
  TextField,
  Datagrid,
  useLocale,
  useTranslate,
} from 'react-admin';

import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SubCategoriesRow = ({ record, locale }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: theme.spacing(1),
      }}
    >
      {record.sub_categories.map((subCategory) => (
        <Chip key={subCategory.id} label={subCategory.i18n.name[locale]} />
      ))}
    </div>
  );
};

export const CategoryList = (props) => {
  const t = useTranslate();
  const locale = useLocale();

  return (
    <List
      {...props}
      pagination={false}
      sort={{ field: `i18n.name.${locale}`, order: 'ASC' }}
      filterDefaultValues={{
        language: locale,
      }}
      actions={false}
    >
      <Datagrid
        bulkActionButtons={false}
        expand={<SubCategoriesRow locale={locale} />}
      >
        <TextField source={`i18n.name.${locale}`} />
      </Datagrid>
    </List>
  );
};
