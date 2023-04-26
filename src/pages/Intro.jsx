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
import React, { useEffect, useState } from 'react';
import { useGetIdentity } from 'react-admin';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Warning from '@assets/icons/warning.svg';

import { spacings } from '@styles/configs/spacings';
import { WrapperFullSizeMiddle } from '@styles/tools';

import withAuth from '@hocs/withAuth';

import { useLocale } from '@hooks/locale/useLocale';
import { useTrackingView } from '@hooks/useTrackingView';

import BasicLayout from '@layouts/Basic';

import { Footer } from '@components/footer/Footer';
import { H2, P } from '@components/generics/basics';
import Button from '@components/generics/buttons/Button';
import { Header } from '@components/header/Header';

/**
 * Intro page with BasicLayout
 */
const IntroPage = () => {
  const { t } = useTranslation();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const navigate = useNavigate();
  const { locale, setLocale } = useLocale();
  const [permissionAuthorize, setPermissionAuthorize] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  useTrackingView('/introduction');

  const name = (identity && identity.first_name) || '';

  // change UI language according to profile language (once)
  useEffect(() => {
    if (identity && identity.language && identity.language !== locale) {
      setLocale(identity.language);
    }
  }, [identity]);

  /**
   * Camera permission validation
   */
  const onCheckCameraPermission = async () => {
    const permission =
      navigator.permissions &&
      (await navigator.permissions
        .query({ name: 'camera' })
        .then((permission) => {
          return permission;
        })
        .catch(() => {
          return false;
        }));

    if (permission) {
      if (permission.state === 'granted') navigate('/mirror');
      else if (permission.state === 'denied') setPermissionDenied(true);
      else setPermissionAuthorize(true);
    } else setPermissionAuthorize(true);
  };

  if (identityLoading) return <></>;

  return (
    <BasicLayout
      header={<Header isLogged />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            {!permissionDenied && !permissionAuthorize && (
              <>
                <Title>{t('intro:title', { name })}</Title>
                <Introduction xlarge>{t('intro:introduction')}</Introduction>
                <Instruction medium>{t('intro:instruction')}</Instruction>
                <ButtonStart
                  label={t('cta:start')}
                  onClick={onCheckCameraPermission}
                />
              </>
            )}
            {permissionAuthorize && <PermissionAuthorize />}
            {permissionDenied && <PermissionDenied />}
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<Footer />}
    />
  );
};

/**
 * Permission step
 * @returns JSX
 */
const PermissionDenied = () => {
  const { t } = useTranslation();

  return (
    <>
      <IconWarning width="48" height="48" />
      <Title>{t('permission:title')}</Title>
      <Introduction xlarge>{t('permission:introduction')}</Introduction>
      <Instruction medium>{t('permission:instruction')}</Instruction>
    </>
  );
};

/**
 * Permission step
 * @returns JSX
 */
const PermissionAuthorize = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <IconWarning width="48" height="48" />
      <Title>{t('permission:title')}</Title>
      <Introduction xlarge>{t('permission:introduction')}</Introduction>
      <ButtonPermission
        label={t('cta:authorize')}
        onClick={() => navigate('/mirror')}
      />
    </>
  );
};

const ContainerWrapper = styled(WrapperFullSizeMiddle)`
  min-height: 50vh;
`;

const ContainerInner = styled.div`
  text-align: center;
  width: 100%;
  max-width: 1000px;
`;

const Title = styled(H2)``;

const Introduction = styled(P)`
  font-weight: 400;
  margin-bottom: ${spacings.default * 2}px;
`;

const ButtonStart = styled(Button.Default)`
  margin: ${spacings.default * 2}px auto 0;
`;

const ButtonPermission = styled(Button.Default)`
  margin: 0 auto;
`;

const Instruction = styled(P)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin: auto auto;
  max-width: 650px;
`;

const IconWarning = styled(Warning)`
  margin-bottom: ${spacings.default}px;
  fill: ${({ theme }) => theme.colors.primary};
`;

export default withAuth(IntroPage);
