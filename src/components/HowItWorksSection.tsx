import { motion } from "framer-motion";
import StepCard from "./StepCard";

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Ouvrez l'app",
      description: "Choisissez votre rôle : vous avez un repas à partager, ou vous cherchez à en recevoir un.",
    },
    {
      number: 2,
      title: "Partagez votre position",
      description: "Votre localisation permet de trouver les personnes à proximité. 100% anonyme, aucun compte requis.",
    },
    {
      number: 3,
      title: "Rencontrez-vous",
      description: "Rendez-vous au point de rencontre pour l'échange. Simple, rapide, humain.",
    },
  ];

  return (
    <section id="how" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Trois étapes simples pour partager ou recevoir un repas
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto space-y-10">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
