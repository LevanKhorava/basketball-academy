import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll on route change (in-page anchor scrolling is unaffected). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
