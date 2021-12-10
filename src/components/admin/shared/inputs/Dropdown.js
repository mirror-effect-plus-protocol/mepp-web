import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  }
}));

const DropDown = ({label, initialValue, choices, onChange, emptyLabel}) => {
  const classes = useStyles();
  const items = choices || [];
  const addEmpty = emptyLabel ? true : false;

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={initialValue}
        onChange={onChange}
      >
        {addEmpty &&
          <MenuItem key="-1" value="">{emptyLabel}</MenuItem>
        }
        {items.map((choice) => (
            <MenuItem key={choice.id} value={choice.id}>{choice.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDown;
