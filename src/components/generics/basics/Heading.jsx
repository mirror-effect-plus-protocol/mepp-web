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
import styled, { css } from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { rem } from '@styles/utils/rem';

const hBaseStyle = css`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

/**
 * Hx style components
 */
export const HeadingCss = {
  h1: css`
    ${hBaseStyle}
    line-height: 1.1;
    font-size: ${rem(38)};
    margin: 0 0 ${rem(spacings.default)} 0;

    ${media.lg`
      font-size: ${rem(42)};
    `}
  `,

  h2: css`
    ${hBaseStyle}
    line-height: 1.2;
    font-size: ${rem(48)};
    margin: 0 0 ${rem(spacings.default * 2)} 0;

    ${media.xsOnly`
      font-size: ${rem(32)};
    `}

    ${media.lg`
      font-size: ${rem(48)};
    `}
  `,

  h3: css`
    ${hBaseStyle}
    line-height: 1.3;
    font-size: ${rem(30)};
    margin: 0 0 ${rem(spacings.default / 2)} 0;

    ${media.lg`
      font-size: ${rem(34)};
    `}
  `,

  h4: css`
    ${hBaseStyle}
    line-height: 1.3;
    font-size: ${rem(28)};
    margin: 0 0 ${rem(spacings.default / 2.5)} 0;

    ${media.lg`
      font-size: ${rem(32)};
    `}
  `,

  h5: css`
    ${hBaseStyle}
    line-height: 1.3;
    font-size: ${rem(24)};
    margin: 0 0 ${rem(spacings.default / 3)} 0;

    ${media.lg`
      font-size: ${rem(28)};
    `}
  `,

  h6: css`
    ${hBaseStyle}
    line-height: 1.3;
    font-size: ${rem(20)};
    margin: 0 0 ${rem(spacings.default / 3.5)} 0;

    ${media.lg`
      font-size: ${rem(24)};
    `}
  `,
};

/** H1
 *
 * @example
 * <H1 />
 * <H2 as="h2"/>
 */
export const H1 = styled.h1`
  ${HeadingCss.h1}
`;

/** H2
 *
 * @example
 * <H1 />
 * <H3 as="h2"/>
 */
export const H2 = styled.h2`
  ${HeadingCss.h2}
`;

/** H3
 *
 * @example
 * <H4 />
 * <H3 as="h2"/>
 */
export const H3 = styled.h3`
  ${HeadingCss.h3}
`;

/** H4
 *
 * @example
 * <H5 />
 * <H5 as="h2"/>
 */
export const H4 = styled.h4`
  ${HeadingCss.h4}
`;

/** H5
 *
 * @example
 * <H5 />
 * <H5 as="h2"/>
 */
export const H5 = styled.h5`
  ${HeadingCss.h5}
`;

/** H6
 *
 * @example
 * <H6 />
 * <H6 as="h2"/>
 */
export const H6 = styled.h6`
  ${HeadingCss.h6}
`;
