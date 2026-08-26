import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { APP_STORE_BANNER_DISMISSED_KEY } from "@/lib/app-store";

interface AppStoreBannerContextValue {
  isVisible: boolean;
  dismiss: () => void;
  headerOffsetClass: string;
  mainPaddingClass: string;
}

const AppStoreBannerContext = createContext<AppStoreBannerContextValue | null>(null);

function readDismissed(): boolean {
  try {
    return localStorage.getItem(APP_STORE_BANNER_DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
}

export function AppStoreBannerProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(() => !readDismissed());

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(APP_STORE_BANNER_DISMISSED_KEY, "true");
    } catch {
      // ignore
    }
    setIsVisible(false);
  }, []);

  const headerOffsetClass = isVisible ? "top-10 sm:top-11" : "top-0";
  const mainPaddingClass = isVisible ? "pt-[6.5rem] sm:pt-[7rem]" : "pt-24";

  return (
    <AppStoreBannerContext.Provider
      value={{ isVisible, dismiss, headerOffsetClass, mainPaddingClass }}
    >
      {children}
    </AppStoreBannerContext.Provider>
  );
}

export function useAppStoreBanner() {
  const ctx = useContext(AppStoreBannerContext);
  if (!ctx) {
    throw new Error("useAppStoreBanner must be used within AppStoreBannerProvider");
  }
  return ctx;
}
