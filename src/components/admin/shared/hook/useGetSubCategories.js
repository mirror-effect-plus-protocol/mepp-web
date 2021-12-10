import React, {useMemo} from 'react';
import { useGetList } from 'react-admin';


const useGetSubCategories = (locale) => {
  const {data, loaded} = useGetList(
    'categories',
    false,
    { field: 'i18n__name', order: 'ASC' },
    { language: locale }
  );
  return useMemo(() => {
    const subCategoriesArray = Object.values(data).map((category) => ([
      category.id,
      data[category.id]['sub_categories'].map((subCategory) => {
          return {'id': subCategory.id, 'name': subCategory.i18n.name[locale]};
      })
    ]));
    return Object.fromEntries(subCategoriesArray);
  }, [data, loaded]);
};

export default useGetSubCategories;
