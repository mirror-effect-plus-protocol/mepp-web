import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Space between horizontaly with flexbox CSS
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${SpaceBetween.CSS}
 *    ...
 * `;
 * or
 * <SpaceBetween.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  justify-content: space-between;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
