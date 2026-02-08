/**
 * Extracts numeric value and suffix from a stat string
 * @param {string} str - Input like "19", "30+", "100%"
 * @returns {{ number: number, suffix: string }} - Parsed number and suffix
 *
 * @example
 * parseStatNumber("19")    // { number: 19, suffix: '' }
 * parseStatNumber("30+")   // { number: 30, suffix: '+' }
 * parseStatNumber("100%")  // { number: 100, suffix: '%' }
 */
export const parseStatNumber = (str) => {
  const numericValue = parseInt(str.replace(/\D/g, ''), 10);
  const suffix = str.replace(/\d/g, '');

  return {
    number: isNaN(numericValue) ? 0 : numericValue,
    suffix: suffix || ''
  };
};
