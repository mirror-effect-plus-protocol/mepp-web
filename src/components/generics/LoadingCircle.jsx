import React from 'react';
import styled, { keyframes } from 'styled-components';

import { zindex } from '@styles/configs/zindex';
import { FlexAlignMiddle } from '@styles/tools';
import { rem } from '@styles/utils/rem';

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
