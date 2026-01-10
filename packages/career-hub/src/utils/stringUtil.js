/**
 * String utility functions
 */

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export const toTitleCase = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format experience in years and months to a readable string
 * @param {number|null|undefined} years - Number of years of experience
 * @param {number|null|undefined} months - Number of months of experience
 * @returns {string} Formatted experience string (e.g., "2 yrs 3 months Experience", "0 months Experience")
 */
export const formatExperience = (years, months) => {
  // Handle null/undefined values
  const yearsNum = years ?? 0;
  const monthsNum = months ?? 0;

  const parts = [];

  // Add years part
  if (yearsNum > 0) {
    parts.push(`${yearsNum} ${yearsNum === 1 ? 'yr' : 'yrs'}`);
  }

  // Add months part (always include months, even if 0)
  parts.push(`${monthsNum} ${monthsNum === 1 ? 'month' : 'months'}`);

  return `${parts.join(' ')} Experience`;
};
