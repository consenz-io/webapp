import { useEffect, useState } from "react";
import { IWindowWidth } from "./types";

const useResponsive = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowWidth, setWindowWidth] = useState<IWindowWidth>({ width: undefined });
  const { width } = windowWidth;

  useEffect(() => {
    function handleResize() {
      setWindowWidth({
		  width: window.innerWidth,
	  });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile: !!(width === undefined ? 0 : width < 1024) };
};

export default useResponsive;
