import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import reset from 'styled-reset';

import { BASE_FONT_SIZE } from '@styles/configs/fontsize';
import { spacings } from '@styles/configs/spacings';
import { rem } from '@styles/utils/rem';

import { theme } from '@themes/index';

import { HeadingCss } from '@components/generics/basics/Heading';
import { hrefCss } from '@components/generics/basics/Href';
import { ParagraphBaseCss } from '@components/generics/basics/Paragraph';

/**
 * Global style definition (use it with precaution)
 */
const GlobalStyles = createGlobalStyle`
  ${normalize}
  ${reset}

  html {
    font-size: ${rem(BASE_FONT_SIZE)};
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    font-weight: 500;
    width: 100%;
    height: -webkit-fill-available;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    position: relative;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};

    min-height: 100vh;
    min-height: -webkit-fill-available;

    font-size: ${rem(BASE_FONT_SIZE)};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1 {
    ${HeadingCss.h1}
  }

  h2 {
    ${HeadingCss.h2}
  }

  h3 {
    ${HeadingCss.h3}
  }

  h4 {
    ${HeadingCss.h4}
  }

  h5 {
    ${HeadingCss.h5}
  }

  h6 {
    ${HeadingCss.h6}
  }

  p {
    ${ParagraphBaseCss}
  }

  a {
    ${hrefCss}
  }

  strong {
    font-weight: 700;
  }

  hr{
    border: 0;
    height: ${rem(2)};
    background-color: ${theme.colors.grey};
    margin: ${rem(spacings.default / 2)} 0;
  }

  button, a {
    border: none;
    border-radius: 0;
    outline: none;
    -webkit-appearance: none;
    touch-action: none;

    &:focus-visible {
      outline-width: 2px;
      outline-offset: 4px;
      outline-style: dotted;
      outline-color: ${theme.colors.primary};
      box-shadow: 0px 0px 0px 2px ${theme.colors.white};
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }

  }

  ul {
    line-height: 1.5;
    list-style-type: square;
    list-style-position: inside;
  }

  ol {
    line-height: 1.5;
    list-style-type: decimal;
    list-style-position: inside;
  }

  input {
    -webkit-appearance: none;

    &:focus {
     outline: none;
    }
  }

`;

export default React.memo(GlobalStyles);
