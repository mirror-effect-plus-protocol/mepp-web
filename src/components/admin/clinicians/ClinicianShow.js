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
import { Typography } from '@components/admin/shared/dom/sanitize';
import { makeStyles } from '@mui/styles';
import { BoxedShowLayout, RaBox } from 'ra-compact-ui';
import {
  BooleanField,
  Show,
  TextField,
  EmailField,
  FunctionField,
  useTranslate,
} from 'react-admin';

import ShowToolBar from '@components/admin/shared/toolbars/ShowToolbar';
import TopToolbar from '@components/admin/shared/toolbars/TopToolbar';

const useRaBoxStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  leftColumn: {
    flexDirection: 'column',
    flex: '0 0 60%',
    flexGrow: '3',
    justifyContent: 'center',
    marginBottom: '10px',
    paddingRight: '10px',
    borderRight: 'solid thin',
    marginRight: '10px',
  },
  rightColumn: {
    flex: '0 0 40%',
    flexDirection: 'column',
    flexGrow: '1',
  },
  columnChild: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '10px',
    '& .innerChild': {
      paddingLeft: 0,
    },
  },
  innerChild: {
    width: '50%',
  },
}));

export const ClinicianShow = (props) => {
  const t = useTranslate();
  const classes = useRaBoxStyles();

  return (
    <Show
      actions={<TopToolbar/>}
      {...props}
    >
      <BoxedShowLayout>
        <Typography variant="h6" gutterBottom>
          {t('admin.shared.labels.card.identity')}
        </Typography>
        <RaBox>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <TextField source="first_name" />
              <EmailField source="email" />
            </RaBox>
            <RaBox className={classes.innerChild}>
              <TextField source="last_name" />
            </RaBox>
          </RaBox>
        </RaBox>
        <Typography variant="h6" gutterBottom gutterTop={true}>
          {t('admin.shared.labels.card.informations')}
        </Typography>
        <RaBox>
          <RaBox className={classes.columnChild}>
            <RaBox className={classes.innerChild}>
              <FunctionField
                label={t('resources.clinicians.fields.language')}
                render={(record) => t(`languages.${record.language}`)}
              />
            </RaBox>
            <RaBox className={classes.innerChild}>
              <BooleanField source="is_superuser" />
            </RaBox>
          </RaBox>
        </RaBox>

        <ShowToolBar
          basePath="/clinicians"
        />
      </BoxedShowLayout>
    </Show>
  );
};
