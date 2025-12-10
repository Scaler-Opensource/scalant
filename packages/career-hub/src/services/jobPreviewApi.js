import { careerHubApi } from './baseService';
import { toCamelCaseObject } from '../utils/caseUtil';

/**
 * Job Preview API Service
 * 
 * RTK Query endpoint with cache tags for automatic cache invalidation.
 * Components use useGetJobPreviewQuery hook directly.
 */
export const jobPreviewApi = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobPreview: builder.query({
      query: (jobId) => `/job-tracker/job_profile/${jobId}/`,
      providesTags: (result, error, jobId) => [
        { type: 'JobPreview', id: jobId },
        { type: 'JobPreview', id: 'LIST' },
      ],
      transformResponse: (response) => {
        // Convert response to camelCase
        const camelResponse = toCamelCaseObject(response);

        // Extract and structure data
        const jobAttributes = camelResponse?.data?.attributes || {};
        const companyAttributes =
          camelResponse?.included?.find((item) => item.type === 'company')
            ?.attributes || {};

        // Extract contest skills from job attributes
        const contestSkills = jobAttributes.contestSkills || [];

        return {
          jobData: {
            ...jobAttributes,
            contestSkills,
            // Ensure company name is available in jobData
            name: jobAttributes.name || companyAttributes?.name || 'Company',
          },
          companyData: companyAttributes,
          highlights: jobAttributes.highlights,
          eligibilityCriteria: jobAttributes.eligibilityCriteria,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetJobPreviewQuery } = jobPreviewApi;
