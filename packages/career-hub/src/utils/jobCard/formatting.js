/**
 * Job Card Formatting Utilities
 * References:
 * - frontend/src/modules/job_tracker/utils/job.js
 * - frontend/src/modules/job_tracker/components/jobList/components/CtcInfo.js
 */

/**
 * Format experience text
 * Reference: frontend/src/modules/job_tracker/utils/job.js (lines 28-42)
 *
 * @param {number} minExperience - Minimum experience in months
 * @param {number} maxExperience - Maximum experience in months
 * @returns {string} Formatted experience text
 */
export const formatExperience = (minExperience, maxExperience) => {
  if (minExperience === 0 && maxExperience === 0) {
    return 'Fresher';
  }

  const minYears = Math.floor(minExperience / 12);
  const maxYears = Math.floor(maxExperience / 12);

  if (minYears === maxYears) {
    return `${minYears}y Experience`;
  }

  if (maxYears === 0) {
    return 'Fresher';
  }

  if (minYears === 0) {
    return `${maxYears}y Experience`;
  }

  return `${minYears}y - ${maxYears}y Experience`;
};

/**
 * Format CTC text
 * Reference: frontend/src/modules/job_tracker/components/jobList/components/CtcInfo.js
 *
 * @param {Object} params - CTC parameters
 * @returns {string} Formatted CTC text
 */
export const formatCtc = ({
  minCtc,
  maxCtc,
  openForDiscussionCtc,
  isInternship,
  stipend,
  userCountry = 'IN',
}) => {
  // Internship case
  if (isInternship) {
    if (stipend) {
      return `₹${stipend}/month`;
    }
    return 'Unpaid Internship';
  }

  // CTC case
  const currencySymbol = userCountry === 'US' ? '$' : '₹';
  const unit = userCountry === 'US' ? 'K' : 'L';

  // Check if min or max CTC is not available
  if (
    minCtc === null ||
    maxCtc === null ||
    minCtc === undefined ||
    maxCtc === undefined
  ) {
    return `${currencySymbol} (Flexible)`;
  }

  let ctcText = `${currencySymbol}${minCtc}${unit} - ${currencySymbol}${maxCtc}${unit} CTC`;

  if (minCtc === maxCtc) {
    ctcText = `${currencySymbol}${minCtc}${unit} CTC`;
  }

  if (openForDiscussionCtc) {
    return `${ctcText} (Negotiable)`;
  }

  return ctcText;
};

/**
 * Format notice period text
 * Reference: frontend/src/modules/job_tracker/utils/job.js (lines 52-56)
 *
 * @param {number} days - Notice period in days
 * @returns {string} Formatted notice period text
 */
export const formatNoticePeriod = (days) => {
  if (!days || days === 0) {
    return 'Immediate';
  }

  return `${days} days Notice Period`;
};

/**
 * Format date to DD/MM/YYYY
 * Reference: Used by SaveButton for "Saved on" text
 *
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
