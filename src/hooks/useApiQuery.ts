import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic data-fetching hook that replaces the repeated
 * useState + useEffect + try/catch/finally pattern.
 *
 * @param {Function} queryFn - Async function that returns data
 * @param {Object} options
 * @param {Array} options.deps - Dependency array for re-fetching (default: [])
 * @param {*} options.initialData - Initial data value (default: null)
 * @param {boolean} options.enabled - Whether to run the query (default: true)
 * @returns {{ data: *, loading: boolean, error: string|null, refetch: Function }}
 */
const useApiQuery = (queryFn, options = {}) => {
  const {
    deps = [],
    initialData = null,
    enabled = true,
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
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
      setError(err.message || 'An error occurred');
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
