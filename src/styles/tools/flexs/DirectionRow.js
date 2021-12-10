import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Align horizontaly with flexbox CSS
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${FlexDirectionRow.CSS}
 *    ...
 * `;
 * or
 * <FlexDirectionRow.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  flex-direction: row;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
