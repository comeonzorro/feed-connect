import { Building2, Users, Landmark, Heart, MessageCircle } from "lucide-react";

const PartnershipSection = () => {
  const partners = [
    {
      icon: Users,
      title: "Associations locales",
      description: "Restos du cœur, Secours populaire, banques alimentaires...",
    },
    {
      icon: Building2,
      title: "Mairies & collectivités",
      description: "Services sociaux, CCAS, politiques locales",
    },
    {
      icon: Landmark,
      title: "Élus & institutions",
      description: "Députés, conseillers, acteurs publics engagés",
    },
    {
      icon: Heart,
      title: "Fondations nationales",
      description: "Fondations d'entreprise, mécènes, philanthropes",
    },
  ];

  return (
    <section id="partenaires" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-5xl mb-6 block">🤝</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Construisons ensemble
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous cherchons à nous rapprocher d'acteurs engagés pour faire bouger 
              les lignes d'une alimentation plus solidaire et réfléchie.
            </p>
          </div>
          
          {/* Partners grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {partners.map((partner) => (
              <div
                key={partner.title}
                className="bg-card rounded-2xl p-6 border border-border/50 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center flex-shrink-0">
                  <partner.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{partner.title}</h3>
                  <p className="text-sm text-muted-foreground">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action message */}
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4">
              Ouvert au dialogue
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-6">
              Vous représentez une association, une collectivité, une fondation ou vous êtes 
              simplement convaincu que l'alimentation solidaire mérite qu'on s'y attarde ? 
              <span className="text-foreground font-medium"> Parlons-en.</span>
            </p>
            <p className="text-muted-foreground text-sm">
              Ensemble, nous pouvons créer des ponts entre ceux qui donnent et ceux qui reçoivent, 
              à l'échelle locale comme nationale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
