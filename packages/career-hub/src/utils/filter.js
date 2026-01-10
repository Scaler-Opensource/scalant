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

/**
 * Accumulates jobs across multiple pages, avoiding duplicates
 * Merges new jobs with existing accumulated jobs based on job IDs
 *
 * @param {Array} accumulatedJobs - Previously accumulated jobs
 * @param {Array} newJobs - New jobs to add to the accumulated list
 * @returns {Array} Combined array of jobs without duplicates
 */
export const accumulateJobs = (accumulatedJobs = [], newJobs = []) => {
  if (!newJobs || newJobs.length === 0) {
    return accumulatedJobs;
  }

  // Avoid duplicates by checking job IDs
  const existingIds = new Set(accumulatedJobs.map((job) => job.id));
  const uniqueNewJobs = newJobs.filter((job) => !existingIds.has(job.id));

  return [...accumulatedJobs, ...uniqueNewJobs];
};

/**
 * Accumulates companies map across multiple pages
 * Merges new companies map with existing accumulated map
 *
 * @param {Object} accumulatedMap - Previously accumulated companies map
 * @param {Object} newMap - New companies map to merge
 * @returns {Object} Combined companies map
 */
export const accumulateCompaniesMap = (accumulatedMap = {}, newMap = {}) => {
  return {
    ...accumulatedMap,
    ...newMap,
  };
};
