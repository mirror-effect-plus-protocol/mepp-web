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

import { theme } from '@themes/index';

import { useLocale } from '@hooks/locale/useLocale';

import { Languages } from '@utils/constants';

import Button from '@components/generics/buttons/Button';
import { ButtonSideLabelTypes } from '@components/generics/buttons/Button';

const LocaleSwitcher = ({ iconOnly }) => {
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

  const onChange = (language) => {
    setLocale(language);
    onClose();
  };

  return (
    <>
      <Button.Transparent
        label={iconOnly ? '' : t('languages:' + locale)}
        icon={<IconStyledEarth width="100%" height="100%" />}
        secondaryIcon={
          !iconOnly && <IconStyledDropArrow width="100%" height="100%" />
        }
        sideLabelType={ButtonSideLabelTypes.LEFT}
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
              color: theme.colors.white,
              opacity: 1,
            },
          },
        }}
      >
        {Languages.map((language) => (
          <MenuItem
            key={language}
            disabled={language === locale}
            onClick={() => onChange(language)}
          >
            {t('languages:' + language)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

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
    body.light & {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default LocaleSwitcher;
