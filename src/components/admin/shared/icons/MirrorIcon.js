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

export const MirrorIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 512 512">
      <g id="Outline">
        <path d="m432 192c0-97.047-78.953-176-176-176s-176 78.953-176 176c0 .231.01.463.03.693l.333 3.823a64.005 64.005 0 0 0 11.406 122.305 270.426 270.426 0 0 0 54.4 123.8 139.677 139.677 0 0 0 219.662 0 270.426 270.426 0 0 0 54.4-123.8 64.009 64.009 0 0 0 11.406-122.306l.333-3.822c.02-.23.03-.462.03-.693zm-376 64a47.937 47.937 0 0 1 25.834-42.566l7.4 85.119c.095 1.083.2 2.164.312 3.245a47.727 47.727 0 0 1 -33.546-45.798zm350.825 41.166a254.573 254.573 0 0 1 -53.575 135.567 123.678 123.678 0 0 1 -194.5 0 254.573 254.573 0 0 1 -53.575-135.567l-9.175-105.509c.184-88.069 71.889-159.657 160-159.657s159.816 71.588 160 159.657zm35.115-75.111a48.025 48.025 0 0 1 -19.487 79.745c.107-1.081.217-2.162.312-3.245l7.4-85.119a48.16 48.16 0 0 1 11.775 8.619z" />
        <path d="m480 448v-72h-16v64h-56v16h64a8 8 0 0 0 8-8z" />
        <path d="m32 448a8 8 0 0 0 8 8h64v-16h-56v-64h-16z" />
        <path d="m32 64v72h16v-64h56v-16h-64a8 8 0 0 0 -8 8z" />
        <path d="m480 64a8 8 0 0 0 -8-8h-64v16h56v64h16z" />
        <path d="m168 224a32 32 0 1 0 32 32 32.036 32.036 0 0 0 -32-32zm0 48a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16z" />
        <path d="m344 224a32 32 0 1 0 32 32 32.036 32.036 0 0 0 -32-32zm0 48a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16z" />
        <path d="m248 240h16v104h-16z" />
        <path d="m217.569 368.155-3.138 15.69a210.913 210.913 0 0 0 83.138 0l-3.138-15.69a194.977 194.977 0 0 1 -76.862 0z" />
        <path d="m298.668 202.036 10.664 11.928c20.8-18.592 49.267-18.636 69.224-.1l10.888-11.724c-13.084-12.15-29-18.436-46.041-18.128a69.212 69.212 0 0 0 -44.735 18.024z" />
        <path d="m122.556 202.138 10.888 11.724c19.959-18.533 48.424-18.49 69.224.1l10.664-11.928a69.212 69.212 0 0 0 -44.732-18.024c-17.045-.301-32.96 5.978-46.044 18.128z" />
      </g>
    </SvgIcon>
  );
};
