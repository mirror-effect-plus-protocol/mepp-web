import React from 'react';
import { Edit, useResourceContext, useTranslate, useNotify } from 'react-admin';

const ResourceEdit = ({ children, mutationOptions = {}, ...props }) => {
  const resource = useResourceContext();
  const t = useTranslate();
  const notify = useNotify();

  const onError = (error) => {
    let message = '';
    if (error?.body) {
      Object.keys(error.body).forEach((key) => {
        message += t(`resources.${resource}.errors.${key}`);
      });
    } else {
      message = t('api.error.generic');
    }
    notify(message, { type: 'error' });
  };

  const mergedMutationOptions = {
    onError,
    ...mutationOptions,  // mutationOptions fournis par le parent
  };

  return (
    <Edit
      mutationOptions={mergedMutationOptions}
      mutationMode="pessimistic"
      {...props}
    >
      {children}
    </Edit>
  );
};

export default ResourceEdit;
