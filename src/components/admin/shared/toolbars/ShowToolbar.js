import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import BackButton from '../buttons/BackButton';

const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(4),
    },
  };
});

const ShowToolBar = (props) => {
  const {
    patientUid = false,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      <BackButton patientUid={patientUid} basePath={rest.basePath} />
    </div>
  );
};

export default ShowToolBar;
