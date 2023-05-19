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
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
  useUpdateMany,
  useTranslate,
} from 'react-admin';

import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const getContext = (archivedFilterValue) => {
  return {
    newValue: !archivedFilterValue,
    currentValue: archivedFilterValue,
    icon: archivedFilterValue ? <UnarchiveIcon /> : <ArchiveIcon />,
    notifications: {
      success: archivedFilterValue
        ? 'admin.shared.notifications.bulkUnarchive.success'
        : 'admin.shared.notifications.bulkArchive.success',
      failure: archivedFilterValue
        ? 'admin.shared.notifications.bulkUnarchive.failure'
        : 'admin.shared.notifications.bulkArchive.failure',
    },
    buttonLabel: archivedFilterValue
      ? 'admin.shared.labels.unarchiveButton'
      : 'admin.shared.labels.archiveButton',
  };
};

const ToggleBulkArchiveButton = ({
  resource,
  selectedIds,
  archivedFilterValue,
  ...rest
}) => {
  const t = useTranslate();
  const context = getContext(archivedFilterValue);
  const [updateMany, { isLoading }] = useUpdateMany(
    resource,
    {
      ids: selectedIds,
      data: { archived: context.newValue },
    },
    {
      onSuccess: () => {
        notify(context.notifications.success, { type: 'info' });
        refresh();
      },
      onError: (error) => {
        notify(context.notifications.failure, { type: 'error' });
      },
    },
  );
  const notify = useNotify();
  const refresh = useRefresh();
  const unselectAll = useUnselectAll();
  const { data } = useListContext();
  const handleClick = () => {
    selectedIds.forEach(updateRecords);
    updateMany();
    unselectAll(resource);
    refresh();
  };
  const updateRecords = (value) => {
    const recordIndex = data.findIndex((record) => record.id === value);
    data[recordIndex].archived = context.newValue;
  };

  return (
    <Button
      label={t(context.buttonLabel)}
      disabled={isLoading}
      onClick={handleClick}
      variant={rest.variant}
      color={rest.color}
    >
      {context.icon}
    </Button>
  );
};

export default ToggleBulkArchiveButton;
