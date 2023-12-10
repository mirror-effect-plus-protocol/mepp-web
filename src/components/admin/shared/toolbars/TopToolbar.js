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
import { useRecordContext } from 'react-admin';
import {
  TopToolbar as RaTopToolbar,
  useTranslate,
} from 'react-admin';
import CRUDButton from '@components/admin/shared/buttons/CRUDButton';
import ExportButton from '@components/admin/shared/buttons/ExportButton';

const TopToolbar = (props) => {
  const t = useTranslate();
  const record = useRecordContext();
  let context = false;

  if (props.patientUid) {
    context = { patientUid: props.patientUid };
  }

  if (!record?.id || (props?.identity?.uid === record?.id)) {
    return <></>;
  }

  return (
    <RaTopToolbar>
      {props.showExport &&
        <ExportButton
          selectedIds={[record.id]}
          variant="outlined"
        />
      }
      {props.hasEdit &&
        <CRUDButton
          record={record}
          type="edit"
          label={t('ra.action.edit')}
          context={context}
          size="small"
          variant="outlined"
        />
      }
      {props.hasShow &&
        <CRUDButton
          record={record}
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
