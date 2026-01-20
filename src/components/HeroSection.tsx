import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartClick: () => void;
}

const HeroSection = ({ onStartClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      {/* Floating food emojis */}
      <motion.span 
        className="absolute top-32 left-[15%] text-5xl opacity-60"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🥗
      </motion.span>
      <motion.span 
        className="absolute top-48 right-[20%] text-4xl opacity-50"
        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🍲
      </motion.span>
      <motion.span 
        className="absolute bottom-32 left-[25%] text-6xl opacity-40"
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        🍛
      </motion.span>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">App 100% anonyme et gratuite</span>
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Partagez un repas,
            <br />
            <span className="text-gradient-warm">changez une journée</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            FeedMe connecte ceux qui ont trop avec ceux qui ont besoin. 
            <span className="text-foreground font-medium"> Anonyme, instantané, humain.</span>
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" onClick={onStartClick} className="group">
              Commencer maintenant
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="soft" size="xl" asChild>
              <a href="#how">
                Comment ça marche ?
              </a>
            </Button>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
