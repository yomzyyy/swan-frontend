import { useState, useEffect, useRef } from 'react';

export const useCountingAnimation = (target: number, duration = 2000, shouldAnimate = true): number => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate once when shouldAnimate becomes true
    if (!shouldAnimate || hasAnimated.current) return;

    hasAnimated.current = true;
    const startValue = Math.floor(Math.random() * target);
    const startTime = Date.now();
    const easeOutQuad = (t: number) => t * (2 - t);

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
