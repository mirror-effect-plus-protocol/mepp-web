/**
 * get a random string
 * @return string
 */
const randomString = () => {
  return Math.random().toString(36).substring(2);
};

export { randomString };
