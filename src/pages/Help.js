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
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, Wrapper } from '@styles/tools';

import { useLocale } from '@hooks/locale/useLocale';
import { useTrackingView } from '@hooks/useTrackingView';

import { Language } from '@utils/constants';

import BasicLayout from '@layouts/Basic';

import { Footer } from '@components/footer/Footer';
import { H3, P, Href } from '@components/generics/basics/index';
import { Header } from '@components/header/Header';

/**
 * Help/Support page with BasicLayout
 */
const HelpPage = () => {
  const { locale } = useLocale();
  const { t } = useTranslation();
  useTrackingView('/privacy');

  return (
    <BasicLayout
      header={<Header />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            {locale === Language.FR ? <HelpFr t={t} /> : <HelpEn t={t} />}
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<Footer />}
    />
  );
};

const HelpFr = ({ t }) => {
  return (
    <>
      <H3>AIDE ET SUPPORT TECHNIQUE</H3>
      <P>De courts tutoriels vidéo sont disponibles en ligne</P>
      <ul>
        <li>
          <a
            href="https://youtu.be/tEIdtV9QQV8"
            target="_blank"
            rel="noreferrer"
          >
            Patients
          </a>
        </li>
        <li>
          <a
            href="https://youtu.be/Q0qoov-OJUM"
            target="_blank"
            rel="noreferrer"
          >
            Cliniciens
          </a>
        </li>
      </ul>
      <br />
      <P>
        Pour tout problème technique avec le MEPP, veuillez nous contacter par
        courriel à l’adresse&nbsp;suivante&nbsp;:&nbsp;
        <a href="mailto:support@mirroreffectplus.org">
          support@mirroreffectplus.org
        </a>{' '}
        en décrivant en détail le problème.
      </P>
      <br />
      <b>SVP, veuillez fournir les détails suivants:</b>
      <ul>
        <li>
          La version du navigateur ou de l’application mobile que vous utilisez
        </li>
        <li>
          La version du système d’exploitation (ex: Windows 11, macOS Ventura,
          etc…)
        </li>
        <li>
          Le modèle de l’appareil utilisé (ex: PC, iPhone 8, iPad Pro, etc…)
        </li>
      </ul>
      <br />
      <P>L’équipe du MEPP</P>

      <ButtonsWrapper>
        <LoginLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.back();
          }}
        >
          {t('cta:back')}
        </LoginLink>
      </ButtonsWrapper>
    </>
  );
};

const HelpEn = ({ t }) => {
  return (
    <>
      <H3>HELP AND SUPPORT</H3>
      <P>Short video tutorials are available on line</P>
      <ul>
        <li>
          <a
            href="https://youtu.be/bLpt1BnjkEA"
            target="_blank"
            rel="noreferrer"
          >
            Patients
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/watch?v=Tux2tV9GvyI"
            target="_blank"
            rel="noreferrer"
          >
            Clinicians
          </a>
        </li>
      </ul>
      <br />
      <P>
        Please contact us with any technical issues with MEPP at&nbsp;
        <a href="mailto:support@mirroreffectplus.org">
          support@mirroreffectplus.org
        </a>{' '}
        with as much details as possible.
      </P>
      <br />
      <b>Please provide the following details:</b>
      <ul>
        <li>Browser or app version you use</li>
        <li>Operating system version (ex: Windows 11, macOS Ventura, etc…)</li>
        <li>The kind of device you use (ex: PC, iPhone 8, iPad Pro, etc…)</li>
      </ul>
      <br />
      <P>The MEPP team</P>

      <ButtonsWrapper>
        <LoginLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            history.back();
          }}
        >
          {t('cta:back')}
        </LoginLink>
      </ButtonsWrapper>
    </>
  );
};

const ContainerWrapper = styled(Wrapper)`
  position: relative;
  padding-top: 120px;
  padding-bottom: ${spacings.default * 2}px;

  ${media.xsOnly`
    padding-top: 0px;
  `}

  @media screen and (max-height: 850px) {
    padding-top: 0px;
  }
`;

const ContainerInner = styled.div``;

const ButtonsWrapper = styled.div`
  ${FlexAlignMiddle.CSS}
  flex-direction: column;
`;

const LoginLink = styled(Href)`
  margin: ${spacings.default * 2}px 0 0;
`;

export default HelpPage;
