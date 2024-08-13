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
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Cell, Grid } from '@styles/tools/index';

/**
 * Home Layout Slots - can receive three slots type
 * - 1 slot for headder
 * - 1 slot for content
 * - 1 slot for footer
 * @param {header, content, footer} props JSX.Element
 * @returns JSX.Element
 */
const HomeLayout = ({ header, content, footer }) => {
  useEffect(() => {
    document.body.className = 'home';
  }, []);

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
  position: sticky;
  color: ${({ theme }) => theme.colors.textInverse};
  background-color: ${({ theme }) => theme.colors.white};
`;

const CellContent = styled(Cell)`
  color: ${({ theme }) => theme.colors.textInverse};
  background-color: ${({ theme }) => theme.colors.white};
`;

const CellFooter = styled(Cell)`
  color: ${({ theme }) => theme.colors.textInverse};
  background-color: ${({ theme }) => theme.colors.white};
`;

export default React.memo(HomeLayout);
