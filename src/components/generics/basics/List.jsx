import styled, { css } from 'styled-components';

import { rem } from '@styles/utils/rem';

/**
 *
 * List style components
 *
 * @exemple
 * <UL><UL>
 */
export const UL = styled.ul`
  ${() => css``}
`;

/**
 *
 * List style components
 *
 * @exemple
 * <LI><LI>
 */
export const LI = styled.li`
  ${() => css`
    font-size: ${rem(16)};
    padding: 0px 20px 20px;
    line-height: 1.2;
  `}
`;
