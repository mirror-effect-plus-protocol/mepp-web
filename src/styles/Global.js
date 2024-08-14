/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import reset from 'styled-reset';

import { BASE_FONT_SIZE } from '@styles/configs/fontsize';
import { spacings } from '@styles/configs/spacings';
import { zindex } from '@styles/configs/zindex';
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

  body{
    position: relative;

    color: ${theme.colors.text};
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    line-height: 1;

    min-height: 100vh;
    min-height: -webkit-fill-available;

    font-size: ${rem(BASE_FONT_SIZE)};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;

    &.light{
      color: ${theme.colors.black};
      background-color: ${theme.colors.white};
    }

    &.dark{
      color: ${theme.colors.text};
      background-color: ${theme.colors.background};
    }
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

  .MuiScopedCssBaseline-root {
    background-color: ${theme.colors.background};

    body.light & {
      background-color: ${theme.colors.white};
    }

    body.dark & {
      background-color: ${theme.colors.background};
    }

    color: ${theme.colors.text};
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    line-height: 1;
    font-size: ${rem(BASE_FONT_SIZE)};
  }

  .lil-gui.autoPlace {
    top: 23px;
    right:0;
    z-index: ${zindex.max};
  }
`;

export default React.memo(GlobalStyles);
