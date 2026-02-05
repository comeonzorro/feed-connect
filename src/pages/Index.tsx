import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import RoleSelectionModal from "@/components/RoleSelectionModal";
import MapView from "@/components/MapView";

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
  
  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showMap && selectedRole ? (
          <MapView role={selectedRole} onBack={handleBackFromMap} />
        ) : (
          <>
            <Header onStartClick={handleStartClick} />
            <main>
              <HeroSection onStartClick={handleStartClick} />
              <StorySection />
              <HowItWorksSection />
              <FeaturesSection />
              <CTASection onStartClick={handleStartClick} />
            </main>
            <Footer />
          </>
        )}
      </AnimatePresence>
      
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={handleCloseModal}
        onSelectRole={handleSelectRole}
      />
    </div>
  );
};

export default Index;
