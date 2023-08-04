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

export const ExerciseIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M20.2491 10.4656L20.25 10.4699C20.3855 11.0716 21 13.6 21 13.6H18.6241V16.75C18.6241 17.9081 17.6898 18.85 16.5409 18.85H15.4993V22H3V9.4C3 4.76845 6.73833 1 11.3329 1C18.0991 1 19.1921 5.81229 20.2491 10.4656ZM15.742 9.5C15.742 9.687 15.725 9.863 15.7024 10.039L16.8954 10.9465C17.0029 11.029 17.0311 11.1775 16.9633 11.2985L15.8324 13.2015C15.7646 13.3225 15.6176 13.372 15.4875 13.3225L14.0796 12.7725C13.7856 12.987 13.4689 13.174 13.124 13.3115L12.9092 14.769C12.8922 14.901 12.7735 15 12.6321 15H10.3704C10.229 15 10.1103 14.901 10.0933 14.769L9.87847 13.3115C9.53356 13.174 9.21691 12.9925 8.92289 12.7725L7.51497 13.3225C7.39058 13.3665 7.23791 13.3225 7.17006 13.2015L6.0392 11.2985C5.97135 11.1775 5.99962 11.029 6.10705 10.9465L7.30011 10.039C7.27749 9.863 7.26053 9.6815 7.26053 9.5C7.26053 9.3185 7.27749 9.137 7.30011 8.961L6.10705 8.0535C5.99962 7.971 5.9657 7.8225 6.0392 7.7015L7.17006 5.7985C7.23791 5.6775 7.38492 5.628 7.51497 5.6775L8.92289 6.2275C9.21691 6.013 9.53356 5.826 9.87847 5.6885L10.0933 4.231C10.1103 4.099 10.229 4 10.3704 4H12.6321C12.7735 4 12.8922 4.099 12.9092 4.231L13.124 5.6885C13.4689 5.826 13.7856 6.0075 14.0796 6.2275L15.4875 5.6775C15.6119 5.6335 15.7646 5.6775 15.8324 5.7985L16.9633 7.7015C17.0311 7.8225 17.0029 7.971 16.8954 8.0535L15.7024 8.961C15.725 9.137 15.742 9.313 15.742 9.5ZM9.52225 9.5C9.52225 10.5615 10.41 11.425 11.5012 11.425C12.5925 11.425 13.4803 10.5615 13.4803 9.5C13.4803 8.4385 12.5925 7.575 11.5012 7.575C10.41 7.575 9.52225 8.4385 9.52225 9.5Z"/>
    </SvgIcon>
  );
};
