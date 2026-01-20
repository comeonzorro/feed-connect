import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onStartClick: () => void;
}

const CTASection = ({ onStartClick }: CTASectionProps) => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-gradient-nature rounded-3xl p-12 md:p-16 shadow-glow-primary"
        >
          <span className="text-5xl mb-6 block">🌟</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Prêt à faire la différence ?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Rejoignez une communauté qui croit que chaque repas compte.
          </p>
          <Button 
            variant="heroSecondary" 
            size="xl" 
            onClick={onStartClick}
            className="group"
          >
            Commencer maintenant
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
