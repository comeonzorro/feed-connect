import { motion } from "framer-motion";
import FeedMeLogo from "./FeedMeLogo";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onStartClick?: () => void;
}

const Header = ({ onStartClick }: HeaderProps) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <FeedMeLogo size="sm" />
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#story" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Notre histoire
          </a>
          <a href="#how" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Comment ça marche
          </a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            Fonctionnalités
          </a>
        </nav>
        
        <Button variant="hero" size="default" onClick={onStartClick}>
          Commencer
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;
