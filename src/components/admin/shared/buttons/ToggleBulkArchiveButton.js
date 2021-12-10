import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
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
  const [updateMany, { loading }] = useUpdateMany(
    resource,
    selectedIds,
    { archived: context.newValue },
    {
      onSuccess: () => {
        notify(context.notifications.success, 'info');
        refresh();
      },
      onFailure: (error) => {
        notify(context.notifications.failure, 'error');
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
    data[value].archived = context.newValue;
  };

  return (
    <Button
      label={t(context.buttonLabel)}
      disabled={loading}
      onClick={handleClick}
      variant={rest.variant}
      color={rest.color}
    >
      {context.icon}
    </Button>
  );
};

export default ToggleBulkArchiveButton;
