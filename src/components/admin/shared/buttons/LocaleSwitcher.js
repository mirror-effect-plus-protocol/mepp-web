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
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import React, { useState } from 'react';
import { useLocale, useSetLocale, useTranslate, useNotify } from 'react-admin';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';

import { RequestEndpoint } from '@utils/constants';

import { LANGUAGES } from '../../../../locales';

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
    const url = `${process.env.API_ENDPOINT}${RequestEndpoint.PROFILE}`;
    fetchJsonWithAuthToken(url, {
      method: 'PATCH',
      body: `{"language": "${newLanguage}"}`,
    })
      .then((response) => {
        notify('admin.shared.notifications.language.success', { type: 'info' });
      })
      .catch(() => {
        notify('admin.shared.notifications.language.failure', {
          type: 'error',
        });
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export { LocaleSwitcher };
