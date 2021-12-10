import React, { useState } from 'react';
import {
  useLocale,
  useSetLocale,
  useTranslate,
  useNotify,
} from 'react-admin';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';

import { LANGUAGES } from '../../../../locales';
import {fetchJsonWithAuthToken} from "ra-data-django-rest-framework";
import  {RequestEndpoint } from "@utils/constants";

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
    const url = `${process.env.API_ENDPOINT}${RequestEndpoint.PROFILE}`
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
        display: 'none'
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export { LocaleSwitcher };
