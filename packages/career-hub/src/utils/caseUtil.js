/**
 * Case conversion utilities
 * Converts snake_case to camelCase
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

