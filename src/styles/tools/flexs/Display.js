import styled, { css } from 'styled-components';

/**
 * Display Flex
 *
 * @exemple
 * const StyleComponent = styled(...)`
 *    ${FlexDisplay.CSS}
 *    ...
 * `;
 * or
 * <FlexDisplay.Component />
 */
const CSS = css`
  display: flex;
`;
const Component = styled.div`
  ${CSS}
`;

export default { Component, CSS };
