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

export const CategoryIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M21.4395 12.101L12.8895 3.551C12.5475 3.209 12.0725 3 11.55 3H4.9C3.855 3 3 3.855 3 4.9V11.55C3 12.0725 3.209 12.5475 3.5605 12.899L12.1105 21.449C12.4525 21.791 12.9275 22 13.45 22C13.9725 22 14.4475 21.791 14.7895 21.4395L21.4395 14.7895C21.791 14.4475 22 13.9725 22 13.45C22 12.9275 21.7815 12.443 21.4395 12.101ZM6.325 7.75C5.5365 7.75 4.9 7.1135 4.9 6.325C4.9 5.5365 5.5365 4.9 6.325 4.9C7.1135 4.9 7.75 5.5365 7.75 6.325C7.75 7.1135 7.1135 7.75 6.325 7.75Z"/>
    </SvgIcon>
  );
};
