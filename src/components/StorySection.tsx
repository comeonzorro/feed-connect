import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <section id="story" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-6xl mb-6 block">💭</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              L'histoire derrière <span className="text-gradient-nature">FeedMe</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-3xl p-8 md:p-12 shadow-soft border border-border/50"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                Un soir, en sortant d'un restaurant asiatique, j'avais un plat chaud à emporter — 
                <span className="text-foreground font-medium"> trop pour moi seul</span>. 
                Je voulais le donner à quelqu'un qui en aurait vraiment besoin.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
                J'ai cherché, marché... mais je n'ai trouvé personne. 
                <span className="text-secondary font-medium"> Le plat a refroidi. L'occasion était passée.</span>
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
                C'est là que l'idée de FeedMe est née : une app simple pour connecter instantanément 
                ceux qui ont un repas en trop avec ceux qui en cherchent un. 
                <span className="text-gradient-warm"> Anonyme. Immédiat. Humain.</span>
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-nature flex items-center justify-center">
                <span className="text-xl">🍜</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Léo Le Coguic</p>
                <p className="text-sm text-muted-foreground">Fondateur de FeedMe</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
