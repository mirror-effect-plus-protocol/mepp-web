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
import { linkToRecord, useResourceContext } from 'ra-core';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import ContentCreate from '@mui/icons-material/Create';
import ImageEye from '@mui/icons-material/RemoveRedEye';
import Button from '@mui/material/Button';

import { sanitizeRestProps } from '@admin/utils/props';

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e) => e.stopPropagation();

const CRUDButton = (props) => {
  const {
    basePath = '',
    label = false,
    resource,
    record,
    scrollToTop = true,
    type = 'edit',
    color = 'primary',
    variant = undefined,
    ...rest
  } = props;
  if (!props.resource) {
    const resource = useResourceContext();
  }

  let icon = <ContentCreate />;
  let endpoint = '';
  switch (type) {
    case 'show':
      icon = <ImageEye />;
      endpoint = '/show';
      break;
    case 'edit':
    default:
      break;
  }
  const state = { _scrollToTop: scrollToTop };
  const context =
    rest.hasOwnProperty('context') && rest.context
      ? { ...state, ...props.context }
      : state;
  const handleClick = rest.handleClick || stopPropagation;
  const location = rest.hasOwnProperty('location')
    ? props.location
    : record
    ? `${linkToRecord(
        basePath || `/${props.resource || resource}`,
        record.id,
      )}${endpoint}`
    : '';

  return (
    <Button
      component={Link}
      to={useMemo(
        () => ({
          pathname: location,
          state: context,
        }),
        [location, context],
      )}
      onClick={handleClick}
      color={color}
      variant={variant}
      startIcon={label !== false && icon}
      {...sanitizeRestProps(rest, ['context', 'redirectToBasePath'], true)}
    >
      {label !== false && label}
      {label === false && icon}
    </Button>
  );
};

export default CRUDButton;
