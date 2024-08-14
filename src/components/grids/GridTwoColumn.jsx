import React from 'react';
import styled from 'styled-components';

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
    >
      <CellItem>{left}</CellItem>
      <CellItem>{right}</CellItem>
    </GridWrapper>
  );
};

const GridWrapper = styled(Grid)``;

const CellItem = styled(Cell)``;

export { GridTwoColumn };
