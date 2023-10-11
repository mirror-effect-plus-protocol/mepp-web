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
import {makeStyles} from "@mui/styles";

export const translatorInputStyle = { width: 'calc(2*256px + 1em)' };

export const categoriesSelectorStyle = {
    '>ul>li': {
      borderBottom: 'none'
    }
};


export const useRaBoxStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  container: {
    paddingTop: '0 !important',
  },
  leftColumn: {
    flexDirection: 'column',
    flex: '0 0 60%',
    flexGrow: '3',
    justifyContent: 'center',
    marginBottom: '10px',
    paddingRight: '10px',
    borderRight: 'solid thin',
    marginRight: '10px',
  },
  rightColumn: {
    flex: '0 0 40%',
    flexDirection: 'column',
    flexGrow: '1',
  },
  columnChild: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '10px',
    '& .innerChild': {
      paddingLeft: 0,
    },
  },
  innerChild: {
    width: '50%',
  },
  buttonLine: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonLineLeft: {
    display: 'flex',
  },
}));
