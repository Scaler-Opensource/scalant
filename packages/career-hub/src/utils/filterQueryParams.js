/**
 * Utility functions to sync filter state with URL query parameters
 * Only filters under the 'filters' key are synced to query params
 */

/**
 * Serialize filters object to URL query params
 * @param {Object} filters - The filters object from Redux state
 * @returns {URLSearchParams} - URLSearchParams object with filter values
 */
export const serializeFiltersToQueryParams = (filters) => {
  // eslint-disable-next-line no-undef
  const params = new URLSearchParams();

  if (!filters || typeof filters !== 'object') {
    return params;
  }

  Object.keys(filters).forEach((key) => {
    const value = filters[key];

    // Skip empty values
    if (value === undefined || value === null || value === '') {
      return;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length > 0) {
        // For arrays, join with comma or use multiple params
        params.append(key, value.join(','));
      }
    }
    // Handle objects (like mbe_skill_ids)
    else if (typeof value === 'object') {
      // For complex objects, stringify them
      try {
        params.append(key, JSON.stringify(value));
      } catch {
        // Skip if can't stringify
      }
    }
    // Handle primitive values
    else {
      params.append(key, String(value));
    }
  });

  return params;
};

/**
 * Deserialize URL query params to filters object
 * @param {URLSearchParams|string} searchParams - URLSearchParams or search string
 * @returns {Object} - Filters object compatible with Redux state
 */
export const deserializeQueryParamsToFilters = (searchParams) => {
  const filters = {};

  // Handle both URLSearchParams and string
  const params =
    typeof searchParams === 'string'
      ? // eslint-disable-next-line no-undef
        new URLSearchParams(searchParams)
      : searchParams;

  params.forEach((value, key) => {
    // Skip non-filter keys (we only want filter keys)
    // All filter keys should be added here

    // Try to parse as JSON first (for complex objects)
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') {
        filters[key] = parsed;
        return;
      }
    } catch {
      // Not JSON, continue with normal parsing
    }

    // Check if it's a comma-separated array
    if (value.includes(',')) {
      filters[key] = value.split(',').filter((item) => item.trim() !== '');
    }
    // Check if it's a number
    else if (!isNaN(value) && value !== '') {
      const numValue = Number(value);
      // Only use number if it's a valid number and not NaN
      if (!isNaN(numValue)) {
        filters[key] = numValue;
      } else {
        filters[key] = value;
      }
    }
    // String value
    else {
      filters[key] = value;
    }
  });

  return filters;
};

/**
 * Update URL query params with filters without page reload
 * @param {Object} filters - The filters object from Redux state
 */
export const updateURLWithFilters = (filters) => {
  if (typeof window === 'undefined') {
    return;
  }

  const params = serializeFiltersToQueryParams(filters);

  const newURL = params.toString()
    ? // eslint-disable-next-line no-undef
      `${window.location.pathname}?${params.toString()}`
    : // eslint-disable-next-line no-undef
      window.location.pathname;

  // Use replaceState to avoid adding to browser history
  // eslint-disable-next-line no-undef
  window.history.replaceState({}, '', newURL);
};

/**
 * Get filters from current URL query params
 * @returns {Object} - Filters object compatible with Redux state
 */
export const getFiltersFromURL = () => {
  if (typeof window === 'undefined') {
    return {};
  }

  // eslint-disable-next-line no-undef
  return deserializeQueryParamsToFilters(window.location.search);
};

/**
 * Update URL with job_ids query param
 * @param {number|null} jobId - The job ID to set, or null to remove
 */
export const updateURLWithJobId = (jobId) => {
  if (typeof window === 'undefined') {
    return;
  }

  // eslint-disable-next-line no-undef
  const params = new URLSearchParams(window.location.search);

  if (jobId) {
    params.set('job_ids', String(jobId));
  } else {
    params.delete('job_ids');
  }

  const newURL = params.toString()
    ? // eslint-disable-next-line no-undef
      `${window.location.pathname}?${params.toString()}`
    : // eslint-disable-next-line no-undef
      window.location.pathname;

  // Use replaceState to avoid adding to browser history
  // eslint-disable-next-line no-undef
  window.history.replaceState({}, '', newURL);
};

/**
 * Get job_ids from current URL query params
 * @returns {string|null} - The job_ids value or null if not present
 */
export const getJobIdFromURL = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  // eslint-disable-next-line no-undef
  const params = new URLSearchParams(window.location.search);
  const jobIds = params.get('job_ids');
  return jobIds || null;
};

/**
 * Update URL with tab query param
 * @param {string|null} tab - The tab value to set, or null to remove
 */
export const updateURLWithTab = (tab) => {
  if (typeof window === 'undefined') {
    return;
  }

  // eslint-disable-next-line no-undef
  const params = new URLSearchParams(window.location.search);

  if (tab) {
    params.set('tab', String(tab));
  } else {
    params.delete('tab');
  }

  const newURL = params.toString()
    ? // eslint-disable-next-line no-undef
      `${window.location.pathname}?${params.toString()}`
    : // eslint-disable-next-line no-undef
      window.location.pathname;

  // Use replaceState to avoid adding to browser history
  // eslint-disable-next-line no-undef
  window.history.replaceState({}, '', newURL);
};

/**
 * Get tab from current URL query params
 * @returns {string|null} - The tab value or null if not present
 */
export const getTabFromURL = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  // eslint-disable-next-line no-undef
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  return tab || null;
};
