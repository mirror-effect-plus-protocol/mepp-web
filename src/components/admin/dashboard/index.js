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
import { usePermissions } from 'react-admin';

import { useMediaQuery } from '@mui/material';

import { DashboardWidget } from './DashboardWidget';
import { Welcome } from './Welcome';

const Dashboard = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const { permissions } = usePermissions();
  const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& > div': { width: '50%' },
    },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
  };

  const HorizontalSpacer = () => <span style={{ height: '1em' }} />;

  if (['admin', 'staff'].includes(permissions)) {
    return isSmall ? (
      <div>
        <div style={styles.flexColumn}>
          <Welcome />
          <HorizontalSpacer />
          <DashboardWidget widget="daily_repeats" />
          <HorizontalSpacer />
          <DashboardWidget widget="sessions" />
        </div>
      </div>
    ) : (
      <div style={styles.flexColumn}>
        <div style={styles.singleCol}>
          <Welcome />
        </div>
        <div style={styles.flex}>
          <div style={styles.leftCol}>
            <DashboardWidget widget="daily_repeats" />
          </div>
          <div style={styles.rightCol}>
            <DashboardWidget widget="sessions" />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Dashboard;
