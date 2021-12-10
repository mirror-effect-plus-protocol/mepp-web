import React, {useMemo} from 'react';
import { useGetList } from 'react-admin';

const useGetCategories = (locale) => {

  const {data, loaded} = useGetList(
    'categories',
    false,
    { field: 'i18n__name', order: 'ASC' },
    { language: locale }
  );
  return useMemo(() => {
    return Object.values(data).map((category) => ({
      name: category.i18n.name[locale],
      id: category.id
    }));
  }, [data, loaded]);
};

export default useGetCategories;
