import { SORTING_OPTIONS } from './constants';

/**
 * Gets the current sorting option value from the sortings array
 *
 * @param {Array} sortings - Array of sorting objects with property and direction
 * @returns {string} The matching sorting option value, or 'eligibility' as default
 */
export const getCurrentSortingValue = (sortings = []) => {
  if (!sortings || sortings.length === 0) {
    return 'eligibility'; // Default to eligibility
  }

  const currentSorting = sortings[0]; // Get first sorting item

  // Find matching option
  for (const option of Object.values(SORTING_OPTIONS)) {
    if (
      option.mapping.property === currentSorting.property &&
      option.mapping.direction === currentSorting.direction
    ) {
      return option.value;
    }
  }

  return 'eligibility'; // Default fallback
};
