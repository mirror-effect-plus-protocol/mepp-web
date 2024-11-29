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
import { useCreatePath, useResourceContext } from 'ra-core';
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
    label = false,
    record,
    scrollToTop = true,
    type = 'edit',
    color = 'primary',
    variant = undefined,
    ...rest
  } = props;

  const resource = rest.resource || useResourceContext();
  const createPath = useCreatePath();
  const link = createPath({ type, resource, id: record.id });
  const icon = type === 'show' ? <ImageEye /> : <ContentCreate />;
  const state = { _scrollToTop: scrollToTop };
  const context =
    'context' in rest && rest.context ? { ...state, ...props.context } : state;
  const handleClick = rest.handleClick || stopPropagation;
  const location = 'location' in rest ? props.location : record ? link : '';

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
      {...sanitizeRestProps(rest, ['context'], true)}
    >
      {label !== false && label}
      {label === false && icon}
    </Button>
  );
};

export default CRUDButton;
