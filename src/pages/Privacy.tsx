import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";

const Privacy = () => {
  usePageMeta({
    title: "Politique de confidentialité — FeedMe",
    description:
      "Politique de confidentialité de FeedMe : données collectées, finalités, durée de conservation et vos droits RGPD.",
    path: "/confidentialite",
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
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Politique de confidentialit&eacute;</h1>
        <p className="text-muted-foreground mb-10">Derni&egrave;re mise &agrave; jour : 19 ao&ucirc;t 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="font-display text-2xl font-bold mb-4">&Eacute;diteur du service</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe est un service &eacute;dit&eacute; par <strong className="text-foreground">The Off Note</strong>, studio cr&eacute;atif
              bas&eacute; &agrave; Paris et Saint-Malo. Il est accessible via le site <strong className="text-foreground">feedme.social</strong> et
              l&apos;application iOS <strong className="text-foreground">FeedMe</strong> (App Store).
            </p>
            <ul className="list-none space-y-1 text-muted-foreground mt-4">
              <li><strong className="text-foreground">Responsable :</strong> L&eacute;o Le Coguic</li>
              <li><strong className="text-foreground">Email :</strong> leo@feedme.social</li>
              <li><strong className="text-foreground">T&eacute;l&eacute;phone :</strong> +33 6 83 36 12 25</li>
              <li><strong className="text-foreground">Site &eacute;diteur :</strong> feedme.social</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Notre engagement : z&eacute;ro donn&eacute;e personnelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe est con&ccedil;u d&egrave;s sa conception (<em>privacy by design</em>) pour fonctionner{" "}
              <strong className="text-foreground">sans collecter, stocker ni traiter aucune donn&eacute;e personnelle</strong>.
            </p>
            <div className="bg-card rounded-2xl p-6 border border-border/50 mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x2718;</span>
                <p className="text-muted-foreground"><strong className="text-foreground">Aucun compte utilisateur</strong> &mdash; pas d'inscription, pas de connexion, pas de mot de passe.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x2718;</span>
                <p className="text-muted-foreground"><strong className="text-foreground">Aucun cookie</strong> &mdash; ni cookie de session, ni cookie de tracking, ni cookie tiers.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x2718;</span>
                <p className="text-muted-foreground"><strong className="text-foreground">Aucun outil d'analyse</strong> &mdash; ni Google Analytics, ni Meta Pixel, ni aucun traceur.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x2718;</span>
                <p className="text-muted-foreground"><strong className="text-foreground">Aucune donn&eacute;e stock&eacute;e sur vous</strong> &mdash; pas de nom, email, t&eacute;l&eacute;phone, adresse IP ou identifiant.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">G&eacute;olocalisation : temporaire et anonyme</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe utilise la g&eacute;olocalisation de votre appareil pour connecter les personnes &agrave; proximit&eacute;.
              Voici comment cela fonctionne :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
              <li>La localisation est demand&eacute;e <strong className="text-foreground">uniquement apr&egrave;s votre accord explicite</strong> (permission iOS ou du navigateur).</li>
              <li>Les coordonn&eacute;es GPS sont transmises au serveur <strong className="text-foreground">sans aucun identifiant</strong> associ&eacute;.</li>
              <li>Les donn&eacute;es de localisation sont <strong className="text-foreground">automatiquement supprim&eacute;es apr&egrave;s 4 heures</strong> maximum.</li>
              <li>Les statistiques anonymes (nombre de repas partag&eacute;s) ne contiennent <strong className="text-foreground">aucune localisation</strong>.</li>
              <li>Vous pouvez r&eacute;voquer l'acc&egrave;s &agrave; la localisation &agrave; tout moment via les R&eacute;glages iOS ou les param&egrave;tres de votre navigateur.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Donn&eacute;es trait&eacute;es par le service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pour permettre la mise en relation, FeedMe traite temporairement les informations suivantes lors de la cr&eacute;ation d'un repas :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Donn&eacute;e</th>
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Dur&eacute;e</th>
                    <th className="text-left py-3 font-semibold text-foreground">Finalit&eacute;</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Description du repas</td>
                    <td className="py-3 pr-4">4h max</td>
                    <td className="py-3">Informer les receveurs</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Temp&eacute;rature (chaud/froid)</td>
                    <td className="py-3 pr-4">4h max</td>
                    <td className="py-3">Informer les receveurs</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Nombre de portions</td>
                    <td className="py-3 pr-4">4h max</td>
                    <td className="py-3">Informer les receveurs</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4">Coordonn&eacute;es GPS</td>
                    <td className="py-3 pr-4">4h max</td>
                    <td className="py-3">Calcul de proximit&eacute;</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Statistiques (portions, temp&eacute;rature)</td>
                    <td className="py-3 pr-4">Ind&eacute;finie</td>
                    <td className="py-3">Compteur d'impact (sans localisation)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Aucune de ces donn&eacute;es ne permet d'identifier un utilisateur.</strong> Elles ne sont
              jamais crois&eacute;es, vendues, ni partag&eacute;es avec des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Journal de connexion (obligation LCEN)</h2>
            <p className="text-muted-foreground leading-relaxed">
              Conform&eacute;ment &agrave; la Loi pour la Confiance dans l'&Eacute;conomie Num&eacute;rique (LCEN, article 6-II),
              FeedMe conserve un <strong className="text-foreground">journal technique chiffr&eacute;</strong> des adresses IP associ&eacute;es
              aux actions de cr&eacute;ation et de r&eacute;cup&eacute;ration de repas.
            </p>
            <div className="bg-card rounded-2xl p-6 border border-border/50 mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x1F512;</span>
                <p className="text-muted-foreground">
                  Les adresses IP sont <strong className="text-foreground">chiffr&eacute;es par cl&eacute; asym&eacute;trique (RSA-2048)</strong> avant
                  stockage. Le serveur ne peut pas les d&eacute;chiffrer.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x1F5DD;</span>
                <p className="text-muted-foreground">
                  La cl&eacute; de d&eacute;chiffrement est conserv&eacute;e <strong className="text-foreground">hors ligne</strong> et
                  n'est utilis&eacute;e que sur r&eacute;quisition judiciaire.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x1F5D1;</span>
                <p className="text-muted-foreground">
                  Les entr&eacute;es sont <strong className="text-foreground">automatiquement purg&eacute;es apr&egrave;s 1 an</strong> (dur&eacute;e
                  l&eacute;gale de conservation).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">&#x1F6AB;</span>
                <p className="text-muted-foreground">
                  Aucun employ&eacute;, d&eacute;veloppeur ou administrateur ne peut acc&eacute;der aux IP en clair.
                  Seule une autorit&eacute; judiciaire peut en demander le d&eacute;chiffrement.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Ce dispositif garantit &agrave; la fois la <strong className="text-foreground">protection de votre anonymat</strong> au
              quotidien et la capacit&eacute; des autorit&eacute;s &agrave; intervenir en cas d'infraction grave (intoxication
              volontaire, mise en danger d'autrui).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">H&eacute;bergement</h2>
            <ul className="list-none space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Frontend :</strong> Vercel Inc. (San Francisco, CA, USA)</li>
              <li><strong className="text-foreground">Backend :</strong> Render Services Inc. (San Francisco, CA, USA)</li>
              <li><strong className="text-foreground">Base de donn&eacute;es :</strong> Upstash (infrastructure serverless, donn&eacute;es chiffr&eacute;es)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Les donn&eacute;es trait&eacute;es &eacute;tant strictement anonymes et ne constituant pas des donn&eacute;es personnelles au sens du RGPD,
              le transfert hors UE ne n&eacute;cessite pas de garanties suppl&eacute;mentaires. N&eacute;anmoins, tous nos prestataires
              adh&egrave;rent au EU-US Data Privacy Framework.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Vos droits</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe ne collectant aucune donn&eacute;e personnelle, les droits d'acc&egrave;s, rectification, suppression et portabilit&eacute;
              pr&eacute;vus par le RGPD (articles 15 &agrave; 20) ne trouvent pas &agrave; s'appliquer. Il n'y a tout simplement rien &agrave; consulter,
              modifier ou supprimer.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Si vous avez la moindre question, contactez-nous : <a href="mailto:leo@feedme.social" className="text-primary hover:underline">leo@feedme.social</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cette politique peut &ecirc;tre mise &agrave; jour. La date de derni&egrave;re modification figure en haut de page.
              Tout changement significatif sera signal&eacute; sur la page d'accueil du service.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
