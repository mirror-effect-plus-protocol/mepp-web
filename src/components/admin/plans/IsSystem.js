import React, { useState} from 'react';
import {
  BooleanInput,
  useTranslate,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(2),
      width: 'calc(2*256px + 1em)' /* category + subcategory dropdown + spacing */
    },
  };
});

const IsSystemInput = (props) => {

  const classes = useStyles();
  const t = useTranslate();
  const [showAlert, setShowAlert] = useState(props.record.is_system);
  const handleChange = (newValue) => {
    setShowAlert(newValue);
  };

  return (
    <>
      <BooleanInput
        basePath={props.basePath}
        resource={props.resource}
        record={props.record}
        source="is_system"
        onChange={handleChange}
      />
      {showAlert &&
        <Alert classes={classes} variant="outlined" severity="warning">
          {t('resources.plans.card.labels.is_system_warning')}
        </Alert>
      }
    </>
  )
};

export default IsSystemInput;
