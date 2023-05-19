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

import React, { useContext, useRef, useState } from 'react';
import { useNotify, useGetIdentity } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter } from '@styles/tools';
import { rem } from '@styles/utils/rem';

import { useApi } from '@hooks/useApi';

import { RequestEndpoint } from '@utils/constants';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import { P } from '@components/generics/basics';
import { SpacerHorizontal } from '@components/generics/basics/Spacer';
import Button from '@components/generics/buttons/Button';
import Form from '@components/generics/forms/Form';
import Input from '@components/generics/forms/Input';
import { OverlayContext } from '@components/overlays/OverlayProvider';

/**
 * Profile Form
 */
const ProfileForm = () => {
  const { t } = useTranslation();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const { close } = useContext(OverlayContext);
  const notify = useNotify();
  const newpassword = useRef();
  const oldpassword = useRef();
  const confirmpassword = useRef();
  const [hidePassword, setHidePassword] = useState(true);
  const { patch, loading } = useApi(RequestEndpoint.PROFILE);

  const email = (identity && identity.email) || '';

  const submit = async ({ newpassword, oldpassword, email }) => {
    const payload = { password: oldpassword, email };
    if (!hidePassword) payload['new_password'] = newpassword;

    const { data, response } = await patch(payload);
    if (data && response.status === 200) {
      close();

      // Update token since e-mail and/or password have been changed.
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Update current profile
      if (data.profile) {
        localStorage.setItem(
          'profile',
          JSON.stringify({ ...identity, ...data.profile }),
        );
      }

      notify('api.success.profile_update', 'success');
    } else {
      if (data && data.password) notify('api.error.pwd_invalid', {type: 'error'});
      else notify('api.error.generic', {type: 'error'});
    }
  };

  if (identityLoading) return <></>;

  return (
    <Container>
      <Form
        submit={submit}
        options={{
          mode: 'onBlur',
          reValidateMode: 'onChange',
        }}
      >
        {({ errors }, watch, setValue) => {
          oldpassword.current = watch('oldpassword', '');
          newpassword.current = watch('newpassword', '');
          confirmpassword.current = watch('confirmpassword', '');

          return (
            <>
              <Input.Email
                name="email"
                defaultValue={email}
                placeholder={t('form:field:email:placeholder')}
                required
              />
              {errors.email && (
                <FieldError role="alert" small>
                  {errors.email.message}
                </FieldError>
              )}

              <ButtonModifyWrapper>
                <Button.Transparent
                  label={hidePassword ? t('cta:modify') : t('cta:cancel')}
                  as="div"
                  tabIndex={0}
                  onClick={() => {
                    if (hidePassword === false) {
                      setValue('newpassword', '');
                      setValue('confirmpassword', '');
                    }
                    setHidePassword(!hidePassword);
                  }}
                />
              </ButtonModifyWrapper>

              <Input.Password
                name="oldpassword"
                label={t('form:field:oldpassword:label')}
                placeholder={t('form:field:oldpassword:placeholder')}
                required
              />
              {errors.oldpassword && (
                <FieldError role="alert" small>
                  {errors.oldpassword.message}
                </FieldError>
              )}

              <Input.FieldSet style={hidePassword ? { display: 'none' } : {}}>
                <Input.Password
                  name="newpassword"
                  label={t('form:field:newpassword:label')}
                  placeholder={t('form:field:newpassword:placeholder')}
                  required={!hidePassword && confirmpassword.current !== ''}
                  validation={
                    !hidePassword && {
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
                    }
                  }
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
                  validation={
                    !hidePassword && {
                      validate: (value) =>
                        value === newpassword.current ||
                        t('form:field:error:pwd_not_match'),
                    }
                  }
                  required={!hidePassword && newpassword.current !== ''}
                />
                {errors.confirmpassword && (
                  <FieldError role="alert" small>
                    {errors.confirmpassword.message}
                  </FieldError>
                )}
              </Input.FieldSet>

              <ButtonsWrapper>
                <Button.Outline label={t('cta:cancel')} onClick={close} />
                <SpacerHorizontal />
                <Button.Default label={t('cta:save')} type="submit" />
              </ButtonsWrapper>
            </>
          );
        }}
      </Form>
      {loading && <LoadingCircle opaque />}
    </Container>
  );
};

const Container = styled(FlexAlignCenter.Component)`
  position: relative;
  width: 100%;
  form {
    position: relative;
    max-width: 430px;
    width: 100%;
  }
`;

const ButtonsWrapper = styled(FlexAlignCenter.Component)`
  margin-top: ${spacings.default}px;
  margin-bottom: 50px;
`;

const ButtonModifyWrapper = styled.div`
  position: absolute;
  right: 0;
  div {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${rem(20)};
    font-weight: 500;
    -webkit-font-smoothing: antialiased;

    ${media.xsOnly`
      font-size: ${rem(15)};
      min-height: 0;
    `}
  }
`;

const FieldError = styled(P)`
  position: absolute;
  margin-top: -${spacings.default * 1.8}px;
  color: ${({ theme }) => theme.colors.error};
`;

export default ProfileForm;
