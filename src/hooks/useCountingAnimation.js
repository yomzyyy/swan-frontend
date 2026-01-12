import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for animating number counting from a random start value to a target
 * @param {number} target - The final number to count to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @param {boolean} shouldAnimate - Trigger to start the animation
 * @returns {number} - The current animated count value
 */
export const useCountingAnimation = (target, duration = 2000, shouldAnimate = true) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate once when shouldAnimate becomes true
    if (!shouldAnimate || hasAnimated.current) return;

    hasAnimated.current = true;
    const startValue = Math.floor(Math.random() * target);
    const startTime = Date.now();
    const easeOutQuad = (t) => t * (2 - t);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);

      const currentValue = Math.round(
        startValue + (target - startValue) * easedProgress
      );

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldAnimate, target, duration]);

  return count;
};
