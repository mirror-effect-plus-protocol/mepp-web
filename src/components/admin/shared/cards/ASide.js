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

import { Card as MuiCard } from "@mui/material";
import withStyles from '@mui/styles/withStyles';

const black = '#232525';
const gray = '#939DAB';

export const ASide = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      order: -1, // display on the left rather than on the right of the list
      minWidth: '15em',
      width: '15em',
      marginRight: '1em',
      marginTop: '64px',
      marginBottom: '52px'
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    '& ul .MuiListItem-root': {
      color: black,
      '& .RaFilterListItem-listItemButton': {
        paddingLeft: theme.spacing(1),
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
      }
    },
    '& .MuiBox-root': {
      color: gray,
      '&:last-child .MuiList-root': {
        borderBottom: 'none'
      }
    },
    '& .MuiList-root': {
      paddingBottom: theme.spacing(2),
      borderBottom: 'solid 1px #DDDDDD'
    }
  }
}))(MuiCard);
