import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, RefreshCw, Check, Flame, Snowflake, Minus, Plus, X, Navigation, CheckCircle2 } from "lucide-react";
import FeedMeLogo from "./FeedMeLogo";
import { useGeolocation } from "@/hooks/useGeolocation";
import { createMeal, fetchNearbyMeals, claimMeal } from "@/services/api";
import type { Meal } from "@/types/meal";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { useIsMobile } from "@/hooks/use-mobile";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  role: "need" | "give";
  onBack: () => void;
}

interface MealForm {
  description: string;
  temperature: "hot" | "cold";
  portions: number;
}

const MapView = ({ role, onBack }: MapViewProps) => {
  const { coords, loading: locating, error: geoError, requestLocation } = useGeolocation();
  const isMobile = useIsMobile();
  const hasLocation = !!coords;
  const isLocating = locating;
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [nearbyItems, setNearbyItems] = useState<Meal[]>([]);
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealForm, setMealForm] = useState<MealForm>({
    description: "",
    temperature: "hot",
    portions: 1,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  
  // Demande de géolocalisation au montage
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Quand on a la position, on affiche le formulaire (give) ou on charge les repas (need)
  useEffect(() => {
    if (!coords || isLocating) return;

    setErrorMessage(null);

    if (role === "give") {
      setShowMealForm(true);
      return;
    }

    if (role === "need") {
      (async () => {
        try {
          const meals = await fetchNearbyMeals({
            latitude: coords.latitude,
            longitude: coords.longitude,
            radiusKm: 2,
          });
          setNearbyItems(meals);
        } catch (error) {
          console.error(error);
          setErrorMessage("Impossible de récupérer les repas à proximité. Réessayez dans un instant.");
        }
      })();
    }
  }, [coords, isLocating, role]);
  
  const handleShare = () => {
    if (!mealForm.description.trim() || !coords || isSharing) return;

    setErrorMessage(null);
    setIsSharing(true);
    setShowMealForm(false);

    createMeal({
      description: mealForm.description.trim(),
      temperature: mealForm.temperature,
      portions: mealForm.portions,
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
      .then(() => {
        setIsSharing(false);
        setShareSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setIsSharing(false);
        setShowMealForm(true);
        setErrorMessage("Impossible de partager le repas. Vérifiez votre connexion et réessayez.");
      });
  };

  const incrementPortions = () => {
    setMealForm(prev => ({ ...prev, portions: Math.min(prev.portions + 1, 10) }));
  };

  const decrementPortions = () => {
    setMealForm(prev => ({ ...prev, portions: Math.max(prev.portions - 1, 1) }));
  };
  
  const isGiver = role === "give";
  const canSubmit = mealForm.description.trim().length > 0;
  
  const handleNavigateToMeal = (meal: Meal) => {
    const destination = `${meal.latitude},${meal.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, "_blank");
  };

  const handleSelectMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setClaimSuccess(false);
  };

  const handleClaimMeal = async () => {
    if (!selectedMeal || isClaiming) return;
    
    setIsClaiming(true);
    setErrorMessage(null);
    
    try {
      await claimMeal(selectedMeal.id);
      setClaimSuccess(true);
      // Retirer le repas de la liste locale
      setNearbyItems(prev => prev.filter(m => m.id !== selectedMeal.id));
    } catch (error) {
      console.error(error);
      setErrorMessage("Impossible de confirmer la récupération. Le repas a peut-être déjà été pris.");
    } finally {
      setIsClaiming(false);
    }
  };

  const handleCloseMealDetail = () => {
    setSelectedMeal(null);
    setClaimSuccess(false);
  };

  const center = coords ? [coords.latitude, coords.longitude] as [number, number] : undefined;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-background">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <FeedMeLogo size="sm" />
        <div className="w-9" />
      </header>
      
      {/* Map area */}
      <div className="flex-1 relative bg-muted overflow-hidden">
        {center && !isLocating ? (
          <MapContainer
            center={center}
            zoom={isMobile ? 14 : 15}
            className="h-full w-full z-0"
            scrollWheelZoom={false}
            zoomControl={!isMobile}
            dragging={true}
            touchZoom={true}
            doubleClickZoom={false}
            boxZoom={false}
            keyboard={false}
            preferCanvas={true}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={17}
              minZoom={12}
              updateWhenIdle={true}
              keepBuffer={1}
            />
            
            {/* Current location marker */}
            <CircleMarker
              center={center}
              radius={8}
              pathOptions={{
                color: isGiver ? "#2f7b57" : "#e26b4c",
                fillColor: isGiver ? "#2f7b57" : "#e26b4c",
                fillOpacity: 0.8,
                weight: 2,
              }}
            />
            
            {/* Nearby meals markers - simple circles for performance */}
            {role === "need" &&
              nearbyItems.map((item) => (
                <CircleMarker
                  key={item.id}
                  center={[item.latitude, item.longitude]}
                  radius={12}
                  pathOptions={{
                    color: "#2f7b57",
                    fillColor: "#2f7b57",
                    fillOpacity: 0.9,
                    weight: 2,
                  }}
                />
              ))}
          </MapContainer>
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Chargement de la carte...</p>
          </div>
        )}
        
        {/* Loading overlay */}
        {isLocating && (
          <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent mx-auto mb-4 animate-spin" />
              <p className="text-lg font-medium">Localisation en cours...</p>
              <p className="text-sm text-muted-foreground">Veuillez patienter</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom panel */}
      <div className="bg-background border-t border-border p-6 rounded-t-3xl -mt-6 relative z-10 shadow-elevated max-h-[60vh] overflow-auto">
        {geoError && (
          <p className="mb-4 text-sm text-destructive">{geoError}</p>
        )}
        {errorMessage && !geoError && (
          <p className="mb-4 text-sm text-destructive">{errorMessage}</p>
        )}
        
        {isGiver ? (
          <div>
            {shareSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Votre repas est partagé !</h3>
                <p className="text-muted-foreground mb-4">
                  Quelqu'un proche de vous va bientôt le recevoir. Merci pour votre générosité !
                </p>
                <Button variant="soft" onClick={onBack}>
                  Retour à l'accueil
                </Button>
              </div>
            ) : showMealForm ? (
              <div>
                <h3 className="font-display text-xl font-bold mb-6">Décrivez votre repas</h3>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Quel repas partagez-vous ?
                  </label>
                  <textarea
                    value={mealForm.description}
                    onChange={(e) => setMealForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Ex: Pâtes carbonara, Curry de poulet..."
                    className="w-full h-20 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    maxLength={150}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {mealForm.description.length}/150
                  </p>
                </div>
                
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
                          : "border-border bg-card text-muted-foreground"
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
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      <Snowflake className="w-5 h-5" />
                      <span className="font-medium">Froid</span>
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Nombre de portions
                  </label>
                  <div className="flex items-center justify-center gap-6 py-3 px-4 rounded-xl border border-border bg-card">
                    <button
                      type="button"
                      onClick={decrementPortions}
                      disabled={mealForm.portions <= 1}
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-40"
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
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground disabled:opacity-40"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <Button
                  variant="give"
                  size="xl"
                  className="w-full"
                  onClick={handleShare}
                  disabled={!canSubmit}
                >
                  Partager ce repas
                </Button>
              </div>
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
                    "Partager mon repas"
                  )}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div>
            {/* Vue détail d'un repas sélectionné */}
            {selectedMeal ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold">Détail du repas</h3>
                  <button 
                    onClick={handleCloseMealDetail}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {claimSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-display text-xl font-bold mb-2">Repas récupéré !</h4>
                    <p className="text-muted-foreground mb-4">
                      Merci d'avoir utilisé FeedMe. Bon appétit !
                    </p>
                    <Button variant="soft" onClick={handleCloseMealDetail}>
                      Voir d'autres repas
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="bg-card rounded-xl p-4 border border-border mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{selectedMeal.temperature === "hot" ? "🍲" : "🥪"}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground mb-1">{selectedMeal.description}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>À {selectedMeal.distanceLabel ?? "proximité"}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {selectedMeal.temperature === "hot" ? <Flame className="w-3 h-3" /> : <Snowflake className="w-3 h-3" />}
                              {selectedMeal.temperature === "hot" ? "Chaud" : "Froid"}
                            </span>
                            <span>•</span>
                            <span>{selectedMeal.portions} {selectedMeal.portions === 1 ? "portion" : "portions"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {errorMessage && (
                      <p className="mb-4 text-sm text-destructive">{errorMessage}</p>
                    )}
                    
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => handleNavigateToMeal(selectedMeal)}
                      >
                        <Navigation className="w-5 h-5 mr-2" />
                        Itinéraire Google Maps
                      </Button>
                      
                      <Button
                        variant="give"
                        size="lg"
                        className="w-full"
                        onClick={handleClaimMeal}
                        disabled={isClaiming}
                      >
                        {isClaiming ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            Confirmation...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            J'ai récupéré ce repas
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Confirmez uniquement après avoir récupéré le repas
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                <h3 className="font-display text-lg font-bold mb-4">
                  {nearbyItems.length > 0 ? `${nearbyItems.length} repas disponibles` : "Recherche de repas..."}
                </h3>
                
                <div className="space-y-3 max-h-40 overflow-auto">
                  {nearbyItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-card rounded-xl p-4 border border-border flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => handleSelectMeal(item)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{item.temperature === "hot" ? "🍲" : "🥪"}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate text-sm">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>À {item.distanceLabel ?? "proximité"}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            {item.temperature === "hot" ? <Flame className="w-3 h-3" /> : <Snowflake className="w-3 h-3" />}
                            {item.temperature === "hot" ? "Chaud" : "Froid"}
                          </span>
                        </div>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                    </div>
                  ))}
                </div>
                
                {nearbyItems.length === 0 && hasLocation && !isLocating && (
                  <p className="text-center text-muted-foreground py-6">
                    Aucun repas disponible pour le moment.
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
