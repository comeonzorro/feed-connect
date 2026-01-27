import type { CreateMealPayload, Meal, NearbyMealsQuery } from "@/types/meal";

const API_BASE_URL = import.meta.env.VITE_API_URL as string | undefined;

function getBaseUrl(): string {
  if (!API_BASE_URL) {
    // On garde une erreur explicite pour le dev si la variable n'est pas définie.
    throw new Error("VITE_API_URL n'est pas définie. Ajoutez-la dans votre fichier .env.local.");
  }
  return API_BASE_URL.replace(/\/+$/, "");
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 secondes timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || `API request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("La requête a pris trop de temps. Vérifiez votre connexion.");
    }
    throw error;
  }
}

export async function createMeal(payload: CreateMealPayload): Promise<Meal> {
  return request<Meal>("/api/meals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchNearbyMeals(query: NearbyMealsQuery): Promise<Meal[]> {
  const params = new URLSearchParams();
  params.set("latitude", String(query.latitude));
  params.set("longitude", String(query.longitude));
  if (query.radiusKm != null) {
    params.set("radiusKm", String(query.radiusKm));
  }

  return request<Meal[]>(`/api/meals/nearby?${params.toString()}`);
}

