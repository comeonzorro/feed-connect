import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { Lock, MapPin, Zap, Leaf, Users, Heart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Lock,
      title: "100% Anonyme",
      description: "Aucun compte, aucune donnée personnelle stockée",
    },
    {
      icon: MapPin,
      title: "Géolocalisation",
      description: "Trouvez des repas ou des personnes à proximité",
    },
    {
      icon: Zap,
      title: "Instantané",
      description: "Connexion rapide, avant que le plat ne refroidisse",
    },
    {
      icon: Leaf,
      title: "Anti-gaspillage",
      description: "Réduisez le gaspillage alimentaire au quotidien",
    },
    {
      icon: Users,
      title: "Lien social",
      description: "Créez des connexions humaines dans votre quartier",
    },
    {
      icon: Heart,
      title: "Gratuit",
      description: "Aucun frais, aucun abonnement, pour tout le monde",
    },
  ];

  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Pourquoi <span className="text-gradient-nature">FeedMe</span> ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Une app pensée pour la simplicité et l'humanité
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
