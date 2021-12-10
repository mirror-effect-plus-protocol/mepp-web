let inited = false;
let debug = false;

const isProd =
  process?.env.ENVIRONMENT === 'production' ||
  process?.env.ENVIRONMENT === 'prod';

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
    process?.env.DEBUG == 'true' && setDebug(true);
  }
  !isProd && debug && console.log(...args);
};

export { log, setDebug };
