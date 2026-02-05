import { Mail, Phone, User } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Contact
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Une question ? N'hésitez pas à me contacter
          </p>
          
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-soft border border-border/50">
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Fondateur</p>
                  <p className="font-semibold text-foreground">Léo Le Coguic</p>
                </div>
              </div>
              
              {/* Phone */}
              <a 
                href="tel:+33683361225" 
                className="flex items-center gap-4 justify-center md:justify-start hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-semibold text-foreground">+33 6 83 36 12 25</p>
                </div>
              </a>
              
              {/* Email */}
              <a 
                href="mailto:leo@theoffnote.pro" 
                className="flex items-center gap-4 justify-center md:justify-start hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">leo@theoffnote.pro</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
