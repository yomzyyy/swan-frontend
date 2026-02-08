import { useState, useCallback } from 'react';

interface UseApiMutationOptions<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: string) => void;
}

interface UseApiMutationResult<T> {
  mutate: (...args: unknown[]) => Promise<T | { success: false; error: string }>;
  loading: boolean;
  error: string | null;
}

const useApiMutation = <T>(
  mutationFn: (...args: unknown[]) => Promise<T>,
  options: UseApiMutationOptions<T> = {}
): UseApiMutationResult<T> => {
  const { onSuccess, onError } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (...args: unknown[]) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(...args);

      // Support the { success, data, error } pattern used by admin services
      if (result && (result as { success?: boolean }).success === false) {
        const errMsg = (result as { error?: string }).error || 'Operation failed';
        setError(errMsg);
        onError?.(errMsg);
        return result;
      }

      onSuccess?.(result);
      return result;
    } catch (err) {
      const errMsg = (err as Error).message || 'An error occurred';
      setError(errMsg);
      onError?.(errMsg);
      return { success: false as const, error: errMsg };
    } finally {
      setLoading(false);
    }
  }, [mutationFn, onSuccess, onError]);

  return { mutate, loading, error };
};

export default useApiMutation;
