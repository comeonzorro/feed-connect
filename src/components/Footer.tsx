import FeedMeLogo from "./FeedMeLogo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <FeedMeLogo size="sm" />
            <p className="text-sm text-muted-foreground">
              Partagez, Nourrissez, Connectez
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#story" className="text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Confidentialité
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Conditions
            </a>
          </nav>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 FeedMe. Fait avec ❤️ pour une alimentation solidaire.</p>
          <p className="mt-1">Développé par Léo Le Coguic</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
