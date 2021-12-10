import styled, { css } from 'styled-components';

import FlexDisplay from './Display';

/**
 * Center horizontaly with flexbox CSSt
 *
 * @exemple
 * import FlexAlignCenter from './AlignCenter';
 * const StyleComponent = styled(...)`
 *    ${FlexAlignCenter.CSS}
 *    ...
 * `;
 * or
 * <FlexAlignCenter.Component />
 */
const CSS = css`
  ${FlexDisplay.CSS}
  flex-direction: row;
  justify-content: center;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
