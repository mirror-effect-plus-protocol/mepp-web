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

import authProvider from '@admin/authProvider';

import { spacings } from '@styles/configs/spacings';
import { FlexAlignCenter, FlexAlignMiddle } from '@styles/tools';

import { LoadingCircle } from '@components/generics/LoadingCircle';
import { H2, Href, P } from '@components/generics/basics';
import Button from '@components/generics/buttons/Button';
import Form from '@components/generics/forms/Form';
import Input from '@components/generics/forms/Input';

/**
 * Email-OTP second-step form for staff (clinician / admin) login.
 *
 * Props:
 *  - challengeId / expiresAt: returned by the first POST /me/ call
 *  - onCancel: caller goes back to the credentials step
 *  - onChallengeRenewed({challengeId, expiresAt}): caller updates challenge state after resend
 */
const MfaForm = ({ challengeId, onCancel, onChallengeRenewed }) => {
  const { t } = useTranslation();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);

  const submit = ({ code }) => {
    setLoading(true);
    authProvider.mfaVerify({ challengeId, code }).catch((err) => {
      setLoading(false);
      notify(err.message || 'form.field.error.mfa_invalid', { type: 'error' });
    });
  };

  const resend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fresh = await authProvider.mfaResend({ challengeId });
      onChallengeRenewed(fresh);
      notify('form.mfa.code_sent', { type: 'info' });
    } catch (err) {
      notify(err.message || 'form.field.error.mfa_invalid', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title>{t('form:mfa:title')}</Title>
      <Hint>{t('form:mfa:hint')}</Hint>

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
              <Input.Text
                name="code"
                placeholder={t('form:field:mfa_code:placeholder')}
                autoComplete="one-time-code"
                inputMode="numeric"
                required
                validation={{
                  pattern: {
                    value: /^\d{6}$/,
                    message: t('form:field:error:mfa_code_format'),
                  },
                }}
              />
              {errors.code && (
                <FieldError role="alert" small>
                  {errors.code.message}
                </FieldError>
              )}

              <ButtonWrapper>
                <Button.Default label={t('cta:verify')} type="submit" />
                <LinkResend href="#" onClick={resend}>
                  {t('cta:mfa_resend')}
                </LinkResend>
                <LinkCancel
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onCancel();
                  }}
                >
                  {t('cta:back')}
                </LinkCancel>
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

const Hint = styled(P)`
  text-align: center;
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

const ButtonWrapper = styled.div`
  ${FlexAlignMiddle.CSS}
  flex-direction: column;
`;

const LinkResend = styled(Href)`
  margin: ${spacings.default * 2}px 0 0;
`;

const LinkCancel = styled(Href)`
  margin: ${spacings.default / 2}px 0 0;
`;

const FieldError = styled(P)`
  position: absolute;
  margin-top: -${spacings.default * 1.8}px;
  color: ${({ theme }) => theme.colors.error};
`;

export default MfaForm;
