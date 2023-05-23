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

import React, { useState } from 'react';
import { useNotify } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter, FlexAlignMiddle } from '@styles/tools';

import { useApi } from '@hooks/useApi';

import { RequestEndpoint } from '@utils/constants';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import { H2, P, Href } from '@components/generics/basics';
import Button from '@components/generics/buttons/Button';
import Form from '@components/generics/forms/Form';
import Input from '@components/generics/forms/Input';

/**
 * Forgot Password Form
 */
const ForgotPwdForm = ({ onSwitch }) => {
  const { t } = useTranslation();
  const notify = useNotify();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const { post, loading } = useApi(RequestEndpoint.RESET_PWD);

  const submit = async ({ email }) => {
    setEmail(email);
    const { data } = await post({ email });
    // always success message even if email is not found
    if (data) setSuccess(true);
    else notify('api.error.generic', {type: 'error'});
  };

  return (
    <>
      <Title>{t('form:forgot_password:title')}</Title>

      {success ? (
        <>
          <Introduction
            xlarge
            dangerouslySetInnerHTML={{
              __html: t('form:forgot_password:success', {
                email,
              }),
            }}
          />
          <ButtonWrapper>
            <Button.Default label={t('cta:goto_login')} onClick={onSwitch} />
          </ButtonWrapper>
        </>
      ) : (
        <>
          <Introduction xlarge>
            {t('form:forgot_password:introduction')}
          </Introduction>

          <FormWrapper>
            <Form
              submit={submit}
              options={{
                mode: 'onBlur',
                reValidateMode: 'onChange',
              }}
            >
              {({ errors }) => (
                <>
                  <Input.Email
                    name="email"
                    placeholder={t('form:field:email:placeholder')}
                    required
                  />
                  {errors.email && (
                    <FieldError role="alert" small>
                      {errors.email.message}
                    </FieldError>
                  )}

                  <ButtonWrapper>
                    <Button.Default label={t('cta:send')} type="submit" />
                    <LoginLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onSwitch();
                      }}
                    >
                      {t('cta:goto_login')}
                    </LoginLink>
                  </ButtonWrapper>
                </>
              )}
            </Form>
            {loading && <LoadingCircle opaque />}
          </FormWrapper>
        </>
      )}
    </>
  );
};

const Title = styled(H2)`
  text-align: center;
`;

const Introduction = styled(P)`
  text-align: center;
  font-weight: 400;
  margin-bottom: ${spacings.default * 2}px;

  span {
    color: ${({ theme }) => `${theme.colors.secondary}`};
  }
`;

const FormWrapper = styled(FlexAlignCenter.Component)`
  position: relative;
  width: 100%;

  form {
    width: 100%;
    max-width: 430px;
  }
`;

const ButtonWrapper = styled.div`
  ${FlexAlignMiddle.CSS}
  flex-direction: column;
`;

const LoginLink = styled(Href)`
  margin: ${spacings.default * 2}px 0 0;
`;

const FieldError = styled(P)`
  position: absolute;
  margin-top: -${spacings.default * 1.8}px;
  color: ${({ theme }) => theme.colors.error};
`;

export default ForgotPwdForm;
