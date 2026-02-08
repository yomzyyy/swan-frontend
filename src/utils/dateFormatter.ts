/**
 * Date formatting utilities for news articles
 */

/**
 * Formats Unix timestamp to "DD MONTH YYYY" format
 * @param {number} timestamp - Unix timestamp in milliseconds
 * @returns {string} Formatted date string (e.g., "23 JUNE 2023")
 */
export const formatNewsDate = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const day = date.getDate();
  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
