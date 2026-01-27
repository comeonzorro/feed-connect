import { useCallback, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationState {
  coords: Coordinates | null;
  loading: boolean;
  error: string | null;
}

interface UseGeolocationResult extends UseGeolocationState {
  requestLocation: () => void;
}

export function useGeolocation(): UseGeolocationResult {
  const [state, setState] = useState<UseGeolocationState>({
    coords: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState({
        coords: null,
        loading: false,
        error: "La géolocalisation n'est pas supportée par ce navigateur.",
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
      },
      (error) => {
        setState({
          coords: null,
          loading: false,
          error:
            error.message ||
            "Impossible de récupérer votre position. Vérifiez les permissions de géolocalisation.",
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 15000, // 15 secondes au lieu de 10
        maximumAge: 60_000,
      }
    );
  }, []);

  return {
    ...state,
    requestLocation,
  };
}

