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
import { useLocale, useSetLocale, useTranslate, useNotify } from 'react-admin';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';

import { LANGUAGES } from '../../../../locales';
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import { RequestEndpoint } from '../../../../utils/constants';

const LocaleSwitcher = () => {
  const t = useTranslate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const notify = useNotify();
  const setLocale = useSetLocale();

  const languages = LANGUAGES.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {t('languages.' + item)}
      </MenuItem>
    );
  });

  const handleChange = (event) => {
    const newLanguage = event.target.value;
    const url = `${process.env.REACT_APP_API_ENDPOINT}${RequestEndpoint.PROFILE}`;
    fetchJsonWithAuthToken(url, {
      method: 'PATCH',
      body: `{"language": "${newLanguage}"}`,
    })
      .then((response) => {
        notify('admin.shared.notifications.language.success', 'info');
      })
      .catch(() => {
        notify('admin.shared.notifications.language.failure', 'error');
      });

    return setLocale(newLanguage);
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      {!open && (
        <Button
          className={classes.button}
          onClick={handleOpen}
          startIcon={<LanguageIcon />}
          endIcon={<ExpandMoreIcon />}
        >
          {t('languages.' + locale)}
        </Button>
      )}
      {open && (
        <FormControl className={classes.formControl}>
          <Select
            id="locale-switcher"
            labelId="locale-switcher"
            open={open}
            value={locale}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            {languages}
          </Select>
        </FormControl>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: '#232525',
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export { LocaleSwitcher };
