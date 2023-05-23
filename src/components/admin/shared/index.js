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
import React, { forwardRef } from 'react';
import {
  AppBar,
  Layout,
  Logout,
  UserMenu,
  useUserMenu,
  MenuItemLink,
  useTranslate,
  useGetIdentity,
} from 'react-admin';
import { useLocation } from 'react-router-dom';

import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Logo } from '@components/admin/shared/icons/Logo';

import { LocaleSwitcher } from './buttons/LocaleSwitcher';

const useStyles = makeStyles((theme) => ({
  'mepp-layout': {
    '& main': {
      [theme.breakpoints.up('xs')]: {
        marginTop: theme.spacing(4),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(5),
      },
    },
    '& header': {
      backgroundColor: '#fff',
      color: '#232525',
    },
  },
}));

const MeppAdminAppBar = (props) => {
  return (
    <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
      <Box flex="1">
        <Logo />
      </Box>
      <LocaleSwitcher />
    </AppBar>
  );
};

const SettingsMenu = forwardRef((props, ref) => {
  const t = useTranslate();
  const location = useLocation();
  const backUrl = encodeURIComponent(`${location.pathname}${location.search}`);
  const profileUrl = `/clinicians/${props.identityUid}?back=${backUrl}`;
  return (
    <MenuItemLink
      ref={ref}
      to={profileUrl}
      primaryText={t('admin.shared.labels.profile')}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
      sidebarIsOpen
    />
  );
});

const CustomUserMenu = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading || !identity) return <></>;

  return (
    <UserMenu {...props}>
      <SettingsMenu identityUid={identity.uid} />
      <Logout />
    </UserMenu>
  );
};

export const MeppAdminLayout = (props) => {
  const meppLayoutClasses = useStyles();
  return (
    <Layout
      appBar={MeppAdminAppBar}
      className={meppLayoutClasses['mepp-layout']}
      {...props}
    />
  );
};
