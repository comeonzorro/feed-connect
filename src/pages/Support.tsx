import { ArrowLeft, Mail, Phone, User } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";

const Support = () => {
  usePageMeta({
    title: "Assistance — FeedMe",
    description:
      "Contactez l'équipe FeedMe pour toute question sur l'application de partage de repas solidaire.",
    path: "/support",
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Assistance</h1>
        <p className="text-muted-foreground mb-10">
          Une question sur l&apos;app FeedMe (iOS) ou le site feedme.social ? Contactez-nous.
        </p>

        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft border border-border/50 space-y-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fondateur</p>
              <p className="font-semibold text-foreground">Léo Le Coguic — The Off Note</p>
            </div>
          </div>

          <a href="mailto:leo@feedme.social" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-foreground">leo@feedme.social</p>
            </div>
          </a>

          <a href="tel:+33683361225" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-semibold text-foreground">+33 6 83 36 12 25</p>
            </div>
          </a>
        </div>

        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Questions fréquentes</h2>
            <p><strong className="text-foreground">L&apos;app est-elle gratuite ?</strong> Oui, 100% gratuite et sans compte.</p>
            <p className="mt-2"><strong className="text-foreground">Mes données sont-elles protégées ?</strong> FeedMe ne collecte aucune donnée personnelle. Voir notre <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>.</p>
            <p className="mt-2"><strong className="text-foreground">Comment partager un repas ?</strong> Ouvrez l&apos;app, choisissez « Je suis bienfaiteur », autorisez la localisation et décrivez votre repas.</p>
          </section>
          <section>
            <p>
              Documents légaux :{" "}
              <a href="/confidentialite" className="text-primary hover:underline">Confidentialité</a>
              {" · "}
              <a href="/conditions" className="text-primary hover:underline">Conditions d&apos;utilisation</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Support;
