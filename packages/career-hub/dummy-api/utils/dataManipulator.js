/**
 * Utility functions for manipulating job and company data based on pagination
 */

/**
 * Generate a random numeric ID within a specified range
 * @param {number} min - Minimum ID value
 * @param {number} max - Maximum ID value
 * @returns {string} Random ID as string
 */
function generateRandomId(min = 100000, max = 999999) {
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * Generate a random ID based on page number and index
 * This ensures different pages get different IDs while maintaining randomness
 * @param {number} pageNumber - Current page number
 * @param {number} index - Index of the item
 * @param {string} type - Type of ID ('job' or 'company')
 * @returns {string} Generated ID
 */
function generatePageBasedId(pageNumber, index, type = 'job') {
  // Generate random ID with page number and index as part of the seed
  // This ensures different pages get different IDs
  const baseOffset = type === 'job' ? 100000 : 5000;
  const range = type === 'job' ? 900000 : 50000; // Range for IDs

  // Combine page number, index, and random value for uniqueness
  const randomComponent = Math.floor(Math.random() * 10000);
  const pageComponent = (pageNumber - 1) * 1000;
  const id = baseOffset + pageComponent + index * 100 + (randomComponent % 100);

  return String(id);
}

/**
 * Deep clone an object to avoid mutating the original
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Update job IDs in a job object
 * @param {Object} job - Job object
 * @param {string} newJobId - New job ID
 * @param {string} newCompanyId - New company ID
 */
function updateJobIds(job, newJobId, newCompanyId) {
  // Update main job ID
  if (job.id) {
    job.id = newJobId;
  }

  // Update job_profile_id in attributes
  if (job.attributes && job.attributes.job_profile_id) {
    job.attributes.job_profile_id = parseInt(newJobId);
  }

  // Update company ID in relationships
  if (
    job.relationships &&
    job.relationships.company &&
    job.relationships.company.data
  ) {
    job.relationships.company.data.id = newCompanyId;
  }
}

/**
 * Update company IDs in a company object
 * @param {Object} company - Company object
 * @param {string} newCompanyId - New company ID
 */
function updateCompanyIds(company, newCompanyId) {
  // Update main company ID
  if (company.id) {
    company.id = newCompanyId;
  }

  // Update company ID in attributes
  if (company.attributes && company.attributes.id) {
    company.attributes.id = parseInt(newCompanyId);
  }
}

/**
 * Manipulate job data based on page number
 * @param {Object} responseData - Original response data
 * @param {number} pageNumber - Current page number
 * @returns {Object} Modified response data with new IDs
 */
function manipulateJobData(responseData, pageNumber) {
  const clonedData = deepClone(responseData);
  const perPage = 18; // Default per_page value

  if (!clonedData.data || !Array.isArray(clonedData.data)) {
    return clonedData;
  }

  // Create a map to track company ID mappings
  const companyIdMap = new Map();

  // Process jobs in the data array
  clonedData.data.forEach((item, index) => {
    if (item.type === 'job_profile') {
      // Generate new IDs based on page number and index
      const newJobId = generatePageBasedId(pageNumber, index, 'job');
      const oldCompanyId = item.relationships?.company?.data?.id;

      // Generate or reuse company ID
      let newCompanyId;
      if (oldCompanyId && companyIdMap.has(oldCompanyId)) {
        newCompanyId = companyIdMap.get(oldCompanyId);
      } else {
        newCompanyId = generatePageBasedId(pageNumber, index, 'company');
        if (oldCompanyId) {
          companyIdMap.set(oldCompanyId, newCompanyId);
        }
      }

      // Update job IDs
      updateJobIds(item, newJobId, newCompanyId);
    }
  });

  // Process companies in the included array
  if (clonedData.included && Array.isArray(clonedData.included)) {
    clonedData.included.forEach((item, index) => {
      if (item.type === 'company') {
        const oldCompanyId = item.id;
        let newCompanyId;

        // Use mapped ID if available, otherwise generate new one
        if (companyIdMap.has(oldCompanyId)) {
          newCompanyId = companyIdMap.get(oldCompanyId);
        } else {
          // Generate a new ID for companies not referenced by jobs
          newCompanyId = generatePageBasedId(
            pageNumber,
            index + 1000,
            'company'
          );
          companyIdMap.set(oldCompanyId, newCompanyId);
        }

        updateCompanyIds(item, newCompanyId);
      }
    });
  }

  return clonedData;
}

module.exports = {
  generateRandomId,
  generatePageBasedId,
  deepClone,
  updateJobIds,
  updateCompanyIds,
  manipulateJobData,
};
