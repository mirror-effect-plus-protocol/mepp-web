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

import React, { useRef } from 'react';
import {
  Button,
  useNotify,
  useRefresh,
  useUpdate,
  useRedirect,
  useRecordSelection,
  useTranslate,
} from 'react-admin';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { sanitizeRestProps } from '@admin/utils/props';

const ToggleArchiveButton = ({
  resource,
  record,
  className,
  showLabel,
  redirectLocation,
  ...rest
}) => {
  const notify = useNotify();
  const t = useTranslate();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const label = showLabel
    ? record.archived
      ? 'admin.shared.labels.unarchiveButton'
      : 'admin.shared.labels.archiveButton'
    : '';
  const [selectedIds, { select }] = useRecordSelection(resource);
  const redirectionRef = useRef();
  const handleToggleArchive = (e) => {
    e.preventDefault();
    // Update bulk actions counter
    const newSelectedIds = selectedIds.filter((id) => id !== record.id);
    if (newSelectedIds !== selectedIds) {
      select(newSelectedIds);
    }
    // Update data
    updateHandler();
  };
  const [updateHandler, { loading }] = useUpdate(
    resource,
    record.id,
    { 'archived': !record.archived },
    record,
    {
      onSuccess: () => {
        const translatedText = record.archived
          ? 'admin.shared.notifications.unarchive.success'
          : 'admin.shared.notifications.archive.success';
        if (redirectionRef.current) {
          redirect(redirectionRef.current);
        }
        refresh();
        notify(translatedText, 'info');
      },
      onFailure: (error) => {
        const translatedText = record.archived
          ? 'admin.shared.notifications.unarchive.failure'
          : 'admin.shared.notifications.archive.failure';
        notify(translatedText, 'error');
      },
    },
  );
  redirectionRef.current = redirectLocation;

  return (
    <Button
      label={t(label)}
      onClick={handleToggleArchive}
      disabled={loading}
      className={className}
      {...sanitizeRestProps(rest, [
        'redirectToBasePath',
        'showLabel',
        'showLocation'
      ], true)}
      variant={rest.variant}
      color={rest.color}
    >
      {!record.archived ? <ArchiveIcon /> : <UnarchiveIcon />}
    </Button>
  );
};

export default ToggleArchiveButton;
