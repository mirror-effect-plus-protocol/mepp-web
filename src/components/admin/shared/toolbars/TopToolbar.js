import React from 'react';
import {
  TopToolbar as RaTopToolbar,
  useTranslate,
} from 'react-admin';
import CRUDButton from '@components/admin/shared/buttons/CRUDButton';
import ExportButton from '@components/admin/shared/buttons/ExportButton';

const TopToolbar = ({ basePath, data, resource, ...rest }) => {
  const t = useTranslate();
  let context = false;
  if (rest.patientUid) {
    context = { patientUid: rest.patientUid };
  }

  if (!data?.id || (rest?.identity?.uid === data?.id)) {
    return <></>;
  }

  return (
    <RaTopToolbar>
      {rest.showExport &&
        <ExportButton
          basePath={basePath}
          selectedIds={[data.id]}
          variant="outlined"
          style={{marginRight: '10px'}}
        />
      }
      {rest.hasEdit &&
        <CRUDButton
          basePath={basePath}
          record={data}
          type="edit"
          label={t('ra.action.edit')}
          context={context}
          size="small"
          variant="outlined"
        />
      }
      {rest.hasShow &&
        <CRUDButton
          basePath={basePath}
          record={data}
          type="show"
          label={t('ra.action.show')}
          context={context}
          size="small"
          variant="outlined"
        />
      }
    </RaTopToolbar>
  );

};

export default TopToolbar;
