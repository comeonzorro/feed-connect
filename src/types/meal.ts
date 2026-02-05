export type MealTemperature = "hot" | "cold";

export interface Meal {
  id: string;
  description: string;
  temperature: MealTemperature;
  portions: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  /**
   * Distance human-readable, calculée côté backend ou frontend
   * (ex: "150m", "1.2km"). Optionnelle pour rester flexible.
   */
  distanceLabel?: string;
}

export interface CreateMealPayload {
  description: string;
  temperature: MealTemperature;
  portions: number;
  latitude: number;
  longitude: number;
}

export interface NearbyMealsQuery {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

