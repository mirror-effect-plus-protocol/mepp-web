import React, { useState } from 'react';
import styled from 'styled-components';

import { WrapperFullSizeMiddle } from '@styles/tools';

import { useTrackingView } from '@hooks/useTrackingView';

import BasicLayout from '@layouts/Basic';

import { Footer } from '@components/footer/Footer';
import ForgotPwd from '@components/forms/ForgotPwdForm';
import LoginForm from '@components/forms/LoginForm';
import { Header } from '@components/header/Header';

/**
 * Login / ForgotPwd page with BasicLayout
 */
const LoginPage = () => {
  const [switchForm, setSwitchForm] = useState(false);
  useTrackingView('/login');

  return (
    <BasicLayout
      header={<Header />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            {!switchForm && <LoginForm onSwitch={() => setSwitchForm(true)} />}
            {switchForm && <ForgotPwd onSwitch={() => setSwitchForm(false)} />}
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

export default LoginPage;
