import React from 'react';

const useIntersectionObserver = <T extends Element>(
  ref: React.MutableRefObject<T | null>,
  options?: IntersectionObserverInit,
): boolean => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!!entry?.isIntersecting);
    }, options);

    const currentElement = ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, options]);

  return isVisible;
};

export default useIntersectionObserver;
