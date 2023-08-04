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

import { makeStyles } from '@mui/styles';


export const useSimpleFormIteratorStyles = makeStyles((theme) => ({
  root: {
    '& li > div:first-child': {
      display: 'none'
    }
  },
  form: {
    display: 'flex',
    justifyContent: 'start',
    gap: '1em'
  },
  action: {
    '& .button-remove': {
      'marginLeft': '1em',
      'marginTop': '10px',
    }
  },
  line: {
    borderBottom: 'none'
  }
}));

export const useNumberStyles = makeStyles((theme) => ({
  numbers: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '1em',
    '& > div': {
      minWidth: '95px',
      width: '95px'
    },
  }
}));

export const useTranslatorInputStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(2*256px + 1em)' /* category + subcategory dropdown + spacing */
  }
}));

export const useCategoryChipsStyles = makeStyles((theme) => {
  return {
    root: {
      width: 'calc(2*256px + 1em)',
      display: 'flex',
      justifyContent: 'start',
      marginBottom: theme.spacing(2),
      '& div': {
        width: '200px',
        '&:first-child': {
          marginRight: theme.spacing(2),
        }
      }
    }
  };
});
