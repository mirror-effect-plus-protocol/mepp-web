const SPACING_BASE = 6;
const SPACING_DEFAULT = SPACING_BASE * 4;

/**
 * Spacings definitons in units
 *
 * @exemple
 * styled.li`
 *    margin-bottom: ${spacings.default / 3}px;
 * `;
 *
 */
const spacings = {
  default: SPACING_DEFAULT,
  xs: SPACING_BASE,
  sm: SPACING_BASE * 2,
  md: SPACING_DEFAULT,
  lg: SPACING_BASE * 5,
  xl: SPACING_BASE * 6,
  xxl: SPACING_BASE * 7,
};

export { spacings };
