import React from 'react';
import {
  Create,
  useResourceContext,
  useTranslate,
  useNotify,
} from 'react-admin';

const ResourceCreate = ({ children, mutationOptions = {}, ...props }) => {
  const resource = useResourceContext();
  const t = useTranslate();
  const notify = useNotify();
  const redirect = 'redirect' in props ? props.redirect : 'list';

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
    ...mutationOptions,
  };

  return (
    <Create
      mutationOptions={mergedMutationOptions}
      mutationMode="pessimistic"
      redirect={redirect}
      {...props}
    >
      {children}
    </Create>
  );
};

export default ResourceCreate;
