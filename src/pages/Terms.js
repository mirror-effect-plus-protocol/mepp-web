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
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, Wrapper } from '@styles/tools';

import { useLocale } from '@hooks/locale/useLocale';
import { useTrackingView } from '@hooks/useTrackingView';

import BasicLayout from '@layouts/Basic';

import { Footer } from '@components/footer/Footer';
import { Href } from '@components/generics/basics/index';
import { Header } from '@components/header/Header';

/**
 * Terms of use page with BasicLayout
 */
const TermsPage = () => {
  const { locale } = useLocale();
  const { t } = useTranslation();
  useTrackingView('/termofuse');

  const TermsComponent = React.lazy(() => import(`@pages/terms/${locale}`));

  return (
    <BasicLayout
      header={<Header />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            <Suspense fallback={<div>{t('ra.page.loading')}</div>}>
              <TermsComponent />
            </Suspense>
            <ButtonsWrapper>
              <LoginLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '#/login';
                }}
              >
                {t('cta:goto_login')}
              </LoginLink>
            </ButtonsWrapper>
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<Footer />}
    />
  );
};

const ContainerWrapper = styled(Wrapper)`
  position: relative;
  padding-top: 120px;
  padding-bottom: ${spacings.default * 2}px;

  ${media.xsOnly`
    padding-top: 0px;
  `}

  @media screen and (max-height: 850px) {
    padding-top: 0px;
  }
`;

const ContainerInner = styled.div``;

const ButtonsWrapper = styled.div`
  ${FlexAlignMiddle.CSS}
  flex-direction: column;
`;

const LoginLink = styled(Href)`
  margin: ${spacings.default * 2}px 0 0;
`;

export default TermsPage;
