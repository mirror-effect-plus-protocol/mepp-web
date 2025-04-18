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
  Button,
  useNotify,
  useRefresh,
  useUpdate,
  useRedirect,
  useRecordSelection,
  useTranslate,
  useStore,
} from 'react-admin';

import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

import { sanitizeRestProps } from '@admin/utils/props';

const ToggleArchiveButton = ({
  resource,
  record,
  className,
  showLabel,
  ...rest
}) => {
  const notify = useNotify();
  const t = useTranslate();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const [patientUid, setPatientUid] = useStore('patient.uid', false);
  const label = showLabel
    ? record.archived
      ? 'admin.shared.labels.unarchiveButton'
      : 'admin.shared.labels.archiveButton'
    : '';
  const [selectedIds, { select }] = useRecordSelection(resource);
  const handleToggleArchive = (e) => {
    e.preventDefault();
    // Update bulk actions counter
    const newSelectedIds = selectedIds.filter((id) => id !== record.id);
    if (newSelectedIds !== selectedIds) {
      select(newSelectedIds);
    }
    // Update data
    updateHandler().then();
  };
  const [updateHandler, { isLoading }] = useUpdate(
    resource,
    {
      id: record.id,
      data: { archived: !record.archived },
      previousData: record,
    },
    {
      onSuccess: () => {
        const translatedText = record.archived
          ? 'admin.shared.notifications.unarchive.success'
          : 'admin.shared.notifications.archive.success';
        if (patientUid) {
          if (patientUid && resource === 'patients') {
            setPatientUid(false);
            redirect(resource);
          }
        }
        refresh();
        notify(translatedText, { type: 'info' });
        select([]);
      },
      onError: () => {
        const translatedText = record.archived
          ? 'admin.shared.notifications.unarchive.failure'
          : 'admin.shared.notifications.archive.failure';
        notify(translatedText, { type: 'error' });
      },
    },
  );

  return (
    <Button
      label={t(label)}
      onClick={handleToggleArchive}
      disabled={isLoading}
      className={className}
      {...sanitizeRestProps(rest, ['showLabel', 'showLocation'], true)}
      variant={rest.variant}
      color={rest.color}
    >
      {!record.archived ? <ArchiveIcon /> : <UnarchiveIcon />}
    </Button>
  );
};

export default ToggleArchiveButton;
