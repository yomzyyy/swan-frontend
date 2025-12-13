/**
 * ScrollToTop Component
 *
 * PURPOSE:
 * Automatically scrolls the page to the top whenever the route changes.
 * This ensures users always start at the top when navigating to a new page.
 *
 * HOW IT WORKS:
 * - useLocation hook tracks the current route
 * - useEffect runs whenever the pathname changes
 * - window.scrollTo(0, 0) scrolls to the top of the page
 *
 * USAGE:
 * Place this component inside BrowserRouter but outside Routes
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get current location (route)
  const { pathname } = useLocation();

  // Run this effect whenever the pathname changes
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array: re-run when pathname changes

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
