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

const SPACING_BASE = 6;
const SPACING_DEFAULT = SPACING_BASE * 4;

/**
 * Spacings definitons in units
 *
 * @exemple
 * styled.li`
 *    margin-bottom: ${spacings.default / 3}px;
 * `;
 *
 */
const spacings = {
  default: SPACING_DEFAULT,
  xs: SPACING_BASE,
  sm: SPACING_BASE * 2,
  md: SPACING_DEFAULT,
  lg: SPACING_BASE * 5,
  xl: SPACING_BASE * 6,
  xxl: SPACING_BASE * 7,
};

export { spacings };
