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
    RaBulkActionsToolbar: {
      topToolbar: {
        paddingTop: '10px',
      },
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
