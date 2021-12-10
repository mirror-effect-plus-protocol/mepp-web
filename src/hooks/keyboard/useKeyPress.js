import { useEffect, useState } from 'react';

/** HOOK TO GET KEY PRESS DOWN/UP
 * @exemple
 * const isPressKeyV = useKeyPress("v");
 * const isPressKeyEsc = useKeyPress(Keys.ESC);
 * const isPressKeySpace = useKeyPress(Keys.SPACE);
 */
const useKeyPress = (keyValue) => {
  const [isKeyPress, setKeyPress] = useState(false);

  /* keydown event */
  useEffect(() => {
    const onDown = ({ key, code }) => {
      if (key === keyValue || keyValue === code) setKeyPress(true);
    };

    document.addEventListener('keydown', onDown);
    return () => document.removeEventListener('keydown', onDown);
  }, [keyValue]);

  /* keydown event */
  useEffect(() => {
    const onUp = ({ key, code }) => {
      if (key === keyValue || keyValue === code) setKeyPress(false);
    };

    document.addEventListener('keyup', onUp);
    return () => document.removeEventListener('keyup', onUp);
  }, [keyValue]);

  return isKeyPress;
};

/**
 * KEYS TYPE DICT
 */
const Keys = {
  ESC: 'Escape',
  SPACE: 'Space',
  TAB: 'Tab',
};

export { useKeyPress, Keys };
