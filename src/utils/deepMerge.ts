/**
 * Deep merges API data over defaults.
 * - Arrays from API replace defaults entirely (not concatenated).
 * - Null/undefined API values fall back to defaults.
 * - Plain objects are recursively merged.
 */
export const deepMerge = (defaults, apiData) => {
  if (!apiData) return defaults;
  if (!defaults) return apiData;

  const result = { ...defaults };

  for (const key of Object.keys(apiData)) {
    const apiValue = apiData[key];
    const defaultValue = defaults[key];

    if (apiValue === null || apiValue === undefined) {
      continue;
    }

    if (Array.isArray(apiValue)) {
      result[key] = apiValue;
    } else if (
      typeof apiValue === 'object' &&
      typeof defaultValue === 'object' &&
      !Array.isArray(defaultValue)
    ) {
      result[key] = deepMerge(defaultValue, apiValue);
    } else {
      result[key] = apiValue;
    }
  }

  return result;
};
