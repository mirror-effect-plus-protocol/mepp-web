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
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, FlexDisplay } from '@styles/tools';

import { Copyright } from '@components/generics/Copyright';
import LocaleSwitcher from '@components/generics/LocaleSwitcher';
import { Href } from '@components/generics/basics';

/**
 * Footer Home
 */
const FooterHome = () => {
  return (
    <Container>
      <LeftSide />
      <RightSide />
    </Container>
  );
};

const LeftSide = () => {
  const { t } = useTranslation();

  return (
    <LeftWrapper>
      <Copyright />
      <Href href="#/privacy">{t('footer:privacy')}</Href>
      <Href href="#/termsofuse">{t('footer:termsofuse')}</Href>
    </LeftWrapper>
  );
};

const RightSide = () => {
  return (
    <RightWrapper>
      <LocaleSwitcher />
    </RightWrapper>
  );
};

const Container = styled.footer`
  ${FlexDisplay.CSS}
  box-sizing: border-box;
  padding: ${spacings.default}px ${spacings.default * 2}px;
  width: 100%;
  position: relative;

  ${media.xsOnly`
    padding: ${spacings.default}px ${spacings.default}px;
  `}
`;

const LeftWrapper = styled.div``;

const RightWrapper = styled(FlexAlignMiddle.Component)`
  margin-left: auto;
`;

export { FooterHome };
