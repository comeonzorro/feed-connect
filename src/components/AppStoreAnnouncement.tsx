import { X, Sparkles } from "lucide-react";
import { APP_STORE_URL } from "@/lib/app-store";
import { useAppStoreBanner } from "@/context/AppStoreBannerContext";
import { useReducedMotion } from "@/hooks/use-mobile";

const AppStoreAnnouncement = () => {
  const { isVisible, dismiss } = useAppStoreBanner();
  const reduceMotion = useReducedMotion();

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-10 sm:h-11 overflow-hidden"
      role="region"
      aria-label="Annonce — application FeedMe disponible sur l'App Store"
    >
      <div className="absolute inset-0 bg-gradient-nature" />
      {!reduceMotion && (
        <div className="absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}

      <div className="relative h-full container mx-auto px-3 sm:px-4 flex items-center justify-center gap-2 sm:gap-3">
        <Sparkles
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground shrink-0 ${reduceMotion ? "" : "animate-pulse-soft"}`}
          aria-hidden
        />

        <p className="text-xs sm:text-sm text-primary-foreground font-medium text-center leading-tight">
          <span
            className={`inline-flex items-center rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide mr-1.5 sm:mr-2 ${reduceMotion ? "" : "animate-pulse-soft"}`}
          >
            Nouveau
          </span>
          L&apos;app FeedMe est sur l&apos;App Store
          <span className="hidden sm:inline"> — 100&nbsp;% gratuite</span>
          <span className="sm:hidden"> · Gratuite</span>
        </p>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center rounded-full bg-white/95 text-primary px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold hover:bg-white hover:scale-105 transition-all shadow-sm"
        >
          Télécharger
        </a>

        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 sm:right-4 p-1 rounded-full text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 transition-colors"
          aria-label="Fermer l'annonce"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AppStoreAnnouncement;
