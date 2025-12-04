/**
 * Location Formatting Utility
 */

/**
 * Format location string (handles multiple cities)
 * 
 * @param {string} preferredCities - Comma-separated cities
 * @returns {string|null} Formatted location text
 */
export const formatLocation = (preferredCities) => {
  if (!preferredCities) return null;
  
  const cities = preferredCities.split(',').map(c => c.trim()).filter(Boolean);
  
  if (cities.length === 0) return null;
  
  if (cities.length === 1) {
    return cities[0];
  }
  
  // Show first city + count of additional cities
  return `${cities[0]} +${cities.length - 1} more`;
};

