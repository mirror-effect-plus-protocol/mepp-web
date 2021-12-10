import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Align verticaly with flexbox CSS
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${FlexDirectionColumn.CSS}
 *    ...
 * `;
 * or
 * <FlexDirectionColumn.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  flex-direction: column;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
