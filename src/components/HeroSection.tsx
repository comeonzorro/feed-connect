import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-mobile";

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decorations - pas de blur sur mobile */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl hidden md:block" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl hidden md:block" />
      
      {/* Floating food emojis - animation CSS simple, cachés sur mobile */}
      {!reduceMotion && (
        <>
          <span className="absolute top-32 left-[15%] text-5xl opacity-60 animate-float hidden md:block">
            🥗
          </span>
          <span className="absolute top-48 right-[20%] text-4xl opacity-50 animate-float-delayed hidden md:block">
            🍲
          </span>
          <span className="absolute bottom-32 left-[25%] text-6xl opacity-40 animate-float hidden md:block">
            🍛
          </span>
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">App 100% anonyme et gratuite</span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up">
            Partagez un repas,
            <br />
            <span className="text-gradient-warm">changez une journée</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            FeedMe connecte ceux qui ont trop avec ceux qui ont besoin. 
            <span className="text-foreground font-medium"> Anonyme, instantané, humain.</span>
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" onClick={onStartClick} className="group">
              Commencer maintenant
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="soft" size="xl" asChild>
              <a href="#how">
                Comment ça marche ?
              </a>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-sm">100% Anonyme</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📍</span>
              <span className="text-sm">Géolocalisation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-sm">Instantané</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💚</span>
              <span className="text-sm">Anti-gaspillage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
