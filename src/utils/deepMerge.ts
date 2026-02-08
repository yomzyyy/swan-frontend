/**
 * Deep merges API data over defaults.
 * - Arrays from API replace defaults entirely (not concatenated).
 * - Null/undefined API values fall back to defaults.
 * - Plain objects are recursively merged.
 */
export const deepMerge = <T extends object>(defaults: T, apiData: Partial<T> | null | undefined): T => {
  if (!apiData) return defaults;
  if (!defaults) return apiData as T;

  const result = { ...defaults };

  for (const key of Object.keys(apiData) as Array<keyof T>) {
    const apiValue = apiData[key];
    const defaultValue = defaults[key];

    if (apiValue === null || apiValue === undefined) {
      continue;
    }

    if (Array.isArray(apiValue)) {
      (result as Record<string, unknown>)[key as string] = apiValue;
    } else if (
      typeof apiValue === 'object' &&
      typeof defaultValue === 'object' &&
      !Array.isArray(defaultValue)
    ) {
      (result as Record<string, unknown>)[key as string] = deepMerge(
        defaultValue as Record<string, unknown>,
        apiValue as Record<string, unknown>
      );
    } else {
      (result as Record<string, unknown>)[key as string] = apiValue;
    }
  }

  return result;
};
