import { BASE_FONT_SIZE } from '@styles/configs/fontsize';

/**
 * rem to px from BASE_FONT_SIZE
 */
const rem = (px, baseFontSize) => {
  const base = baseFontSize || BASE_FONT_SIZE;
  return `${px / base}rem`;
};

export { rem };
