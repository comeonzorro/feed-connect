import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "@/lib/page-meta";

const Terms = () => {
  usePageMeta({
    title: "Conditions générales — FeedMe",
    description:
      "Conditions générales d'utilisation de FeedMe, application solidaire de partage de repas anti-gaspillage alimentaire.",
    path: "/conditions",
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
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Conditions g&eacute;n&eacute;rales d'utilisation</h1>
        <p className="text-muted-foreground mb-10">Derni&egrave;re mise &agrave; jour : 19 ao&ucirc;t 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">1. Pr&eacute;sentation du service</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe (accessible via <strong className="text-foreground">feedme.social</strong> et l&apos;application iOS FeedMe) est une
              application gratuite qui met en relation des personnes souhaitant partager un repas
              en trop avec des personnes qui en ont besoin. Le service est &eacute;dit&eacute; par{" "}
              <strong className="text-foreground">The Off Note</strong>, repr&eacute;sent&eacute;e par L&eacute;o Le Coguic.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              FeedMe est une <strong className="text-foreground">plateforme d'intermédiation</strong> au sens de la Loi pour
              la Confiance dans l'&Eacute;conomie Num&eacute;rique (LCEN). Elle ne produit, ne transforme, ne stocke et
              ne distribue aucun aliment. Elle se limite &agrave; connecter des utilisateurs entre eux de
              mani&egrave;re anonyme et g&eacute;olocalis&eacute;e.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">2. Acceptation des conditions</h2>
            <p className="text-muted-foreground leading-relaxed">
              L'utilisation de FeedMe implique l'acceptation pleine et enti&egrave;re des pr&eacute;sentes conditions.
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">3. Fonctionnement</h2>
            <p className="text-muted-foreground leading-relaxed">Le service fonctionne comme suit :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
              <li>Un <strong className="text-foreground">bienfaiteur</strong> signale qu'il dispose d'un repas &agrave; partager, en indiquant une description, le nombre de portions et sa localisation temporaire.</li>
              <li>Un <strong className="text-foreground">b&eacute;n&eacute;ficiaire</strong> consulte les repas disponibles &agrave; proximit&eacute; et peut se rendre au point de rencontre.</li>
              <li>Toutes les donn&eacute;es sont <strong className="text-foreground">automatiquement supprim&eacute;es apr&egrave;s 4 heures</strong>.</li>
              <li>Aucun compte utilisateur n'est requis. Aucune donn&eacute;e personnelle n'est collect&eacute;e.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">4. Philosophie : le don alimentaire citoyen</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe est n&eacute; d'une conviction : chaque citoyen devrait pouvoir partager un repas en trop
              de mani&egrave;re simple et imm&eacute;diate, <strong className="text-foreground">sans interm&eacute;diaire commercial</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Contrairement aux applications comme Too Good To Go, o&ugrave; les &eacute;tablissements commerciaux vendent
              leurs invendus dans le cadre de leurs obligations sanitaires professionnelles, FeedMe facilite
              le <strong className="text-foreground">don gratuit entre particuliers</strong>. Ce geste solidaire n'est soumis &agrave; aucune
              r&eacute;glementation commerciale : il rel&egrave;ve de la g&eacute;n&eacute;rosit&eacute; individuelle et de la responsabilit&eacute;
              personnelle de chacun.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4 text-secondary">5. Responsabilit&eacute; alimentaire</h2>
            <div className="bg-secondary/5 rounded-2xl p-6 border-2 border-secondary/20 mb-6">
              <p className="text-foreground font-semibold mb-4">
                Cet article est fondamental. Veuillez le lire attentivement.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                FeedMe &eacute;tant exclusivement une plateforme de mise en relation, elle{" "}
                <strong className="text-foreground">n'assume aucune responsabilit&eacute; quant &agrave; la qualit&eacute;, la s&eacute;curit&eacute; sanitaire
                ou la composition des aliments</strong> partag&eacute;s par les utilisateurs.
              </p>
            </div>

            <h3 className="font-display text-xl font-semibold mb-3">5.1. Responsabilit&eacute; du bienfaiteur (celui qui donne)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En partageant un repas via FeedMe, le bienfaiteur :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">S'engage sur l'honneur</strong> que le repas est propre &agrave; la consommation humaine au moment du partage.</li>
              <li><strong className="text-foreground">Assume l'enti&egrave;re responsabilit&eacute; civile</strong> en cas de dommage caus&eacute; par le repas partag&eacute; (article 1240 du Code civil).</li>
              <li>S'engage &agrave; ne pas partager d'aliments manifestement avari&eacute;s, p&eacute;rim&eacute;s, ou contenant des substances dangereuses.</li>
              <li>Reconna&icirc;t que le don alimentaire entre particuliers rel&egrave;ve de sa responsabilit&eacute; personnelle, au m&ecirc;me titre que s'il offrait un plat &agrave; un voisin ou un ami.</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-3 mt-6">5.2. Responsabilit&eacute; du b&eacute;n&eacute;ficiaire (celui qui re&ccedil;oit)</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              En r&eacute;cup&eacute;rant un repas via FeedMe, le b&eacute;n&eacute;ficiaire :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Accepte de recevoir un repas d'un particulier</strong>, et non d'un &eacute;tablissement soumis aux normes sanitaires commerciales (R&egrave;glement CE 852/2004).</li>
              <li>Exerce son <strong className="text-foreground">libre arbitre</strong> en d&eacute;cidant de consommer ou non le repas, apr&egrave;s v&eacute;rification visuelle et olfactive.</li>
              <li>Reconna&icirc;t qu'aucune garantie de conformit&eacute; alimentaire professionnelle n'est fournie.</li>
              <li>Est invit&eacute; &agrave; <strong className="text-foreground">signaler tout allerg&egrave;ne</strong> ou restriction alimentaire au bienfaiteur lors de la rencontre.</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-3 mt-6">5.3. R&ocirc;le de FeedMe</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              FeedMe, en tant que plateforme d'interm&eacute;diation :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Ne contr&ocirc;le pas</strong> la qualit&eacute; des repas partag&eacute;s.</li>
              <li><strong className="text-foreground">N'est pas partie prenante</strong> de l'&eacute;change entre les utilisateurs.</li>
              <li><strong className="text-foreground">Ne peut &ecirc;tre tenue responsable</strong> en cas d'intoxication alimentaire ou de tout dommage li&eacute; &agrave; la consommation d'un repas partag&eacute; via la plateforme.</li>
              <li>S'engage &agrave; fournir des <strong className="text-foreground">recommandations de bon sens</strong> (voir article 6).</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mb-3 mt-6">5.4. En cas d'incident</h3>
            <p className="text-muted-foreground leading-relaxed">
              En cas d'intoxication alimentaire ou d'incident li&eacute; &agrave; un repas :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
              <li>La responsabilit&eacute; incombe <strong className="text-foreground">au bienfaiteur ayant partag&eacute; le repas</strong>, au titre de l'article 1240 du Code civil (responsabilit&eacute; pour faute) ou de l'article 1242 (responsabilit&eacute; du fait des choses).</li>
              <li>La victime est invit&eacute;e &agrave; consulter un m&eacute;decin et &agrave; d&eacute;poser plainte aupr&egrave;s des autorit&eacute;s comp&eacute;tentes.</li>
              <li>Conform&eacute;ment &agrave; la LCEN (article 6-II), FeedMe conserve un <strong className="text-foreground">journal chiffr&eacute; des adresses IP</strong> associ&eacute;es aux actions de cr&eacute;ation et de r&eacute;cup&eacute;ration de repas. Ces donn&eacute;es sont chiffr&eacute;es par cl&eacute; asym&eacute;trique et <strong className="text-foreground">ne peuvent &ecirc;tre d&eacute;chiffr&eacute;es que sur r&eacute;quisition judiciaire</strong>.</li>
              <li>Les autorit&eacute;s peuvent demander le d&eacute;chiffrement de ces donn&eacute;es pour identifier l'adresse IP concern&eacute;e, puis obtenir l'identit&eacute; de l'abonn&eacute; aupr&egrave;s du fournisseur d'acc&egrave;s Internet.</li>
              <li>Les donn&eacute;es de connexion sont conserv&eacute;es <strong className="text-foreground">un an</strong> conform&eacute;ment aux obligations l&eacute;gales, puis automatiquement purg&eacute;es.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">6. Recommandations de s&eacute;curit&eacute; alimentaire</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              FeedMe encourage vivement tous ses utilisateurs &agrave; respecter les bonnes pratiques suivantes :
            </p>

            <h3 className="font-display text-lg font-semibold mb-3">Pour le bienfaiteur</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Ne partagez que des repas <strong className="text-foreground">fra&icirc;chement pr&eacute;par&eacute;s ou conserv&eacute;s dans de bonnes conditions</strong>.</li>
              <li>Respectez la <strong className="text-foreground">cha&icirc;ne du froid</strong> pour les plats froids et maintenez les plats chauds &agrave; temp&eacute;rature ad&eacute;quate.</li>
              <li>Signalez les <strong className="text-foreground">allerg&egrave;nes majeurs</strong> dans la description (gluten, arachides, lait, &oelig;ufs, etc.).</li>
              <li>Ne partagez jamais un plat dont vous doutez de la fra&icirc;cheur.</li>
              <li>Utilisez des <strong className="text-foreground">contenants propres et ferm&eacute;s</strong>.</li>
            </ul>

            <h3 className="font-display text-lg font-semibold mb-3">Pour le b&eacute;n&eacute;ficiaire</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">V&eacute;rifiez visuellement et par l'odeur</strong> le repas avant de le consommer.</li>
              <li>Interrogez le bienfaiteur sur la <strong className="text-foreground">composition et les allerg&egrave;nes</strong>.</li>
              <li>En cas de doute, <strong className="text-foreground">ne consommez pas</strong> le repas.</li>
              <li>Consommez le repas <strong className="text-foreground">dans les meilleurs d&eacute;lais</strong> apr&egrave;s r&eacute;cup&eacute;ration.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">7. Usages interdits</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">Il est strictement interdit d'utiliser FeedMe pour :</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Partager des aliments <strong className="text-foreground">volontairement alt&eacute;r&eacute;s ou dangereux</strong>.</li>
              <li>Mener des <strong className="text-foreground">activit&eacute;s commerciales</strong> (revente de repas).</li>
              <li>Publier du contenu <strong className="text-foreground">injurieux, discriminatoire ou ill&eacute;gal</strong> dans les descriptions.</li>
              <li>Spammer ou surcharger le service (le syst&egrave;me de limitation de requ&ecirc;tes bloquera automatiquement les abus).</li>
              <li>Tenter d'identifier, localiser ou harceler d'autres utilisateurs.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">8. Propri&eacute;t&eacute; intellectuelle</h2>
            <p className="text-muted-foreground leading-relaxed">
              Le code source de FeedMe est disponible sur GitHub. Le nom &laquo;&nbsp;FeedMe&nbsp;&raquo;, le logo et
              l'identit&eacute; visuelle sont la propri&eacute;t&eacute; de The Off Note.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">9. Disponibilit&eacute; du service</h2>
            <p className="text-muted-foreground leading-relaxed">
              FeedMe est fourni &laquo;&nbsp;tel quel&nbsp;&raquo;, sans garantie de disponibilit&eacute; permanente. Le service peut
              &ecirc;tre interrompu &agrave; tout moment pour maintenance ou &eacute;volution, sans pr&eacute;avis.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">10. Droit applicable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Les pr&eacute;sentes conditions sont r&eacute;gies par le droit fran&ccedil;ais. Tout litige sera soumis aux
              tribunaux comp&eacute;tents de Paris.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pour toute question relative aux pr&eacute;sentes conditions :
            </p>
            <ul className="list-none space-y-1 text-muted-foreground mt-4">
              <li><strong className="text-foreground">Email :</strong> <a href="mailto:leo@feedme.social" className="text-primary hover:underline">leo@feedme.social</a></li>
              <li><strong className="text-foreground">T&eacute;l&eacute;phone :</strong> +33 6 83 36 12 25</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
