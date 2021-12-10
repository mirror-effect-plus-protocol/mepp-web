import styled, { css } from 'styled-components';

import { rem } from '@styles/utils/rem';

export const ParagraphBaseCss = css`
  -webkit-font-smoothing: antialiased;
  font-size: ${rem(16)};
  line-height: 1.2;

  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }
  b {font-weight: 700;}
  i {font-style: italic;}
`;

/**
 *
 * Paragraph style components
 *
 * @exemple
 * <P small />
 * <P medium />
 */
export const P = styled.p`
  ${(props) => css`
    ${ParagraphBaseCss}

    ${props.xsmall && `font-size: ${rem(12)}`}
    ${props.small && `font-size: ${rem(14)}`}
    ${props.medium && `font-size: ${rem(16)}`};
    ${props.large && `font-size: ${rem(20)}`};
    ${props.xlarge && `font-size: ${rem(21)}`};
  `}
`;
