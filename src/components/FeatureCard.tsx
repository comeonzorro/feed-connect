import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 hover:shadow-elevated transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
