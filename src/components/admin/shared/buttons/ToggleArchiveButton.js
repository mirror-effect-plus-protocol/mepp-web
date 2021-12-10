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
