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

let inited = false;
let debug = false;

const isProd =
  process.env.REACT_APP_ENVIRONMENT === 'production' ||
  process.env.REACT_APP_ENVIRONMENT === 'prod';

/**
 * set debug state
 * @return boolean
 */
const setDebug = (state) => {
  debug = state;
  inited = true;
  return debug;
};

/**
 * console log according to debug state (from env var)
 */
const log = (...args) => {
  if (inited === false) {
    process.env.REACT_APP_DEBUG === 'true' && setDebug(true);
    setDebug(true);
  }
  !isProd && debug && console.log(...args);
};

export { log, setDebug };
