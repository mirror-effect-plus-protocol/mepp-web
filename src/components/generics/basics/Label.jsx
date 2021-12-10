import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { rem } from '@styles/utils/rem';

/**
 * Form Label style components
 */
export const Label = styled.label`
  font-size: ${rem(20)};
  font-weight: 500;
  -webkit-font-smoothing: antialiased;

  ${media.xsOnly`
    font-size: ${rem(15)};
  `}
`;
