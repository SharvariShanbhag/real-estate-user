// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to the top of the window on route change
    window.scrollTo(0, 0);
  }, [pathname]); // Rerun this effect whenever the pathname changes

  return null; // This component doesn't render anything itself
}

export default ScrollToTop;