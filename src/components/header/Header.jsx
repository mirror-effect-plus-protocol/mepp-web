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

import i18n from 'i18next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSetLocale, useLogout } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { temporaryProfil } from '@admin/authProvider';

import IconEarth from '@assets/icons/earth.svg';
import IconSettings from '@assets/icons/settings.svg';
import Logo from '@assets/logos/logo.svg';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, FlexDisplay } from '@styles/tools';

import { useLocale } from '@hooks/locale/useLocale';

import { Language } from '@utils/constants';

import {
  ExerciseStep,
  ExerciseContext,
} from '@components/exercises/ExerciseProvider';
import Button from '@components/generics/buttons/Button';
import { ButtonSideLabelTypes } from '@components/generics/buttons/Button';
import { OverlayContext } from '@components/overlays/OverlayProvider';
import { SettingsOverlay } from '@components/overlays/SettingsOverlay';

/**
 * Header with Logo and login navigation
 */
const Header = ({ isLogged }) => {
  return (
    <Container>
      <LeftSide />
      {!isLogged ? (
        <RightSideWithoutLogout />
      ) : !temporaryProfil ? (
        <RightSideWithLogout />
      ) : (
        <></>
      )}
    </Container>
  );
};

const LeftSide = () => {
  return (
    <LeftWrapper>
      <a href="/" tabIndex="-1">
        <Logo
          width="100%"
          height="100%"
          aria-label="Mirror effect plus protocol logo"
        />
      </a>
    </LeftWrapper>
  );
};

const RightSideWithoutLogout = () => {
  const locale = useSetLocale();
  const { setLocale } = useLocale();

  const switchLanguage = useCallback(() => {
    const lang = i18n.language == Language.FR ? Language.EN : Language.FR;
    locale(lang);
    setLocale(lang);
  }, [locale, i18n.language]);

  return (
    <RightWrapper>
      <Button.Transparent
        label={i18n.language == Language.FR ? 'English ' : 'Français'}
        icon={<IconEarth width="100%" height="100%" />}
        sideLabelType={ButtonSideLabelTypes.LEFT}
        onClick={switchLanguage}
      />
    </RightWrapper>
  );
};

const RightSideWithLogout = () => {
  const { t } = useTranslation();
  const logout = useLogout();
  const { content, open, close } = useContext(OverlayContext);
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const { pause, logs, exerciseStep } = useContext(ExerciseContext);

  // watch overlay close to deactivate settings click state
  useEffect(() => {
    if (!content) setIsSettingsActive(false);
  }, [content]);

  // setting click handler
  const handleSettingsClick = useCallback(() => {
    // if exercises page and it is running, pause current exercise
    if (
      exerciseStep !== ExerciseStep.ENDED &&
      exerciseStep !== ExerciseStep.EMPTY &&
      exerciseStep !== ExerciseStep.COMPLETED &&
      pause
    ) {
      pause();
    }
    isSettingsActive ? close() : open(<SettingsOverlay />);
    setIsSettingsActive(!isSettingsActive);
  }, [exerciseStep, isSettingsActive]);

  // logout click handler
  const handleLogoutClick = () => {
    if (logs) {
      logs('LOGOUT');
      // timeout to prevent logs request cancel
      // logs will be canceled if taken more than .5s
      setTimeout(() => {
        logout(true);
      }, 500);
    } else logout(true);
  };

  return (
    <RightWrapper>
      <Button.Transparent
        aria-label={t('a11y:settings')}
        icon={<IconSettings width="100%" height="100%" />}
        selected={isSettingsActive}
        onClick={handleSettingsClick}
      />
      <Button.Outline label={t('cta:logout')} onClick={handleLogoutClick} />
    </RightWrapper>
  );
};

const Container = styled.header`
  ${FlexDisplay.CSS}
  box-sizing: border-box;
  padding: ${spacings.default * 2}px;
  width: 100%;

  ${media.xsOnly`
    padding: ${spacings.default}px;
  `}
`;

const LeftWrapper = styled.div`
  width: 185px;
  height: 55px;

  ${media.xsOnly`
    width: 126px;
  `}
`;

const RightWrapper = styled(FlexAlignMiddle.Component)`
  margin-left: auto;

  button {
    &:first-child:not(:last-child) {
      margin: 0 ${spacings.default}px;
    }
  }
`;

export { Header };
