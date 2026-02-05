import { motion } from "framer-motion";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  delay?: number;
}

const StepCard = ({ number, title, description, delay = 0 }: StepCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-6 items-start"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-glow-secondary">
        <span className="font-display text-2xl font-bold text-primary-foreground">{number}</span>
      </div>
      <div className="pt-1">
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default StepCard;
