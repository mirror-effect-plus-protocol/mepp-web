import styled, { css } from 'styled-components';

import { spacings } from '@styles/configs/spacings';

/**
 * Spacer
 *
 * @exemple
 * <SpacerVertical size={30px} />
 * <SpacerHorizontal size={30px} />
 */
export const SpacerVertical = styled.div`
  ${(props) => css`
    height: ${props.size ? props.size : `${spacings.default}px`};
    width: 100%;
  `}
`;

export const SpacerHorizontal = styled.div`
  ${(props) => css`
    width: ${props.size ? props.size : `${spacings.default}px`};
    height: 100%;
  `}
`;
