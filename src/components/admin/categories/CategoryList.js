import React from 'react';
import {
  List,
  TextField,
  Datagrid,
  useLocale,
  useTranslate,
} from 'react-admin';
import { Chip } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const SubCategoriesRow = ({ record, locale }) => {
  const theme = useTheme();
  return (
    <div style={{display: 'inline-flex', flexWrap: 'wrap', gap: theme.spacing(1)}}>
      {record.sub_categories.map((subCategory) => (
        <Chip
          key={subCategory.id}
          label={subCategory.i18n.name[locale]}
        />
      ))}
    </div>
  )
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
      bulkActionButtons={false}
      actions={false}
    >
      <Datagrid expand={<SubCategoriesRow locale={locale}/>}>
        <TextField source={`i18n.name.${locale}`} />
      </Datagrid>
    </List>
  );
};
