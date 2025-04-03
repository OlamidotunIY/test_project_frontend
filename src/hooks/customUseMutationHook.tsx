import api from "@/utils/api";
import { useState } from "react";

type MutationOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  refetchQuery?: () => void; // Option to pass a refetch function
};

export function useMutation<T, V>(
  url: string,
  method: "post" | "put" | "delete",
  options?: MutationOptions<T>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: { variables: V }) => {
    setIsLoading(true);
    try {
      const response = await api[method]<T>(url, variables.variables);
      if (options?.onSuccess) options.onSuccess(response.data);

      // Refetch query data if provided
      if (options?.refetchQuery) options.refetchQuery();

      return response.data;
    } catch (err) {
      setError(err as Error);
      if (options?.onError) options.onError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
