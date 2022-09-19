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
import styled, { keyframes } from 'styled-components';

import { zindex } from '../../styles/configs/zindex';
import { FlexAlignMiddle } from '../../styles/tools';
import { rem } from '../../styles/utils/rem';

/** LOADING CIRCLE
 */
const LoadingCircle = ({ opaque = false }) => {
  return (
    <LoadingWrapper opaque={opaque}>
      <Circle />
    </LoadingWrapper>
  );
};

/**
 * Wrapper
 */
const LoadingWrapper = styled.div`
  ${FlexAlignMiddle.CSS}
  position: absolute;
  background-color: ${({ opaque, theme }) =>
    `${opaque ? theme.colors.background + 'e6' : 'transparent'}`};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: ${zindex.loading};
`;

/**
 * Circle
 */
const Circle = styled.div`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: ${rem(30)};
  height: ${rem(30)};
  border-radius: 100%;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) =>
    `${theme.colors.primary} ${theme.colors.primary} ${theme.colors.primary} transparent`};

  animation-name: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `};
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export { LoadingCircle };
