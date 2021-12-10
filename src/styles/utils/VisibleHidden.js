import styled, { css } from 'styled-components';

/** VisibleHidden
 * Show tag only for a11y and screen reader
 * @exemple
 * <VisibleHidden />
 * <VisibleHidden as="h3"/>
 */
export const VisibleHidden = styled.h2`
  ${() => css`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `}
`;
