import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Détection initiale côté client pour éviter le flash
function getInitialMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(getInitialMobile);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

// Hook pour détecter si on doit réduire les animations (mobile ou préférence utilisateur)
export function useReducedMotion() {
  const isMobile = useIsMobile();
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);
    const onChange = () => setPrefersReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile || prefersReduced;
}
