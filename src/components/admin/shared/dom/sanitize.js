import React from 'react';
import { Typography as MuiTypography} from '@material-ui/core';
import {sanitizeRestProps} from '@admin/utils/props';

export const Div = (props) => {
  const validProps = [
    'children',
    'className',
  ];
  const sanitizedProps = sanitizeRestProps(props, validProps, false);
  return (
    <div {...sanitizedProps}>{props.children}</div>
  );
}

export const Typography = ({gutterTop, ...props}) => {
  const validProps = [
    'children',
    'align',
    'color',
    'display',
    'gutterBottom',
    'noWrap',
    'paragraph',
    'variant',
    'variantMapping',
    'style',
  ];
  const sanitizedProps = sanitizeRestProps(props, validProps, false);
  if (gutterTop) { sanitizedProps['style'] = {marginTop: '10px'}; }
  return (
    <MuiTypography {...sanitizedProps}>
      {props.children}
    </MuiTypography>
  );
}
