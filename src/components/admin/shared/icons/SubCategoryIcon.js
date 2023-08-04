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

import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export const SubCategoryIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M21.707 15.293L10.707 4.293C10.519 4.106 10.266 4 10 4H3C2.447 4 2 4.447 2 5V12C2 12.266 2.105 12.519 2.293 12.707L13.293 23.707C13.488 23.902 13.744 24 14 24C14.256 24 14.512 23.902 14.707 23.707L21.707 16.707C22.098 16.316 22.098 15.684 21.707 15.293ZM7 11C5.894 11 5 10.104 5 9C5 7.894 5.894 7 7 7C8.104 7 9 7.894 9 9C9 10.104 8.104 11 7 11Z" />
      <path d="M22.293 12.707L11.586 2H5V0H12C12.266 0 12.519 0.105 12.707 0.293L23.707 11.293L22.293 12.707Z"/>
    </SvgIcon>
  );
};
