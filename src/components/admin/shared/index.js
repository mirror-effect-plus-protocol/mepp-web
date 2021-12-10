import React, { forwardRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Layout,
  UserMenu,
  MenuItemLink,
  useTranslate,
  useGetIdentity
} from 'react-admin';
import { Box } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { LocaleSwitcher } from './buttons/LocaleSwitcher';
import { Logo } from '@components/admin/shared/icons/Logo';
import  { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  'mepp-layout': {
    '& main': {
      [theme.breakpoints.up('xs')]: {
        marginTop: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(5),
      },
    },
    '& header': {
      backgroundColor: '#fff',
      color: '#232525'
    }
  },
}));

const MeppAdminAppBar = (props) => {
  return (
    <AppBar
        {...props}
        elevation={1}
        userMenu={<CustomUserMenu />}
      >
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
  const { identity, loaded: identityLoaded } = useGetIdentity();
  if (!identityLoaded || !identity) return <></>;

  return (
    <UserMenu {...props}>
      <SettingsMenu identityUid={identity.uid}/>
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
