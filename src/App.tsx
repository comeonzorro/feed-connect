import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GtagRouteListener } from "./components/GtagRouteListener.tsx";
import AppStoreAnnouncement from "./components/AppStoreAnnouncement";
import { AppStoreBannerProvider } from "./context/AppStoreBannerContext";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppStoreBannerProvider>
        <BrowserRouter>
          <AppStoreAnnouncement />
          <GtagRouteListener />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/confidentialite" element={<Privacy />} />
            <Route path="/conditions" element={<Terms />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppStoreBannerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
