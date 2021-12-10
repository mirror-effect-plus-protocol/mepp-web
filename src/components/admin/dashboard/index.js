import React from 'react';
import { usePermissions } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

import { DashboardWidget } from './DashboardWidget';
import { Welcome } from './Welcome';

const Dashboard = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  // We cannot use `props.permissions` since it does not seem to be refreshed
  // until the <Admin> component has been unmount
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
