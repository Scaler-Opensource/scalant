/**
 * Case conversion utilities
 * Similar to @common/lib/caseUtil
 */

/**
 * Convert snake_case string to camelCase
 * @param {string} str - String in snake_case
 * @returns {string} String in camelCase
 */
export const toCamelCase = (str) => {
  if (!str) return str;
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
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
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Convert string to different cases
 * @param {string} caseType - Type of case conversion ('camelCase', 'titleCase')
 * @param {string} str - String to convert
 * @returns {string} Converted string
 */
export const toCase = (caseType, str) => {
  if (!str || typeof str !== 'string') return str;
  switch (caseType) {
    case 'camelCase':
      return toCamelCase(str);
    case 'titleCase':
      return toTitleCase(str);
    default:
      return str;
  }
};

/**
 * Recursively convert object keys from snake_case to camelCase
 * @param {any} obj - Object to convert
 * @returns {any} Object with camelCase keys
 */
export const toCamelCaseObject = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseObject);
  }
  if (typeof obj === 'object') {
    const converted = {};
    Object.keys(obj).forEach((key) => {
      const camelKey = toCamelCase(key);
      converted[camelKey] = toCamelCaseObject(obj[key]);
    });
    return converted;
  }
  return obj;
};
