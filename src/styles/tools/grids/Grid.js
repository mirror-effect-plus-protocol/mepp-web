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

/*
based from https://styled-css-grid.js.org/

// Traditional Grid
<Grid columns={12} >
  <Cell width={1}>1/12</Cell>
  <Cell width={1}>2/12</Cell>
  ...
  <Cell width={2}>1/6</Cell>
  <Cell width={2}>2/6</Cell>
  ...
</Grid>

// Positioning
<Grid columns={3}>
  <Cell>Top Left</Cell>
  <Cell left={3}>Top Right</Cell>
  <Cell left={2} top={2}>Middle</Cell>
  <Cell top={3}>Bottom Left</Cell>
  <Cell top={3} left={3}>Bottom Right</Cell>
</Grid>

// Responsive Layout
<Grid columns="repeat(auto-fit,minmax(120px,1fr))">
  <Cell>A</Cell>
  <Cell>B</Cell>
  <Cell>C</Cell>
  <Cell>D</Cell>
</Grid>
*/
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';

/**
 * Format Area
 */
const formatAreas = (areas) => areas.map((area) => `"${area}"`).join(' ');

/**
 * Render grid template for each defined breakpoint
 */
const renderResponsiveTemplate = (responsiveTemplate) => {
  if (!responsiveTemplate) return '';

  return Object.keys(responsiveTemplate).map((key) => {
    const value = responsiveTemplate[key];
    if (!value) return '';

    const mediaToRender = media[key];
    if (!mediaToRender) return '';

    return mediaToRender`
       grid-template-columns: ${value};
     `;
  });
};

/**
 * Grid
 *
 * @exemple
 * <Grid
 *    as="ul"
 *    columns="repeat(auto-fit, minmax(0px, 1fr));"
 *    responsiveTemplate={{ smOnly: '1fr', xsOnly: '1fr' }}
 *  >
 *    <Cell as="li"></Cell>
 *    <Cell as="li"></Cell>
 *    <Cell as="li"></Cell>
 * </Grid>
 */
const Grid = styled.div`
  display: grid;
  height: ${({ height = 'auto' }) => height};
  list-style-type: none;

  grid-auto-flow: ${({ flow = 'row' }) => flow};
  grid-auto-rows: ${({ minRowHeight = '20px' }) =>
    `minmax(${minRowHeight}, auto)`};

  grid-template-columns: ${({ columns = 12 }) =>
    typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns};
  ${({ rows }) =>
    rows &&
    `grid-template-rows: ${
      typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows
    }`};
  ${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};

  grid-gap: ${({ gap = `${spacings.default}px` }) => gap};
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};

  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};

  ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};

  ${({ responsiveTemplate }) =>
    responsiveTemplate && renderResponsiveTemplate(responsiveTemplate)};
`;

/**
 * Cell
 *
 * @exemple
 * <Grid columns="repeat(auto-fit,minmax(120px,1fr))">
 *    <Cell>A</Cell>
 *    <Cell>B</Cell>
 *    <Cell>C</Cell>
 *    <Cell>D</Cell>
 * </Grid>
 */
const Cell = styled.div`
  min-width: 0;
  grid-column-end: ${({ width = 1 }) => `span ${width}`};
  grid-row-end: ${({ height = 1 }) => `span ${height}`};

  ${({ left }) => left && `grid-column-start: ${left}`};
  ${({ top }) => top && `grid-row-start: ${top}`};

  ${({ center }) => center && `text-align: center`};

  ${({ area }) => area && `grid-area: ${area}`};

  ${({ middle }) =>
    middle &&
    `
     display: inline-flex;
     flex-flow: column wrap;
     justify-content: center;
     justify-self: stretch;
 `};
`;

export { Grid, Cell };
