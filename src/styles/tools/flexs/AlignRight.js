import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Right horizontaly with flexbox CSS
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${FlexAlignRight.CSS}
 *    ...
 * `;
 * or
 * <FlexAlignRight.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  justify-content: flex-end;
  align-items: center;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
