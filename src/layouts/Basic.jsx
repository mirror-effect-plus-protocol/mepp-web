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
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { zindex } from '@styles/configs/zindex';
import { Cell, Grid } from '@styles/tools/index';

/**
 * Basic Layout Slots - can receive three slots type
 * - 1 slot for headder
 * - 1 slot for content
 * - 1 slot for footer
 * @param {header, content} props JSX.Element
 * @returns JSX.Element
 */
const BasicLayout = ({ header, content, footer }) => {
  return (
    <Grid
      columns="1fr"
      rows="auto 1fr auto"
      areas={['header', 'content', 'footer']}
      gap="0"
    >
      <CellHeader width={1} area="header" id="header">
        {header}
      </CellHeader>

      <CellContent width={1} area="content" id="content">
        {content}
      </CellContent>

      <CellFooter width={1} area="footer" id="footer">
        {footer}
      </CellFooter>
    </Grid>
  );
};

const CellHeader = styled(Cell)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${zindex.header};

  ${media.xsOnly`
    position: relative;

  `}

  /* fix for increase fonts values for a11y */
  @media screen and (max-height: 850px) {
    position: relative;
  }
`;

const CellContent = styled(Cell)`
  width: 100vw;
  min-height: calc(100vh - 155px);
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};

  ${media.xsOnly`
    min-height: calc(100vh - 210px);
  `}

  /* fix for increase fonts values for a11y */
  @media screen and (max-height: 850px) {
    height: 100%;
  }
`;

const CellFooter = styled(Cell)`
  background-color: ${({ theme }) => theme.colors.background};
`;

export default React.memo(BasicLayout);
