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
import { FlexAlignMiddle } from '@styles/tools/index';
import { rem } from '@styles/utils/rem';

import { Copyright } from '@components/generics/Copyright';
import { FinancialAid } from '@components/generics/FinancialAid';
import { Href, P, H5 } from '@components/generics/basics';

/**
 * Footer with Collaborators Logos
 */
const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <ContainerInter>
        <Title>{t('footer:title')}</Title>
        <FinancialAid />
        <CopyrightWrapper>
          <CopyrightInner>
            <Copyright />
          </CopyrightInner>

          <CopyrightLinks>
            <Href href="#/privacy">{t('footer:privacy')}</Href>
            &nbsp;|&nbsp;
            <Href href="#/termsofuse">{t('footer:termsofuse')}</Href>
          </CopyrightLinks>
        </CopyrightWrapper>
      </ContainerInter>
    </Container>
  );
};

const Container = styled.footer`
  padding: 0px ${spacings.default * 4}px;

  /* fix for increase fonts values for a11y */
  @media screen and (max-height: 850px) {
    padding: ${spacings.default * 2}px ${spacings.default * 4}px 0;
  }

  ${media.xxsOnly`
    padding: ${spacings.default * 2}px ${spacings.default}px 0;
  `}
`;

const ContainerInter = styled.div`
  padding: ${spacings.default * 2}px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
`;

const Title = styled(H5)`
  margin-bottom: ${spacings.default * 2}px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: ${rem(12)};
  letter-spacing: 0.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

const CopyrightWrapper = styled(FlexAlignMiddle.Component)`
  flex-direction: column;
  margin: ${spacings.default * 2}px 0 0;
  color: ${({ theme }) => theme.colors.text};
`;

const CopyrightInner = styled(P)`
  text-align: center;
`;

const CopyrightLinks = styled.div`
  margin-top: ${spacings.default / 2}px;
  font-size: ${rem(14)};
`;

export { Footer };
