import React from 'react';
import styled from 'styled-components';

import { Cell, Grid } from '@styles/tools/index';

/**
 * HomePage grid section
 */
const GridOneColumn = ({ content, background }) => {
  return (
    <GridWrapper
      as="section"
      columns="repeat(auto-fit, minmax(0px, 1fr));"
      background={background}
    >
      <CellItem>{content}</CellItem>
    </GridWrapper>
  );
};

const GridWrapper = styled(Grid)``;

const CellItem = styled(Cell)``;

export { GridOneColumn };
