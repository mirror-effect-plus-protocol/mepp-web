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
