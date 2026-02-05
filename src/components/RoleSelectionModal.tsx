import { X } from "lucide-react";
import RoleCard from "./RoleCard";
import FeedMeLogo from "./FeedMeLogo";

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: "need" | "give") => void;
}

const RoleSelectionModal = ({ isOpen, onClose, onSelectRole }: RoleSelectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop - pas de blur sur mobile pour les performances */}
      <div
        className="absolute inset-0 bg-foreground/40 md:backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-background rounded-3xl p-6 md:p-10 max-w-2xl w-full shadow-elevated border border-border animate-scale-in max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        
        {/* Header */}
        <div className="text-center mb-8">
          <FeedMeLogo size="md" />
          <h2 className="font-display text-2xl md:text-3xl font-bold mt-4 mb-2">
            Que souhaitez-vous faire ?
          </h2>
          <p className="text-muted-foreground">
            Choisissez votre rôle pour commencer
          </p>
        </div>
        
        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <RoleCard
            emoji="🙋"
            title="J'ai besoin"
            description="Trouvez un repas près de vous, partagé par un bienfaiteur anonyme."
            variant="need"
            onClick={() => onSelectRole("need")}
            delay={0.1}
          />
          <RoleCard
            emoji="🤲"
            title="Je suis bienfaiteur"
            description="Partagez vos restes ou un repas en trop avec quelqu'un qui en a besoin."
            variant="give"
            onClick={() => onSelectRole("give")}
            delay={0.2}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
