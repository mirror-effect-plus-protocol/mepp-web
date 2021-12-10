import styled, { css } from 'styled-components';

import { HoverOrActive } from '@styles/utils/HoverOrActive';

import { theme } from '@themes/index';

/**
 * Href style components
 */
export const hrefCss = css`
  color: ${theme.colors.secondary};
  line-height: 1.4;
  text-decoration: none;

  ${HoverOrActive`
    color: ${theme.colors.text};
  `}
`;

export const Href = styled.a`
  ${hrefCss}
`;
