import { useState, useCallback } from 'react';

/**
 * Generic mutation hook for create/update/delete operations.
 * Wraps async functions with loading state and callbacks.
 *
 * @param {Function} mutationFn - Async function that performs the mutation
 * @param {Object} options
 * @param {Function} options.onSuccess - Called with result on success
 * @param {Function} options.onError - Called with error message on failure
 * @returns {{ mutate: Function, loading: boolean, error: string|null }}
 */
const useApiMutation = (mutationFn, options = {}) => {
  const { onSuccess, onError } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(...args);

      // Support the { success, data, error } pattern used by admin services
      if (result && result.success === false) {
        const errMsg = result.error || 'Operation failed';
        setError(errMsg);
        onError?.(errMsg);
        return result;
      }

      onSuccess?.(result);
      return result;
    } catch (err) {
      const errMsg = err.message || 'An error occurred';
      setError(errMsg);
      onError?.(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  }, [mutationFn, onSuccess, onError]);

  return { mutate, loading, error };
};

export default useApiMutation;
