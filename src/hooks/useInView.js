import { useState, useRef, useEffect } from 'react';

/**
 * Returns if element ref is in view using intersection observer
 */
export const useInView = (elementRef, options = {}, isActive = true) => {
  const observer = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node =
      typeof elementRef === 'string'
        ? document.querySelector(elementRef)
        : elementRef?.current;

    if (!isActive || !node || (inView && options.once)) return undefined;

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (!entry) return;

      const { isIntersecting } = entry;

      setInView(isIntersecting);

      if (options.once && isIntersecting && observer && observer.current) {
        observer.current.disconnect();
      }
    }, options);

    setTimeout(() => {
      if (observer && observer.current) {
        observer.current.observe(node);
      }
    }, 1);

    return () => {
      if (observer && observer.current) {
        observer.current?.disconnect();
      }
    };
  }, [elementRef, options, isActive]);

  return inView;
};
