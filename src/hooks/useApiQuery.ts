import { useState, useEffect, useCallback, useRef } from 'react';

interface UseApiQueryOptions<T> {
  deps?: unknown[];
  initialData?: T | null;
  enabled?: boolean;
}

interface UseApiQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useApiQuery = <T>(
  queryFn: () => Promise<T>,
  options: UseApiQueryOptions<T> = {}
): UseApiQueryResult<T> => {
  const {
    deps = [],
    initialData = null,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const queryFnRef = useRef(queryFn);

  // Keep queryFn ref up to date without triggering re-fetches
  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await queryFnRef.current();
      setData(result);
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    fetchData();
  }, [fetchData, enabled]);

  return { data, loading, error, refetch: fetchData };
};

export default useApiQuery;
