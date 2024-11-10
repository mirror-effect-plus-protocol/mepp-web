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
import { usePermissions } from 'react-admin';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Logo from '@assets/logos/logo-inverse.svg';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, FlexDisplay } from '@styles/tools';

import LocaleSwitcher from '@components/generics/LocaleSwitcher';
import Button from '@components/generics/buttons/Button';

/**
 * Header Home with Logo, Anchors and Donate/Login navigation
 */
const HeaderHome = ({ showDonate }) => {
  return (
    <Container>
      <LeftSide />
      <RightSide showDonate={showDonate} />
    </Container>
  );
};

const LeftSide = () => {
  return (
    <LeftWrapper>
      <Logo
        width="100%"
        height="100%"
        aria-label="Mirror effect plus protocol logo"
      />
    </LeftWrapper>
  );
};

const RightSide = ({ showDonate }) => {
  const { t } = useTranslation();
  const { permissions } = usePermissions();
  const gotoAnchor = (id) => {
    var elem = document.getElementById(id);
    if (elem) window.scrollTo(elem.offsetLeft, elem.offsetTop - 150);
  };

  return (
    <RightWrapper>
      <ButtonAnchor
        label={t('cta:description')}
        onClick={() => {
          gotoAnchor('description');
        }}
      />
      <ButtonAnchor
        label={t('cta:history')}
        onClick={() => {
          gotoAnchor('history');
        }}
      />
      <ButtonLocalSwitcher>
        <LocaleSwitcher />
      </ButtonLocalSwitcher>
      <ButtonDonate
        hide={!showDonate}
        label={t('cta:donate')}
        onClick={() => {
          gotoAnchor('donate');
        }}
      />
      {permissions === 'user' ? (
        <Button.Outline
          label={t('cta:start_exercise')}
          inverse
          onClick={() => {
            window.location.href = '#/intro';
          }}
        />
      ) : (
        <Button.Outline
          label={t('cta:connexion')}
          inverse
          onClick={() => {
            window.location.href = '#/';
          }}
        />
      )}

      <ButtonLocalSwitcherIcon>
        <LocaleSwitcher iconOnly />
      </ButtonLocalSwitcherIcon>
    </RightWrapper>
  );
};

const Container = styled.header`
  ${FlexDisplay.CSS}

  box-sizing: border-box;
  padding: ${spacings.default * 2}px;
  width: 100%;
  position: relative;

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
    margin: 0 ${spacings.default / 2}px;

    &:last-child {
      margin-right: 0;
    }
    &:last-child {
      margin-left: 0;
    }

    ${media.xsOnly`
      margin: 0 ${spacings.default / 2}px;
    `}
  }
`;

const ButtonAnchor = styled(Button.Transparent)`
  && {
    margin: 0 ${spacings.default}px;
  }

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const ButtonDonate = styled(Button.Default)`
  ${({ hide }) => hide && `display: none;`};

  @media screen and (max-width: 520px) {
    display: none;
  }
`;

const ButtonLocalSwitcherIcon = styled.div`
  @media screen and (min-width: 640px) {
    display: none;
  }
`;

const ButtonLocalSwitcher = styled.div`
  margin: 0 ${spacings.default}px;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export { HeaderHome };
