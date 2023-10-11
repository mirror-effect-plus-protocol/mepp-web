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
} from 'react-admin';
import { Card, CardContent } from '@mui/material';
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
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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
    },
    widgetTooltipInner: {
      '& > p:first-child': { fontWeight: 'bold', fontSize: '0.9em' },
      '& > p:not(:first-child)': { padding: 0, fontSize: '0.8em' }
    }
  };
});

const widgetTooptipWrapperStyle = {
  backgroundColor: '#FFF',
  border: 'solid 2px #078EE4',
  padding: '0 10px',
  fontFamily: 'Inter',
  outlineColor: null,
  outlineWidth: 0,
};


export const DashboardWidget = ({widget}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [weekRange, setWeekRange] = useState('one_week');
  const [widgetHeight, setWidgetHeight] = useState(400);
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
    const data = response.json;
    setData(data);
    setLoading(false);
    setWidgetHeight(Math.max(data.length * 40, 400));
  };
  const handleChange = (event) => {
    setWeekRange(event.target.value);
  };
  useEffect(() => {
    fetchData();
  }, [weekRange]);

  const CustomTooltip = ({widget, active, payload}) => {
    if (active) {
      return (
        <div className={classes.widgetTooltipInner}>
          <p>{payload[0].payload.full_name}</p>
          <p>{`${payload[0].name} : ${payload[0].value}`}
          {widget === 'sessions' &&
            <span><br />{`${payload[1].name} : ${payload[1].value}`}</span>
          }
          </p>
        </div>
      );
    }
    return null;
  };

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
        <div style={{ width: '100%', height: widgetHeight }}>
          {loading && <Spinner />}
          {!loading &&
            <ResponsiveContainer width="99%" height={widgetHeight}>
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
                  dataKey="y_axis"
                  style={{ fontFamily: 'Inter' }}
                  width={100}
                />
                <Tooltip
                  isAnimationActive={false}
                  wrapperStyle={widgetTooptipWrapperStyle}
                  contentStyle={{backgroundColor: 'green'}}
                  itemStyle={{backgroundColor: 'purple'}}
                  content={<CustomTooltip widget={widget} />}
                />
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
                {widget === 'sessions' &&
                  <Legend
                    wrapperStyle={{ fontFamily: 'Inter', fontSize: '0.8em'}}
                  />
                }

              </BarChart>
            </ResponsiveContainer>
          }
        </div>
      </CardContent>
    </Card>
  )
};
