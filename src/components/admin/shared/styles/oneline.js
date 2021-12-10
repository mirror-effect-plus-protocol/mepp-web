import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

export const useOnelineStyles = makeStyles((theme) => ({
  oneline : {
    '& .MuiFormControl-root': {
      'flex-direction': 'row',
      '& > label': {
        whiteSpace: 'nowrap',
        transform: `translate(0, ${theme.spacing(3) / 2 }px) scale(0.75)`
      }
    }
  },
}));
