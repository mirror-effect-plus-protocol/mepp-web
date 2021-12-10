import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Right horizontaly with flexbox CSS
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${FlexAlignLeft.CSS}
 *    ...
 * `;
 * or
 * <FlexAlignLeft.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
