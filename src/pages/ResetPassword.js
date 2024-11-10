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
import styled from 'styled-components';

import { WrapperFullSizeMiddle } from '@styles/tools';

import { useTrackingView } from '@hooks/useTrackingView';

import BasicLayout from '@layouts/Basic';

import { Footer } from '@components/footer/Footer';
import ResetPasswordForm from '@components/forms/ResetPasswordForm';
import { Header } from '@components/header/Header';

/**
 * Reset password page with BasicLayout
 */
const ResetPasswordPage = () => {
  useTrackingView('/reset-password');

  return (
    <BasicLayout
      header={<Header />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            <ResetPasswordForm />
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<Footer />}
    />
  );
};

const ContainerWrapper = styled(WrapperFullSizeMiddle)`
  min-height: 50vh;
`;

const ContainerInner = styled.div`
  width: 100%;
  max-width: 600px;
`;

export default ResetPasswordPage;
