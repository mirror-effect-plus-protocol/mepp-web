import React, { useCallback } from 'react';
import {
  useNotify,
  useUnselectAll,
  useLocale,
  useTranslate,
} from 'react-admin';
import Button from '@material-ui/core/Button';
import DownloadIcon from '@material-ui/icons/GetApp';

import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';


const ExportButton = (props) => {
  const {
    basePath = '',
    resource = '',
    selectedIds = [],
    scrollToTop = true,
    showLabel = true,
    color = 'primary',
    variant = undefined,
    size = 'small',
    filterValues = {},
    ...rest
  } = props;

  const t = useTranslate();
  const locale = useLocale();
  const notify = useNotify();
  const unselectAll = useUnselectAll();
  const label = showLabel
    ? t('admin.shared.labels.exportButton')
    : '';
  const exportEndpoint = useCallback((token) => {
    const data = {
      ...filterValues,
      ...{selectedIds: selectedIds},
      ...{language: locale},
      ...{t: token},
    };

    const qs = new URLSearchParams(data).toString();
    return `${process.env.API_ENDPOINT}${basePath}/export/?${qs}`;
  }, [selectedIds, filterValues, locale]);

  const handleClick = (e) => {
    e.stopPropagation();
    // Wait for the click action to be triggered before reset selectedIds
    const url = `${process.env.API_ENDPOINT}/token/`;

    fetchJsonWithAuthToken(url, {
      method: 'POST',
      body: '{"type":"export"}'
    })
      .then((response) => {
        notify('admin.shared.notifications.export.start','info');
        window.location.href = exportEndpoint(response.json['token']);
      })
      .catch(() => {
        notify('admin.shared.notifications.export.failure', 'error');
      })
      .finally(() => {
        setTimeout(() => {
          if (selectedIds.length && resource) unselectAll(resource);
        }, 500);
      });
  };

  return (
    <Button
      onClick={handleClick}
      color={color}
      variant={variant}
      size={size}
      startIcon={showLabel && <DownloadIcon />}
      {...rest}
    >
      {showLabel && label}
      {!showLabel && <DownloadIcon />}
    </Button>
  );
};

export default ExportButton;
