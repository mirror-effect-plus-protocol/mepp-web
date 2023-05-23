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
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import React, { useCallback } from 'react';
import {
  useNotify,
  useUnselectAll,
  useLocale,
  useTranslate,
} from 'react-admin';

import DownloadIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';

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
  const label = showLabel ? t('admin.shared.labels.exportButton') : '';
  const exportEndpoint = useCallback(
    (token) => {
      const data = {
        ...filterValues,
        ...{ selectedIds: selectedIds },
        ...{ language: locale },
        ...{ t: token },
      };

      const qs = new URLSearchParams(data).toString();
      return `${process.env.API_ENDPOINT}/${resource}/export/?${qs}`;
    },
    [selectedIds, filterValues, locale],
  );

  const handleClick = (e) => {
    e.stopPropagation();
    // Wait for the click action to be triggered before reset selectedIds
    const url = `${process.env.API_ENDPOINT}/token/`;

    fetchJsonWithAuthToken(url, {
      method: 'POST',
      body: '{"type":"export"}',
    })
      .then((response) => {
        notify('admin.shared.notifications.export.start', { type: 'info' });
        window.location.href = exportEndpoint(response.json['token']);
      })
      .catch(() => {
        notify('admin.shared.notifications.export.failure', { type: 'error' });
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
