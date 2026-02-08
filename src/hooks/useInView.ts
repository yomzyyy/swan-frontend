import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element scrolls into view using Intersection Observer
 * @param {object} options - Intersection Observer options
 * @returns {array} - [ref, isInView] tuple where ref is attached to the element to observe
 */
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
      }
    }, {
      threshold: 0.3, // Trigger when 30% visible
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView, options]);

  return [ref, isInView];
};
