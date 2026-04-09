declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Surcharge possible via VITE_GA_MEASUREMENT_ID ; sinon ID GA4 FeedMe. */
const MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? "G-LTQ8RNZV6D";

export function isGtagEnabled(): boolean {
  return Boolean(MEASUREMENT_ID);
}

/** Charge gtag.js et envoie la première page vue (navigation initiale). */
export function initGtag(): void {
  if (!MEASUREMENT_ID) return;
  if (
    document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}"]`
    )
  ) {
    return;
  }
  if (document.querySelector(`script[data-feedme-gtag="${MEASUREMENT_ID}"]`)) return;

  const external = document.createElement("script");
  external.async = true;
  external.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  external.dataset.feedmeGtag = MEASUREMENT_ID;
  document.head.appendChild(external);

  const inline = document.createElement("script");
  inline.dataset.feedmeGtag = MEASUREMENT_ID;
  inline.textContent = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${MEASUREMENT_ID}');
`.trim();
  document.head.appendChild(inline);
}

/** À appeler après navigation client (SPA) — la première vue est déjà couverte par init. */
export function gtagSetPage(pagePath: string): void {
  if (!MEASUREMENT_ID || typeof window.gtag !== "function") return;
  window.gtag("config", MEASUREMENT_ID, { page_path: pagePath });
}
