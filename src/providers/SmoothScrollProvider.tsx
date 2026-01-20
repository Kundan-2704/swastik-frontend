import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  // 🔹 INIT LENIS
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,

      // IMPORTANT
      smoothTouch: false,
      gestureOrientation: "vertical",
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 🔥 ROUTE CHANGE → FORCE TOP
  useEffect(() => {
    if (!lenisRef.current) return;

    // 🔒 stop inertia
    lenisRef.current.stop();

    // 🔥 instant jump (NO SMOOTH)
    lenisRef.current.scrollTo(0, {
      immediate: true,
      force: true,
    });

    // 🔓 resume smooth scroll
    requestAnimationFrame(() => {
      lenisRef.current?.start();
    });
  }, [location.pathname, location.key]);

  return <>{children}</>;
}
