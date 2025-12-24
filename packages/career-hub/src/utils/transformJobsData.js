/**
 * Transforms JSON:API format response to flat job objects
 * @param {Object} response - The API response with data and included arrays
 * @returns {Array} - Array of transformed job objects
 */
export const transformJobsData = (response) => {
  if (!response || !response?.data || !Array.isArray(response?.data)) {
    return [];
  }

  // Create a map of companies from the included array
  const companiesMap = {};
  if (response?.included && Array.isArray(response?.included)) {
    response?.included.forEach((company) => {
      if (company.type === 'company' && company.attributes) {
        companiesMap[company.id] = company.attributes;
      }
    });
  }

  // Transform each job in the data array
  return response?.data
    .map((job) => {
      if (job.type !== 'job_profile' || !job.attributes) {
        return null;
      }

      const attributes = job.attributes;
      const relationships = job.relationships || {};

      // Get company information
      let companyData = null;
      if (relationships.company && relationships.company.data) {
        const companyId = relationships.company.data.id;
        companyData = companiesMap[companyId] || null;
      }

      // Transform the job object to match the expected format
      const transformedJob = {
        id: parseInt(job.id, 10),
        title: attributes.title || '',
        name: attributes.title || '', // JobCard expects 'name' field
        slug: attributes.slug || '',
        jobDesc: attributes.job_desc || '',
        jobDescText: attributes.job_desc_text || '',
        minExperience: attributes.min_experience
          ? parseFloat(attributes.min_experience)
          : null,
        maxExperience: attributes.max_experience
          ? parseFloat(attributes.max_experience)
          : null,
        minCtc: attributes.min_ctc ? parseFloat(attributes.min_ctc) : null,
        maxCtc: attributes.max_ctc ? parseFloat(attributes.max_ctc) : null,
        validTill: attributes.valid_till || null,
        createdAt: attributes.created_at || null,
        jobType: attributes.job_type || null,
        preferredCities: attributes.preferred_cities || '',
        preferredNoticePeriod: attributes.preferred_notice_period || null,
        meritBasedSkills: attributes.merit_based_skills || [],
        contestSkills: attributes.contest_skills || [],
        applicationStatus: attributes.application_status || null,
        expiry: attributes.expiry || null,
        applicationId: attributes.application_id || null,
        userCompanyStatus: attributes.user_company_status || null,
        applicationLastUpdatedAt: attributes.application_last_upated_at || null,
        jobSource: attributes.job_source || null,
        jobProfileId: attributes.job_profile_id || null,
        jobProfileStatus: attributes.job_profile_status || 'active',
        datePostedOn: attributes.date_posted_on || null,
        openForDiscussionCtc: attributes.open_for_discussion_ctc || false,
        appliedOn: attributes.applied_on || null,
        seniorityLevel: attributes.seniority_level || null,
        roleType: attributes.role_type || 'full_time',
        duration: attributes.duration || null,
        stipend: attributes.stipend || null,
        eligibilityCriteria: attributes.eligibility_criteria || {
          is_eligible: false,
          reasons: [],
        },
        exceptionalJob: attributes.exceptional_job || false,
        isRelevant: attributes.is_relevant || false,
        isInternship: attributes.role_type === 'internship',
        // Company information
        company: companyData
          ? [parseInt(relationships.company.data.id, 10)]
          : [],
        logo: companyData?.logo || null,
        companyName: companyData?.name || null,
        companySlug: companyData?.slug || null,
        companyLocation: companyData?.location || null,
        companyWebsite: companyData?.company_website || null,
        companyVision: companyData?.company_vision || null,
        companyTagline: companyData?.tagline || null,
        companyCategory: companyData?.category || null,
        companyEmployeeCount: companyData?.employee_count || null,
      };

      return transformedJob;
    })
    .filter(Boolean); // Remove any null entries
};

/**
 * Creates a companies map from the included array for easy lookup
 * @param {Object} response - The API response with included array
 * @returns {Object} - Map of companyId -> company data
 */
export const createCompaniesMap = (response) => {
  const companiesMap = {};
  if (response?.included && Array.isArray(response.included)) {
    response.included.forEach((company) => {
      if (company.type === 'company' && company.attributes) {
        companiesMap[company.id] = {
          id: company.id,
          ...company.attributes,
        };
      }
    });
  }
  return companiesMap;
};
