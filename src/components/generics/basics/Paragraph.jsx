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

import { rem } from '@styles/utils/rem';

export const ParagraphBaseCss = css`
  -webkit-font-smoothing: antialiased;
  font-size: ${rem(16)};
  line-height: 1.2;

  &:not(:last-of-type) {
    margin-bottom: 1.5em;
  }
  b {
    font-weight: 700;
  }
  i {
    font-style: italic;
  }
`;

/**
 *
 * Paragraph style components
 *
 * @exemple
 * <P small />
 * <P medium />
 */
export const P = styled.p`
  ${(props) => css`
    ${ParagraphBaseCss}

    ${props.xsmall && `font-size: ${rem(12)}`}
    ${props.small && `font-size: ${rem(14)}`}
    ${props.medium && `font-size: ${rem(16)}`};
    ${props.large && `font-size: ${rem(20)}`};
    ${props.xlarge && `font-size: ${rem(21)}`};
  `}
`;
