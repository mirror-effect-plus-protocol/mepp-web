import { defaultTheme } from 'react-admin';
import merge from 'lodash/merge';

const lightBlue = '#33a4e4';
const blue = '#078EE4';
const darkBlue = '#00639b';
const grayIcon = '#AEB4BA';
const lighterGray = '#E8E8E8';
const lightGray = '#a8b0bb';
const gray = '#939DAB';
const black = '#232525';

export const MeppTheme = merge({}, defaultTheme, {
  palette: {
    primary: {
      light: lightBlue,
      main: blue,
      dark: darkBlue,
      contrastText: '#fff',
    },
    secondary: {
      light: lightGray,
      main: gray,
      dark: '#666d77',
      contrastText: '#fff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h6: {
      fontWeight: 'bold'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        borderRadius: '35px',
      },
      text: {
        paddingLeft: '20px',
        paddingRight: '20px',
      },
      label: {
        padding: '5px',
      }
    },
    MuiPaper: {
      rounded: {
        borderRadius: '8px'
      }
    },
    MuiTableHead: {
      root: {
        '& th': {
          height: '40px',
          '&:first-child': {
            borderTopLeftRadius: '8px'
          },
          '&:last-child': {
            borderTopRightRadius: '8px'
          }
        }
      }
    },
    MuiTableCell: {
      root: {
        height: '30px'
      }
    },
    RaMenuItemLink: {
      active: {
        color: blue,
        '& svg': {
          color: blue
        }
      },
      root: {
        color: black,
        '& svg': {
          color: grayIcon
        }
      }
    },
    RaTranslatableFields: {
      root: {
        '& button': {
          minWidth: '48px',
          width: '48px'
        },
        '& div[role="tablist"]': {
          backgroundColor: lighterGray
        }
      }
    },
    RaTranslatableInputs: {
      root: {
        '& div[role="tablist"]': {
          backgroundColor: lighterGray,
          height: '48px'
        }
      }
    },
    MuiDialogActions: {
      root: {
        '& button': {
          backgroundColor: '#a8b0bb',
          padding: '4px 10px',
          fontSize: '0.8125rem',
          '&:hover': {
            backgroundColor: gray,
          },
          '&.ra-confirm, &.MuiButton-containedPrimary': {
            color: '#fff',
            backgroundColor: lightBlue
          },
          '&.ra-confirm:hover, &.MuiButton-containedPrimary:hover': {
            backgroundColor: blue,
          }
        }
      }
    },
    RaPaginationActions: {
      actions: {
        '& button': {
          minWidth: 0
        }
      },
      currentPageButton: {
        color : black
      }
    }
  }
});
