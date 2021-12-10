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
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import {sanitizeRestProps} from "@admin/utils/props";

const ToggleActiveButton = ({
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
      ? 'admin.shared.labels.deactivateButton'
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
    {'active': !record.active},
    record,
    {
      onSuccess: () => {
        const translatedText = record.active
          ? 'admin.shared.notifications.deactivate.success'
          : 'admin.shared.notifications.activate.success';
        if (redirectionRef.current) {
          redirect(redirectionRef.current);
        }
        refresh();
        notify(translatedText, 'info');
      },
      onFailure: (error) => {
        const translatedText = record.active
          ? 'admin.shared.notifications.deactivate.failure'
          : 'admin.shared.notifications.activate.failure';
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
        'context',
        'showLocation'
      ], true)}
    >
      {!record.active ? <PlayCircleFilledIcon /> : <PauseCircleFilledIcon />}
    </Button>
  );
};

export default ToggleActiveButton;
