import React from 'react';
import {
  Edit,
  useResourceContext,
  useTranslate,
  useNotify,
  useResourceDefinition,
  useStore,
} from 'react-admin';

import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

const ResourceEdit = ({ children, mutationOptions = {}, ...props }) => {
  const resource = useResourceContext();
  const [patientUid] = useStore('patient.uid', false);
  const { hasShow } = useResourceDefinition();
  const t = useTranslate();
  const notify = useNotify();
  const redirect = 'redirect' in props ? props.redirect : 'list';
  const identity = 'identity' in props ? props.identity : false;

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
    <Edit
      mutationOptions={mergedMutationOptions}
      mutationMode="pessimistic"
      redirect={redirect}
      actions={
        <TopToolbar
          hasShow={hasShow}
          patientUid={patientUid}
          identity={identity}
        />
      }
      {...props}
    >
      {children}
    </Edit>
  );
};

export default ResourceEdit;
