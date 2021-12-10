import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle } from '@styles/tools/flexs';

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
