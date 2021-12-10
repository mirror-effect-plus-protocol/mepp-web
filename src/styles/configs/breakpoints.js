import { css } from 'styled-components';

/**
 * Breakpoint types
 */
const BREAKPOINTS_DICT = {
  XXS: 'XXS',
  XS: 'XS',
  SM: 'SM',
  MD: 'MD',
  LG: 'LG',
  XL: 'XL',
};

/**
 * Breakpoints set configuration
 */
const BREAKPOINTS = {
  [BREAKPOINTS_DICT.XXS]: {
    min: 0,
    max: 640,
  },
  [BREAKPOINTS_DICT.XS]: {
    min: 641,
    max: 919,
  },
  [BREAKPOINTS_DICT.XS]: {
    min: 0,
    max: 919,
  },
  [BREAKPOINTS_DICT.SM]: {
    min: 920,
    max: 1023,
  },
  [BREAKPOINTS_DICT.MD]: {
    min: 1024,
    max: 1239,
  },
  [BREAKPOINTS_DICT.LG]: {
    min: 1240,
    max: 1365,
  },
  [BREAKPOINTS_DICT.XL]: {
    min: 1366,
    max: 99999,
  },
};

/**
 * MediaQueries types
 */
const MEDIAS_DICT = {
  xxsOnly: 'xxsOnly',
  xsOnly: 'xsOnly',
  xsToSm: 'xsToSm',
  xsToMd: 'xsToMd',
  sm: 'sm',
  smOnly: 'smOnly',
  smToMd: 'smToMd',
  md: 'md',
  mdOnly: 'mdOnly',
  lg: 'lg',
  lgOnly: 'lgOnly',
  xl: 'xl',
  xlOnly: 'xlOnly',
};

/**
 * MediaQueries definitions
 */
const MEDIAS_QUERIES = {
  xxsOnly: `(min-width: ${BREAKPOINTS.XXS.min}px) and (max-width: ${BREAKPOINTS.XXS.max}px)`,
  xsOnly: `(min-width: ${BREAKPOINTS.XS.min}px) and (max-width: ${BREAKPOINTS.XS.max}px)`,
  xsToSm: `(min-width: ${BREAKPOINTS.XS.min}px) and (max-width: ${BREAKPOINTS.SM.max}px)`,
  xsToMd: `(min-width: ${BREAKPOINTS.XS.min}px) and (max-width: ${BREAKPOINTS.MD.max}px)`,
  sm: `(min-width: ${BREAKPOINTS.SM.min}px)`,
  smOnly: `(min-width: ${BREAKPOINTS.SM.min}px) and (max-width: ${BREAKPOINTS.SM.max}px)`,
  smToMd: `(min-width: ${BREAKPOINTS.SM.min}px) and (max-width: ${BREAKPOINTS.MD.max}px)`,
  md: `(min-width: ${BREAKPOINTS.MD.min}px)`,
  mdOnly: `(min-width: ${BREAKPOINTS.MD.min}px) and (max-width: ${BREAKPOINTS.MD.max}px)`,
  lg: `(min-width: ${BREAKPOINTS.LG.min}px)`,
  lgOnly: `(min-width: ${BREAKPOINTS.LG.min}px) and (max-width: ${BREAKPOINTS.LG.max}px)`,
  xl: `(min-width: ${BREAKPOINTS.XL.min}px)`,
  xlOnly: `(min-width: ${BREAKPOINTS.XL.min}px) and (max-width: ${BREAKPOINTS.XL.max}px)`,
};

const queryString = (query) => `@media screen and ${query}`;

/**
 * Media Query Selector
 *
 * @breakpoint
 * xsOnly, xsToSm, xsToMd, sm, smOnly, smToMd, md, mdOnly, lg, lgOnly, xl, xlOnly, xxl, print
 *
 * @exemple
 * ${media.breakpoint` ...cssRules `}
 * ${media.lg`
 *    [CSS]
 * `}
 *
 * @return the css rules within the mediaQuery selected.
 */
const media = {
  xxsOnly: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.xxsOnly])} {
      ${css(strings, ...rules)}
    }
  `,
  xsOnly: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.xsOnly])} {
      ${css(strings, ...rules)}
    }
  `,
  xsToSm: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.xsToSm])} {
      ${css(strings, ...rules)}
    }
  `,
  xsToMd: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.xsToMd])} {
      ${css(strings, ...rules)}
    }
  `,
  sm: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.sm])} {
      ${css(strings, ...rules)}
    }
  `,
  smOnly: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.smOnly])} {
      ${css(strings, ...rules)}
    }
  `,
  smToMd: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.smToMd])} {
      ${css(strings, ...rules)}
    }
  `,
  md: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.md])} {
      ${css(strings, ...rules)}
    }
  `,
  mdOnly: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.mdOnly])} {
      ${css(strings, ...rules)}
    }
  `,
  lg: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.lg])} {
      ${css(strings, ...rules)}
    }
  `,
  lgOnly: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.lgOnly])} {
      ${css(strings, ...rules)}
    }
  `,
  xl: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.xl])} {
      ${css(strings, ...rules)}
    }
  `,
  xlOnly: (strings, ...rules) => css`
    ${queryString(MEDIAS_QUERIES[MEDIAS_DICT.xlOnly])} {
      ${css(strings, ...rules)}
    }
  `,
};

export { media, MEDIAS_DICT };
