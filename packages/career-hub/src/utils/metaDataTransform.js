/**
 * Meta data transformation utilities
 * Transforms meta data similar to myinterviewtrainer/frontend/src/modules/job_tracker/stores/meta.js
 */

import { toCase, toCamelCaseObject } from './caseUtil';
import { capitalize } from './stringUtil';

/**
 * Transform company categories by capitalizing labels and replacing underscores
 * @param {Array} companyCategories - Array of company category objects
 * @returns {Array} Transformed company categories
 */
export const transformCompanyCategories = (companyCategories) => {
  if (!companyCategories || !Array.isArray(companyCategories)) {
    return companyCategories;
  }
  return companyCategories.map((item) => ({
    ...item,
    label: capitalize(item.label || '').replace(/_/g, ' '),
  }));
};

/**
 * Transform role types by converting labels to title case
 * @param {Array} roleTypes - Array of role type objects
 * @returns {Array} Transformed role types
 */
export const transformRoleTypes = (roleTypes) => {
  if (!roleTypes || !Array.isArray(roleTypes)) {
    return roleTypes;
  }
  return roleTypes.map((roleType) => ({
    ...roleType,
    label: toCase('titleCase', roleType.label || ''),
  }));
};

/**
 * Transform meta data object
 * Converts keys to camelCase and applies transformations
 * @param {Object} metaData - Raw meta data object
 * @returns {Object} Transformed meta data object
 */
export const transformMetaData = (metaData) => {
  if (!metaData || typeof metaData !== 'object') {
    return metaData;
  }

  // Convert object keys to camelCase
  const careersMeta = toCamelCaseObject(metaData);

  // Transform company categories
  if (careersMeta.companyCategories) {
    careersMeta.companyCategories = transformCompanyCategories(
      careersMeta.companyCategories
    );
  }

  // Transform role types
  if (careersMeta.roleTypes) {
    careersMeta.roleTypes = transformRoleTypes(careersMeta.roleTypes);
  }

  return careersMeta;
};
