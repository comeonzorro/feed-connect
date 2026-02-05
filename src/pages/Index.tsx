import { useState, lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import RoleSelectionModal from "@/components/RoleSelectionModal";

// Lazy load MapView pour réduire le bundle initial
const MapView = lazy(() => import("@/components/MapView"));

// Composant de chargement pour MapView
const MapLoadingFallback = () => (
  <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4 animate-spin" />
      <p className="text-lg font-medium">Chargement de la carte...</p>
    </div>
  </div>
);

const Index = () => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"need" | "give" | null>(null);
  const [showMap, setShowMap] = useState(false);
  
  const handleStartClick = () => {
    setShowRoleModal(true);
  };
  
  const handleCloseModal = () => {
    setShowRoleModal(false);
  };
  
  const handleSelectRole = (role: "need" | "give") => {
    setSelectedRole(role);
    setShowRoleModal(false);
    setShowMap(true);
  };
  
  const handleBackFromMap = () => {
    setShowMap(false);
    setSelectedRole(null);
  };
  
  // Affichage conditionnel sans AnimatePresence
  if (showMap && selectedRole) {
    return (
      <Suspense fallback={<MapLoadingFallback />}>
        <MapView role={selectedRole} onBack={handleBackFromMap} />
      </Suspense>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header onStartClick={handleStartClick} />
      <main>
        <HeroSection onStartClick={handleStartClick} />
        <StorySection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection onStartClick={handleStartClick} />
        <ContactSection />
      </main>
      <Footer />
      
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={handleCloseModal}
        onSelectRole={handleSelectRole}
      />
    </div>
  );
};

export default Index;
