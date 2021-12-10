import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter, FlexAlignMiddle } from '@styles/tools';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import { H2, Href, P } from '@components/generics/basics';
import Button from '@components/generics/buttons/Button';
import Form from '@components/generics/forms/Form';
import Input from '@components/generics/forms/Input';

/**
 * Login Form
 */
const LoginForm = ({ onSwitch }) => {
  const { t } = useTranslation();
  const login = useLogin();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    setLoading(true);
    login(data).catch(() => {
      setLoading(false);
      notify('form.field.error.login_invalid', 'error');
    });
  };

  return (
    <>
      <Title>{t('form:login:title')}</Title>

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
                name="username"
                placeholder={t('form:field:email:placeholder')}
                required
              />
              {errors.username && (
                <FieldError role="alert" small>
                  {errors.username.message}
                </FieldError>
              )}

              <Input.Password
                name="password"
                placeholder={t('form:field:password:placeholder')}
                required
              />
              {errors.password && (
                <FieldError role="alert" small>
                  {errors.password.message}
                </FieldError>
              )}

              <ButtonWrapper>
                <Button.Default label={t('cta:login')} type="submit" />
                <LinkPassword
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitch();
                  }}
                >
                  {t('cta:goto_forgot_password')}
                </LinkPassword>
              </ButtonWrapper>
            </>
          )}
        </Form>
        {loading && <LoadingCircle opaque />}
      </FormWrapper>
    </>
  );
};

const Title = styled(H2)`
  text-align: center;
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

const LinkPassword = styled(Href)`
  margin: ${spacings.default * 2}px 0 0;
`;

const FieldError = styled(P)`
  position: absolute;
  margin-top: -${spacings.default * 1.8}px;
  color: ${({ theme }) => theme.colors.error};
`;

export default LoginForm;
