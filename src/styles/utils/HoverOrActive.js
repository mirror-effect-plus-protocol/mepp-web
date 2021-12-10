import { css } from 'styled-components';

/**
 * Mixin used for active, hover and focus visible state
 */
const HoverOrActive = (strings, ...rules) => css`
  transition-duration: 0.2s;
  transition-property: color, background, transform;
  transition-timing-function: ease-out;

  @media (hover: none) {
    &:active {
      ${css(strings, ...rules)}
    }
  }
  @media (hover: hover) {
    &:hover {
      ${css(strings, ...rules)}
    }
    &:focus-visible {
      ${css(strings, ...rules)}
    }
  }
`;

export { HoverOrActive };
