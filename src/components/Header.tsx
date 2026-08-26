import FeedMeLogo from "./FeedMeLogo";
import { Button } from "@/components/ui/button";
import { useAppStoreBanner } from "@/context/AppStoreBannerContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onStartClick?: () => void;
}

const Header = ({ onStartClick }: HeaderProps) => {
  const { headerOffsetClass } = useAppStoreBanner();

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 transition-[top] duration-300",
        headerOffsetClass
      )}
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
    </header>
  );
};

export default Header;
