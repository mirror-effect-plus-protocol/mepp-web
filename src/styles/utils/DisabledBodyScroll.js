import { createGlobalStyle } from 'styled-components';

/**
 * Disabled scroll all over the page (body)
 * - Utils to disabled the scroll when a Modal/Overlay is open
 * - Add only this component into another component
 *
 * @exemple
 * <DisabledBodyScrollGlogalStyle />
 */
const DisabledBodyScrollGlogalStyle = createGlobalStyle`
  html, body {
    overflow: hidden !important;
    position:fixed;
  }
`;

export { DisabledBodyScrollGlogalStyle };
