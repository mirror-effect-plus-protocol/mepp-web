import {Card as MuiCard, withStyles} from "@material-ui/core";

export const ASide = withStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      order: -1, // display on the left rather than on the right of the list
      minWidth: '15em',
      width: '15em',
      marginRight: '1em',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    '& ul .MuiListItem-root': {
      paddingLeft: theme.spacing(1)
    },
    '& .MuiBox-root': {
      color: '#939DAB'
    },
    '& .MuiList-root': {
      paddingBottom: theme.spacing(2),
      borderBottom: 'solid 1px #DDDDDD',
      '&:last-child': {
        borderBottom: 'none'
      }
    }
  }
}))(MuiCard);
