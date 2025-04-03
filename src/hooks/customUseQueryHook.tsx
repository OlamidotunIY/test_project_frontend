import api from "@/utils/api";
import { useEffect, useState } from "react";

// Define generic types for flexibility
type QueryOptions<T> = {
  enabled?: boolean; // Auto-fetch on mount
  refetchInterval?: number; // Auto refetch interval (ms)
  params?: Record<string, string | number | boolean>; // Query parameters
};

export function useQuery<T>(
  key: string,
  url: string,
  options?: QueryOptions<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const buildUrlWithParams = () => {
    if (!options?.params) return url;
    const queryParams = new URLSearchParams();

    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return `${url}?${queryParams.toString()}`;
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const finalUrl = buildUrlWithParams();
      const response = await api.get<T>(finalUrl);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData();
    }

    let interval: ReturnType<typeof setInterval> | null = null;

    if (options?.refetchInterval) {
      interval = setInterval(fetchData, options.refetchInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [url, JSON.stringify(options?.params)]);

  return { data, error, isLoading, refetch: fetchData };
}
