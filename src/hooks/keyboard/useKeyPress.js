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
