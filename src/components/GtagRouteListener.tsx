import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gtagSetPage, isGtagEnabled } from "@/lib/gtag";

/** Envoie une page vue GA4 à chaque changement de route (hors chargement initial). */
export function GtagRouteListener() {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (!isGtagEnabled()) return;
    const path = `${location.pathname}${location.search}`;
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    gtagSetPage(path);
  }, [location.pathname, location.search]);

  return null;
}
