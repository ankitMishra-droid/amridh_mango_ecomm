import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to top whenever the route changes.
 * Should be rendered inside Router (e.g. in App).
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // use a small timeout to ensure DOM has rendered if necessary
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search, hash]);

  return null;
}
