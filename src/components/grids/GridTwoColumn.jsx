import React from 'react';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { Cell, Grid } from '@styles/tools/index';

/**
 * HomePage grid section
 */
const GridTwoColumn = ({ left, right, background }) => {
  return (
    <GridWrapper
      as="section"
      columns="repeat(auto-fit, minmax(0px, 1fr));"
      responsiveTemplate={{ smOnly: '1fr', xsOnly: '1fr' }}
      background={background}
      gap={`${spacings.default * 2}px`}
    >
      <CellItem>{left}</CellItem>
      <CellItem>{right}</CellItem>
    </GridWrapper>
  );
};

const GridWrapper = styled(Grid)`
  min-height: calc(100vh - 200px);
`;

const CellItem = styled(Cell)`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
`;

export { GridTwoColumn };
