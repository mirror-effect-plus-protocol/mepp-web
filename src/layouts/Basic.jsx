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
  min-height: calc(100vh - 90px);

  ${media.xsOnly`
    min-height: calc(100vh - 210px);
  `}

  /* fix for increase fonts values for a11y */
  @media screen and (max-height: 850px) {
    height: 100%;
  }
`;

const CellFooter = styled(Cell)``;

export default React.memo(BasicLayout);
