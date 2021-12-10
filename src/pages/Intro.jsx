import React, { useEffect, useState } from 'react';
import { useGetIdentity } from 'react-admin';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
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
  const { identity, loading: identityLoading } = useGetIdentity();
  const history = useHistory();
  const { locale, setLocale } = useLocale();
  const [showPermission, setShowPermission] = useState(false);
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
    const hasPermission = navigator.permissions
      ? await navigator.permissions
          .query({ name: 'camera' })
          .then((permission) => {
            if (permission.state === 'granted') return true;
            else return false;
          })
          .catch(() => {
            return false;
          })
      : navigator.mediaDevices &&
        (await navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          }));

    if (hasPermission) history.push('/mirror');
    else setShowPermission(true);
  };

  if (identityLoading) return <></>;

  return (
    <BasicLayout
      header={<Header isLogged />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            {!showPermission ? (
              <>
                <Title>{t('intro:title', { name })}</Title>
                <Introduction xlarge>{t('intro:introduction')}</Introduction>
                <Instruction medium>{t('intro:instruction')}</Instruction>
                <ButtonStart
                  label={t('cta:start')}
                  onClick={onCheckCameraPermission}
                />
              </>
            ) : (
              <Permission />
            )}
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
const Permission = () => {
  const { t } = useTranslation();
  const [deniedPermission, setDeniedPermission] = useState(false);
  const history = useHistory();

  /**
   * Show Camera permission
   * @returns boolean
   */
  const onGrantCameraPermission = async () => {
    const hasAutorize =
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
        ? await navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => {
              return true;
            })
            .catch(() => {
              setDeniedPermission(true);
              return false;
            })
        : false;

    if (hasAutorize) history.push('/mirror');
    else setDeniedPermission(true);
  };

  return (
    <>
      <IconWarning width="48" height="48" />
      <Title>{t('permission:title')}</Title>
      <Introduction xlarge>{t('permission:introduction')}</Introduction>
      {deniedPermission ? (
        <Instruction medium>{t('permission:instruction')}</Instruction>
      ) : (
        <ButtonPermission
          label={t('cta:authorize')}
          onClick={onGrantCameraPermission}
        />
      )}
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
