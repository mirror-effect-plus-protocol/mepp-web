import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Center and middle( verticaly and horizontaly) with flexbox CSS
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${FlexAlignMiddle.CSS}
 *    ...
 * `;
 * or
 * <FlexAlignMiddle.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  justify-content: center;
  align-items: center;
  list-style-type: none;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
