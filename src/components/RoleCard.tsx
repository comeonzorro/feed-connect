import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RoleCardProps {
  emoji: string;
  title: string;
  description: string;
  variant: "need" | "give";
  onClick: () => void;
  delay?: number;
}

const RoleCard = ({ emoji, title, description, variant, onClick, delay = 0 }: RoleCardProps) => {
  const isNeed = variant === "need";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`
        relative overflow-hidden rounded-3xl p-8 cursor-pointer
        bg-card border-2 transition-all duration-300
        ${isNeed ? "border-secondary/30 hover:border-secondary" : "border-primary/30 hover:border-primary"}
        shadow-soft hover:shadow-elevated
      `}
      onClick={onClick}
    >
      {/* Background gradient decoration */}
      <div 
        className={`
          absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20
          ${isNeed ? "bg-secondary" : "bg-primary"}
        `}
      />
      
      <div className="relative z-10">
        <motion.span 
          className="text-6xl block mb-6"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {emoji}
        </motion.span>
        
        <h3 className="font-display text-2xl font-bold mb-3 text-foreground">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
        
        <Button 
          variant={isNeed ? "need" : "give"} 
          size="lg"
          className="w-full group"
        >
          Continuer
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default RoleCard;
