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

import React, { useEffect, useState } from 'react';
import {
  useTranslate,
  useVersion,
} from 'react-admin';
import { Card, CardContent } from '@material-ui/core';
import { Typography } from '@components/admin/shared/dom/sanitize';
import { fetchJsonWithAuthToken } from 'ra-data-django-rest-framework';
import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import Spinner from "@components/admin/shared/Spinner";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => {
  return {
    formControl: {
      margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    widget: {
      '& header': {
        paddingLeft: '15px',
          '& > span': {
          fontFamily: theme.typography.fontFamily
        },
        '& > div': {
          display: 'inline-flex',
            marginTop: '-30px'
        }
      }
    }
  };
});

export const DashboardWidget = ({widget}) => {
  const t = useTranslate();
  const version = useVersion();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [weekRange, setWeekRange] = useState('one_week');
  const fetchData = async () => {
    setLoading(true);
    const options = {
      ordering: 'full_name',
      archived: false,
      week_range: weekRange,
    };
    const qs = new URLSearchParams(options).toString();
    const url = `${process.env.API_ENDPOINT}/patients/widgets/${widget}/?${qs}`;
    const response = await fetchJsonWithAuthToken(url, {});
    setData(response.json);
    setLoading(false);
  };
  const handleChange = (event) => {
    setWeekRange(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, [version, weekRange]);

  return (
    <Card className={classes.widget}>
      <header>
        <Typography variant="h6" gutterTop={true} gutterBottom>
          {t(`admin.dashboard.widgets.${widget}.card_header`)}
        </Typography>
        <span>{t(`admin.dashboard.widgets.labels.since`)}</span>
        <div>
          <FormControl variant="filled" className={classes.formControl}>
            <NativeSelect
              value={weekRange}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              <option value="one_week">
                {t('admin.dashboard.widgets.choices.one_week')}
              </option>
              <option value="two_weeks">
                {t('admin.dashboard.widgets.choices.two_weeks')}
              </option>
              <option value="one_month">
                {t('admin.dashboard.widgets.choices.one_month')}
              </option>
              <option value="all">
                {t('admin.dashboard.widgets.choices.all')}
              </option>
            </NativeSelect>
          </FormControl>
        </div>
      </header>

      <CardContent>
        <div style={{ width: '100%', height: 400 }}>
          {loading && <Spinner />}
          {!loading &&
            <ResponsiveContainer width="99%" height={400}>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <XAxis
                  type="number"
                  domain={[0, dataMax => (dataMax >= 4 ? dataMax : 4)]}
                  style={{ fontFamily: 'Inter' }}
                />
                <YAxis
                  type="category"
                  dataKey="full_name"
                  style={{ fontFamily: 'Inter' }}
                />
                {widget === 'sessions' && <Tooltip />}
                <Bar
                  name={t('admin.dashboard.widgets.labels.completed')}
                  dataKey="completed"
                  fill="#078EE4"
                />
                {widget === 'sessions' &&
                  <Bar
                    name={t('admin.dashboard.widgets.labels.uncompleted')}
                    dataKey="uncompleted"
                    fill="#939DAB"
                  />
                }
                {widget === 'sessions' && <Legend style={{ fontFamily: 'Inter' }}/> }

              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </CardContent>
    </Card>
  )
};
