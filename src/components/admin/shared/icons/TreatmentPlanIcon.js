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

export const TreatmentPlanIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M14 3H16V6H8V3H10C10 1.896 10.896 1 12 1C13.104 1 14 1.896 14 3ZM18 4H19C20.104 4 21 4.896 21 6V20C21 21.104 20.104 22 19 22H5C3.895 22 3 21.104 3 20V6C3 4.896 3.895 4 5 4H6V7H18V4ZM7.293 13.707L11 17.415L16.707 11.706L15.293 10.293L11 14.586L8.707 12.294L7.293 13.707Z"/>
    </SvgIcon>
  );
};
