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
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconDropArrow from '@assets/icons/drop-arrow.svg';
import IconEarth from '@assets/icons/earth.svg';
import Logo from '@assets/logos/logo-inverse.svg';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, FlexDisplay } from '@styles/tools';

import { theme } from '@themes/index';

import { useLocale } from '@hooks/locale/useLocale';

import { Languages } from '@utils/constants';

import Button from '@components/generics/buttons/Button';
import { ButtonSideLabelTypes } from '@components/generics/buttons/Button';

/**
 * Header with Logo and login navigation
 */
const HeaderHome = () => {
  return (
    <Container>
      <LeftSide />
      <RightSide />
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

const RightSide = () => {
  const { t } = useTranslation();

  return (
    <RightWrapper>
      <LocaleSwitcher />

      <Button.Default label={t('cta:donate')} onClick={() => {}} />
      <Button.Outline
        label={t('cta:connexion')}
        inverse
        onClick={() => {
          window.location.href = '#/login';
        }}
      />
    </RightWrapper>
  );
};

const LocaleSwitcher = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();

  const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const onChange = (event, language) => {
    setLocale(language);
    onClose();
  };

  return (
    <>
      <Button.Transparent
        label={t('languages:' + locale)}
        icon={<IconStyledEarth width="100%" height="100%" />}
        secondaryIcon={<IconStyledDropArrow width="100%" height="100%" />}
        sideLabelType={ButtonSideLabelTypes.LEFT}
        inverse
        onClick={onOpen}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          sx: {
            '&& .Mui-disabled': {
              backgroundColor: theme.colors.primary,
              color: '#fff',
              opacity: 1,
            },
          },
        }}
      >
        {Languages.map((language) => (
          <MenuItem
            key={language}
            disabled={language === locale}
            onClick={(event) => onChange(event, language)}
          >
            {t('languages:' + language)}
          </MenuItem>
        ))}
      </Menu>
    </>
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
    margin: 0 ${spacings.default}px;
    &:first-child,
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

const IconStyledDropArrow = styled(IconDropArrow)`
  && {
    width: 12px;
    height: 12px;
    margin-top: 5px;
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const IconStyledEarth = styled(IconEarth)`
  && {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

export { HeaderHome };
