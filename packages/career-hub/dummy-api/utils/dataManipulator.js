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
function manipulateJobData(responseData, pageNumber, perPage = 18) {
  const hasJobsDataEnvelope = !!responseData?.jobs_data;
  const payload = deepClone(hasJobsDataEnvelope ? responseData.jobs_data : responseData);

  const baseData = Array.isArray(payload.data) ? payload.data : [];
  const baseIncluded = Array.isArray(payload.included) ? payload.included : [];

  // Prefer explicit total_entries, otherwise simulate a larger total to allow infinite scroll testing
  const totalEntries =
    responseData?.total_entries ??
    payload?.total_entries ??
    payload?.meta?.total_entries ??
    baseData.length * 5;

  const startIndex = Math.max((pageNumber - 1) * perPage, 0);
  if (startIndex >= totalEntries) {
    const emptyPayload = {
      ...payload,
      data: [],
      included: [],
    };
    return hasJobsDataEnvelope
      ? { jobs_data: emptyPayload, total_entries: totalEntries }
      : { ...emptyPayload, total_entries: totalEntries };
  }

  const count = Math.min(perPage, totalEntries - startIndex);

  // Map to keep company IDs consistent within a page
  const companyIdMap = new Map();

  // Build paginated jobs by cycling through the base data if needed
  const pageData = [];
  for (let i = 0; i < count; i += 1) {
    const sourceJob = deepClone(baseData[(startIndex + i) % baseData.length] || {});
    if (sourceJob.type === 'job_profile') {
      const newJobId = generatePageBasedId(pageNumber, i, 'job');
      const oldCompanyId = sourceJob.relationships?.company?.data?.id;

      let newCompanyId = oldCompanyId;
      if (oldCompanyId) {
        if (companyIdMap.has(oldCompanyId)) {
          newCompanyId = companyIdMap.get(oldCompanyId);
        } else {
          newCompanyId = generatePageBasedId(pageNumber, i, 'company');
          companyIdMap.set(oldCompanyId, newCompanyId);
        }
      }

      updateJobIds(sourceJob, newJobId, newCompanyId);
    }
    pageData.push(sourceJob);
  }

  // Include only companies referenced on the current page
  const pageIncluded = [];
  baseIncluded.forEach((item, index) => {
    if (item.type === 'company') {
      const oldCompanyId = item.id;
      if (companyIdMap.has(oldCompanyId)) {
        const clonedCompany = deepClone(item);
        updateCompanyIds(clonedCompany, companyIdMap.get(oldCompanyId));
        pageIncluded.push(clonedCompany);
      }
    } else {
      // Keep any non-company included items
      pageIncluded.push(deepClone(item));
    }
  });

  const resultPayload = {
    ...payload,
    data: pageData,
    included: pageIncluded,
  };

  return hasJobsDataEnvelope
    ? {
        jobs_data: resultPayload,
        total_entries: totalEntries,
      }
    : {
        ...resultPayload,
        total_entries: totalEntries,
      };
}

module.exports = {
  generateRandomId,
  generatePageBasedId,
  deepClone,
  updateJobIds,
  updateCompanyIds,
  manipulateJobData,
};
