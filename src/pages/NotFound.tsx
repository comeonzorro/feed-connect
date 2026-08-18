import { useLocation } from "react-router-dom";
import { usePageMeta } from "@/lib/page-meta";

const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "Page introuvable — FeedMe",
    description: "La page demandée n'existe pas sur FeedMe.",
    path: location.pathname,
    noindex: true,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <span className="text-6xl block mb-4">🍜</span>
        <h1 className="mb-4 text-4xl font-bold font-display">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Cette page n'existe pas</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
