import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';
import ContentCreate from '@material-ui/icons/Create';
import ImageEye from '@material-ui/icons/RemoveRedEye';

import { Link } from 'react-router-dom';
import { linkToRecord, useResourceContext } from 'ra-core';
import { sanitizeRestProps } from '@admin/utils/props';

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = e => e.stopPropagation();

const CRUDButton = (props) => {
  const {
      basePath = '',
      label = false,
      record,
      scrollToTop = true,
      type = 'edit',
      color = 'primary',
      variant = undefined,
      ...rest
  } = props;
  const resource = useResourceContext();

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
  const context = rest.hasOwnProperty('context') && rest.context
    ? {...state, ...props.context}
    : state;
  const handleClick = rest.handleClick || stopPropagation;
  const location = rest.hasOwnProperty('location')
    ? props.location
    : record
      ? `${linkToRecord(basePath || `/${resource}`, record.id)}${endpoint}`
      : '';

  return (
    <Button
      component={Link}
      to={useMemo(() => ({
          pathname: location,
          state: context,
        }),
        [location, context]
      )}
      onClick={handleClick}
      color={color}
      variant={variant}
      startIcon={label !== false && icon}
      {...sanitizeRestProps(rest, [
        'context',
        'redirectToBasePath'
      ], true)}
    >
      {label !== false && label}
      {label === false && icon}
    </Button>
  );
};


export default CRUDButton;
