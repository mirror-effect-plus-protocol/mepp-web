import {makeStyles} from "@material-ui/core/styles";


export const useSimpleFormIteratorStyles = makeStyles((theme) => ({
  root: {
    '& li > div:first-child': {
      display: 'none'
    }
  },
  form: {
    display: 'flex',
    justifyContent: 'start',
    gap: '1em'
  },
  action: {
    '& .button-remove': {
      'marginLeft': '1em',
      'marginTop': '10px',
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
      minWidth: '95px',
      width: '95px'
    },
  }
}));

export const useTranslatorInputStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(2*256px + 1em)' /* category + subcategory dropdown + spacing */
  }
}));

export const useCategoryChipsStyles = makeStyles((theme) => {
  return {
    root: {
      width: 'calc(2*256px + 1em)',
      display: 'flex',
      justifyContent: 'start',
      marginBottom: theme.spacing(2),
      '& div': {
        width: '200px',
        '&:first-child': {
          marginRight: theme.spacing(2),
        }
      }
    }
  };
});
