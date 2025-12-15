/**
 * Profile utility functions
 */

import { toTitleCase } from './caseUtil';

/**
 * Parse and format preferred location string into an array of location tags
 * @param {string|null|undefined} preferredLocation - Location string (e.g., "Hyderabad/Gurgaon/Noida", "Hyderabad", "anywhere_in_india")
 * @returns {string[]} Array of formatted location strings
 */
export const parsePreferredLocations = (preferredLocation) => {
  if (!preferredLocation || typeof preferredLocation !== 'string') {
    return [];
  }

  // Handle special case for "anywhere_in_india"
  if (preferredLocation.toLowerCase() === 'anywhere_in_india') {
    return ['Anywhere In India'];
  }

  // Split by "/" and format each location
  return preferredLocation
    .split('/')
    .map((location) => location.trim())
    .filter((location) => location.length > 0)
    .map((location) => toTitleCase(location));
};

/**
 * Parse and format preferred job roles string into an array of job role tags
 * @param {string|null|undefined} preferredRole - Job role string (e.g., "Engineering Leadership/Release Engineer/Software Development Engineer (Backend)", "Engineering Leadership")
 * @returns {string[]} Array of formatted job role strings
 */
export const parsePreferredJobRoles = (preferredRole) => {
  if (!preferredRole || typeof preferredRole !== 'string') {
    return [];
  }

  // Split by "/" and trim each role
  // Note: We don't apply toTitleCase here as job roles may have specific capitalization
  // (e.g., "SDE (Backend)", "Software Development Engineer (Backend)")
  return preferredRole
    .split('/')
    .map((role) => role.trim())
    .filter((role) => role.length > 0);
};
