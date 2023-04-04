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

import React, { useRef } from 'react';
import { useNotify } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, FlexAlignCenter } from '@styles/tools';

import { useApi } from '@hooks/useApi';

import { RequestEndpoint } from '@utils/constants';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import { H2, P } from '@components/generics/basics';
import { Href } from '@components/generics/basics/Href';
import Button from '@components/generics/buttons/Button';
import Form from '@components/generics/forms/Form';
import Input from '@components/generics/forms/Input';

/**
 * Reset Password Form
 */
const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const notify = useNotify();
  const newpassword = useRef();
  const confirmpassword = useRef();
  const { post, loading, success } = useApi(RequestEndpoint.CONFIRM_RESET_PWD);

  const submit = async ({ newpassword }) => {
    const queries = new URLSearchParams(window.location.search);
    const token = queries.get('t');
    const payload = { password: newpassword, token };

    const { response } = await post(payload);
    if (response.status === 404 || response.status === 400) {
      notify('api.error.token_invalid', 'error');
    }
    if (response.status === 500) {
      notify('api:error:generic', 'error');
    }
  };

  return (
    <>
      <Title>{t('form:reset_password:title')}</Title>

      {success ? (
        <>
          <Success xlarge>{t('form:reset_password:success')}</Success>
          <ButtonsWrapper>
            <Button.Default
              label={t('cta:goto_login')}
              onClick={() => {
                window.location.href = '/';
              }}
            />
          </ButtonsWrapper>
        </>
      ) : (
        <FormWrapper>
          <Form
            submit={submit}
            options={{
              mode: 'onBlur',
              reValidateMode: 'onChange',
            }}
          >
            {({ errors }, watch) => {
              newpassword.current = watch('newpassword', '');
              confirmpassword.current = watch('confirmpassword', '');

              return (
                <>
                  <Input.Password
                    name="newpassword"
                    label={t('form:field:newpassword:label')}
                    placeholder={t('form:field:newpassword:placeholder')}
                    required
                    validation={{
                      minLength: {
                        value: process.env.PASSWORD_MIN_LEN,
                        message: t('form:field:error:min_length', {
                          amount: process.env.PASSWORD_MIN_LEN,
                        }),
                      },
                      pattern: {
                        value: new RegExp(
                          `^${process.env.PASSWORD_REGEX}{${process.env.PASSWORD_MIN_LEN},}$`,
                        ),
                        message: t('form:field:error:pwd'),
                      },
                    }}
                  />
                  {errors.newpassword && (
                    <FieldError role="alert" small>
                      {errors.newpassword.message}
                    </FieldError>
                  )}

                  <Input.Password
                    name="confirmpassword"
                    label={t('form:field:confirmpassword:label')}
                    placeholder={t('form:field:confirmpassword:placeholder')}
                    required
                    validation={{
                      validate: (value) =>
                        value === newpassword.current ||
                        t('form:field:error:pwd_not_match'),
                    }}
                  />
                  {errors.confirmpassword && (
                    <FieldError role="alert" small>
                      {errors.confirmpassword.message}
                    </FieldError>
                  )}

                  <ButtonsWrapper>
                    <Button.Default label={t('cta:save')} type="submit" />
                    <LoginLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/';
                      }}
                    >
                      {t('cta:goto_login')}
                    </LoginLink>
                  </ButtonsWrapper>
                </>
              );
            }}
          </Form>
          {loading && <LoadingCircle opaque />}
        </FormWrapper>
      )}
    </>
  );
};

const Title = styled(H2)`
  text-align: center;
`;

const Success = styled(P)`
  text-align: center;
  font-weight: 400;
  margin-bottom: ${spacings.default * 2}px;
`;

const FormWrapper = styled(FlexAlignCenter.Component)`
  position: relative;
  width: 100%;

  form {
    width: 100%;
    max-width: 430px;
  }
`;

const ButtonsWrapper = styled.div`
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

export default ResetPasswordForm;
