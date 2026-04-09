import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import App from "./App.tsx";
import { initGtag } from "./lib/gtag.ts";
import "./index.css";

initGtag();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
