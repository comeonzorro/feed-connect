import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Navigation, RefreshCw, Check, Flame, Snowflake, Minus, Plus } from "lucide-react";
import FeedMeLogo from "./FeedMeLogo";

interface MapViewProps {
  role: "need" | "give";
  onBack: () => void;
}

interface MockLocation {
  id: string;
  lat: number;
  lng: number;
  distance: string;
  description: string;
  timeAgo: string;
  temperature: "hot" | "cold";
  portions: number;
}

interface MealForm {
  description: string;
  temperature: "hot" | "cold";
  portions: number;
}

const MapView = ({ role, onBack }: MapViewProps) => {
  const [isLocating, setIsLocating] = useState(true);
  const [hasLocation, setHasLocation] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [nearbyItems, setNearbyItems] = useState<MockLocation[]>([]);
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealForm, setMealForm] = useState<MealForm>({
    description: "",
    temperature: "hot",
    portions: 1,
  });
  
  // Simulate getting location
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocating(false);
      setHasLocation(true);
      
      if (role === "give") {
        setShowMealForm(true);
      }
      
      if (role === "need") {
        // Simulate nearby food offers
        setNearbyItems([
          { id: "1", lat: 0, lng: 0, distance: "150m", description: "Plat de pâtes à la bolognaise", timeAgo: "Il y a 3 min", temperature: "hot", portions: 1 },
          { id: "2", lat: 0, lng: 0, distance: "320m", description: "Curry de légumes + riz", timeAgo: "Il y a 8 min", temperature: "hot", portions: 2 },
          { id: "3", lat: 0, lng: 0, distance: "500m", description: "Sandwich complet", timeAgo: "Il y a 12 min", temperature: "cold", portions: 1 },
        ]);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [role]);
  
  const handleShare = () => {
    if (!mealForm.description.trim()) return;
    
    setIsSharing(true);
    setShowMealForm(false);
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);
    }, 1500);
  };

  const incrementPortions = () => {
    setMealForm(prev => ({ ...prev, portions: Math.min(prev.portions + 1, 10) }));
  };

  const decrementPortions = () => {
    setMealForm(prev => ({ ...prev, portions: Math.max(prev.portions - 1, 1) }));
  };
  
  const isGiver = role === "give";
  const canSubmit = mealForm.description.trim().length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-lg">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <FeedMeLogo size="sm" />
        <div className="w-9" /> {/* Spacer for centering */}
      </header>
      
      {/* Map area (simulated) */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {/* Simulated map background with grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Simulated streets */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 h-8 bg-card/60" />
          <div className="absolute top-2/3 left-0 right-0 h-6 bg-card/40" />
          <div className="absolute left-1/4 top-0 bottom-0 w-6 bg-card/50" />
          <div className="absolute left-2/3 top-0 bottom-0 w-8 bg-card/60" />
        </div>
        
        {/* Current location marker */}
        {hasLocation && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className={`w-16 h-16 rounded-full ${isGiver ? 'bg-primary/20' : 'bg-secondary/20'} animate-ping`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full ${isGiver ? 'bg-gradient-nature' : 'bg-gradient-warm'} flex items-center justify-center shadow-elevated`}>
                <Navigation className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Nearby items markers (for need role) */}
        {role === "need" && nearbyItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="absolute"
            style={{
              top: `${30 + index * 15}%`,
              left: `${25 + index * 20}%`,
            }}
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-glow-primary cursor-pointer hover:scale-110 transition-transform">
              <span className="text-lg">{item.temperature === "hot" ? "🍲" : "🥪"}</span>
            </div>
          </motion.div>
        ))}
        
        {/* Loading overlay */}
        {isLocating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"
              />
              <p className="text-lg font-medium">Localisation en cours...</p>
              <p className="text-sm text-muted-foreground">Veuillez patienter</p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Bottom panel */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-background border-t border-border p-6 rounded-t-3xl -mt-6 relative z-10 shadow-elevated max-h-[70vh] overflow-auto"
      >
        {isGiver ? (
          // Giver panel
          <div>
            {shareSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Votre repas est partagé !</h3>
                <p className="text-muted-foreground mb-4">
                  Quelqu'un proche de vous va bientôt le recevoir. Merci pour votre générosité ! 💚
                </p>
                <Button variant="soft" onClick={onBack}>
                  Retour à l'accueil
                </Button>
              </motion.div>
            ) : showMealForm ? (
              // Meal description form
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-display text-xl font-bold mb-6">Décrivez votre repas</h3>
                
                {/* Meal description */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Quel repas partagez-vous ?
                  </label>
                  <textarea
                    value={mealForm.description}
                    onChange={(e) => setMealForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Ex: Pâtes carbonara, Curry de poulet, Sandwich jambon-beurre..."
                    className="w-full h-24 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    maxLength={150}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {mealForm.description.length}/150
                  </p>
                </div>
                
                {/* Temperature */}
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Température du repas
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setMealForm(prev => ({ ...prev, temperature: "hot" }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
                        mealForm.temperature === "hot"
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border bg-card text-muted-foreground hover:border-secondary/50"
                      }`}
                    >
                      <Flame className="w-5 h-5" />
                      <span className="font-medium">Chaud</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMealForm(prev => ({ ...prev, temperature: "cold" }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all ${
                        mealForm.temperature === "cold"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <Snowflake className="w-5 h-5" />
                      <span className="font-medium">Froid</span>
                    </button>
                  </div>
                </div>
                
                {/* Portions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Nombre de portions
                  </label>
                  <div className="flex items-center justify-center gap-6 py-3 px-4 rounded-xl border border-border bg-card">
                    <button
                      type="button"
                      onClick={decrementPortions}
                      disabled={mealForm.portions <= 1}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <span className="font-display text-3xl font-bold text-foreground">{mealForm.portions}</span>
                      <span className="block text-xs text-muted-foreground">
                        {mealForm.portions === 1 ? "portion" : "portions"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={incrementPortions}
                      disabled={mealForm.portions >= 10}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Submit button */}
                <Button
                  variant="give"
                  size="xl"
                  className="w-full"
                  onClick={handleShare}
                  disabled={!canSubmit}
                >
                  <span className="text-xl">🤲</span>
                  Partager ce repas
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-nature flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">Partagez votre position</h3>
                    <p className="text-sm text-muted-foreground">
                      Les personnes à proximité pourront voir qu'un repas est disponible
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="give"
                  size="xl"
                  className="w-full"
                  onClick={handleShare}
                  disabled={isSharing || !hasLocation}
                >
                  {isSharing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Partage en cours...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🤲</span>
                      Partager mon repas
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        ) : (
          // Need panel
          <div>
            <h3 className="font-display text-lg font-bold mb-4">
              {nearbyItems.length > 0 ? `${nearbyItems.length} repas disponibles à proximité` : "Recherche de repas..."}
            </h3>
            
            <div className="space-y-3 max-h-48 overflow-auto">
              {nearbyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-4 border border-border flex items-center gap-4 cursor-pointer hover:shadow-soft transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{item.temperature === "hot" ? "🍲" : "🥪"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>À {item.distance}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {item.temperature === "hot" ? <Flame className="w-3 h-3" /> : <Snowflake className="w-3 h-3" />}
                        {item.temperature === "hot" ? "Chaud" : "Froid"}
                      </span>
                      <span>•</span>
                      <span>{item.portions} {item.portions === 1 ? "portion" : "portions"}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Y aller
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {nearbyItems.length === 0 && hasLocation && (
              <p className="text-center text-muted-foreground py-8">
                Aucun repas disponible pour le moment. Revenez bientôt ! 🙏
              </p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MapView;
