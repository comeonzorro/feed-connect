import { useState, useEffect } from "react";
import { Utensils, Users, Heart } from "lucide-react";

interface Stats {
  shared: number;
  claimed: number;
  portions: number;
}

const StatsCounter = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data.total);
        }
      } catch (error) {
        console.error("Impossible de charger les statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Ne pas afficher si pas de stats ou si 0 repas
  if (loading || !stats || stats.shared === 0) {
    return null;
  }

  const statItems = [
    {
      icon: Utensils,
      value: stats.shared,
      label: stats.shared === 1 ? "repas partagé" : "repas partagés",
      color: "bg-gradient-warm",
    },
    {
      icon: Heart,
      value: stats.claimed,
      label: stats.claimed === 1 ? "repas récupéré" : "repas récupérés",
      color: "bg-gradient-nature",
    },
    {
      icon: Users,
      value: stats.portions,
      label: stats.portions === 1 ? "portion distribuée" : "portions distribuées",
      color: "bg-primary",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
            Notre impact
          </p>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {statItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="font-display text-2xl md:text-4xl font-bold text-foreground mb-1">
                  {item.value.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
