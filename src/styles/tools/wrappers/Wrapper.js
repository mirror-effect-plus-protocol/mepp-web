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

import styled from 'styled-components';

import { media } from '../../configs/breakpoints';
import { spacings } from '../../configs/spacings';
import { FlexAlignMiddle } from '../../tools/flexs';

/**
 * WRAPPER SETTINGS
 */
const settings = {
  maxContainer: 1366,
};

/**
 * WRAPPER SIMPLE WITH A MAX-WIDTH STYLE
 * - use it to wrap content with a max reflow
 * @example
 * <Wrapper>
 * ...
 * </Wrapper>
 */
const Wrapper = styled.div`
  width: 100%;
  max-width: ${settings.maxContainer}px;
  margin: 0 auto;
  padding: 0 250px;
  box-sizing: border-box;
  ${media.xsOnly`
    padding: 0 ${spacings.default}px;
  `}
`;

/**
 * Wrapper Full
 * - use it to wrap content to bleed all over window (width)
 *
 * @example
 * <WrapperFull>
 * ...
 * </WrapperFull>
 */
const WrapperFull = styled.div`
  width: 100%;
  max-width: none;
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
`;

/**
 * Wrapper Full (width and height)
 * - use it to wrap content to bleed all over window (width and height)
 *
 * @example
 * <WrapperFullSize>
 * ...
 * </WrapperFullSize>
 */
const WrapperFullSize = styled.div`
  width: calc(100% - ${spacings.default * 2}px);
  height: 100%;
  padding: 0 ${spacings.default}px;
  max-width: none;
  overflow: hidden;
`;

/** Wrapper Full (width and height) and content at the middle
 * - Wrapper for pages to have Full Size with content at the midle
 *
 * @exemple
 * const StyleComponent = styled(WrapperFullSizeMiddle)`
 *    ...
 * `;
 * or
 * <WrapperFullSizeMiddle><WrapperFullSizeMiddle />
 */
const WrapperFullSizeMiddle = styled(WrapperFullSize)`
  ${FlexAlignMiddle.CSS}
  position: relative;
  min-height: 100vh;

  @media screen and (max-height: 850px) {
    min-height: auto;
  }
`;

export { Wrapper, WrapperFull, WrapperFullSize, WrapperFullSizeMiddle };
