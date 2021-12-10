import {makeStyles} from "@material-ui/core/styles";

export const useAutocompleteStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  }
}));

export const useSimpleFormIteratorStyles = makeStyles((theme) => ({
  root: {
    '& > p.Mui-error' : {
      display: 'none'
    }
  },
  index: {
    display: 'none'
  },
  form: {
    display: 'flex',
    justifyContent: 'start',
    gap: '1em',
    '& > div:first-child' : {
      width: 488
    }
  },
  action: {
    '& .button-remove': {
      'marginLeft': '1em',
      'marginTop': 10,
    }
  },
  line: {
    borderBottom: 'none'
  }
}));

export const useNumberStyles = makeStyles((theme) => ({
  numbers: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '1em',
    '& > div': {
      minWidth: 95,
      width: 95
    },
  }
}));

export const useTranslatorInputStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(2*256px + 1em)' /* category + subcategory dropdown + spacing */
  }
}));
