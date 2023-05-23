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

export const useAutocompleteStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  }
}));

export const useSimpleFormIteratorStyles = makeStyles((theme) => ({
  root: {
    '& > p.Mui-error' : {
      display: 'none'
    }
  },
  index: {
    display: 'none'
  },
  form: {
    display: 'flex',
    justifyContent: 'start',
    gap: '1em',
    '& > div:first-child' : {
      width: 488
    }
  },
  action: {
    '& .button-remove': {
      'marginLeft': '1em',
      'marginTop': 10,
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
      minWidth: 95,
      width: 95
    },
  }
}));

export const useTranslatorInputStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(2*256px + 1em)' /* category + subcategory dropdown + spacing */
  }
}));
