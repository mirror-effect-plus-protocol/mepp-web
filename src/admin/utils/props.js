

const sanitizeRestProps = (props, subsetProps, remove) => {
  const sanitizedProps = {...props};

  if (remove) {
    subsetProps.forEach(prop => {
      if (sanitizedProps.hasOwnProperty(prop)) {
        delete sanitizedProps[prop];
      }
    });
  } else {
    Object.keys(props).forEach(prop => {
      if (!subsetProps.includes(prop)) {
        delete sanitizedProps[prop];
      }
    });
  }

  return sanitizedProps;
};

export { sanitizeRestProps };
