import React from 'react';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { Cell, Grid } from '@styles/tools/index';

/**
 * HomePage grid section
 */
const GridTwoColumn = ({ left, right, background, fullHeight }) => {
  return (
    <GridWrapper
      as="section"
      columns="repeat(auto-fit, minmax(0px, 1fr));"
      responsiveTemplate={{ smOnly: '1fr', xsOnly: '1fr' }}
      background={background}
      gap={`${spacings.default}px`}
      fullHeight={fullHeight}
    >
      <CellItem>{left}</CellItem>
      <CellItem>{right}</CellItem>
    </GridWrapper>
  );
};

const GridWrapper = styled(Grid)`
  ${({ fullHeight }) => fullHeight && `  min-height: calc(100vh - 200px);`}
`;

const CellItem = styled(Cell)``;

export { GridTwoColumn };
