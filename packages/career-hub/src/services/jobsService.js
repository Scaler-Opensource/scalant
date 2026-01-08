import { careerHubApi } from './baseService';
import {
  transformJobsData,
  createCompaniesMap,
} from '../utils/transformJobsData';

// Normalize API response shape to support both legacy and new `jobs_data` wrapper
const normalizeJobsResponse = (response = {}) => {
  const jobsPayload = response.jobs_data || response;
  const jobs = transformJobsData(jobsPayload);
  const companiesMap = createCompaniesMap(jobsPayload);
  const totalEntries =
    response.total_entries ??
    jobsPayload.total_entries ??
    jobsPayload?.meta?.total_entries ??
    null;

  return {
    jobs,
    companiesMap,
    results: jobs, // Backward compatibility
    totalEntries,
  };
};

const jobsService = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllJobs: builder.query({
      query: (params = {}) => ({
        url: '/job-tracker/fetch-all-jobs/',
        method: 'POST',
        body: params,
      }),
      transformResponse: normalizeJobsResponse,
      providesTags: ['Jobs'],
    }),
    fetchPipelineJobs: builder.query({
      query: (params = {}) => ({
        url: '/job-tracker/fetch-pipeline-jobs/',
        method: 'POST',
        body: params,
      }),
      transformResponse: normalizeJobsResponse,
      providesTags: ['PipelineJobs'],
    }),
    fetchRelevantJobs: builder.query({
      query: (params = {}) => ({
        url: '/job-tracker/relevancy/',
        method: 'POST',
        body: {
          ...params,
          include_exceptional_jobs: true,
        },
      }),
      transformResponse: normalizeJobsResponse,
      providesTags: ['RelevantJobs'],
    }),
  }),
});

export const {
  useFetchAllJobsQuery,
  useFetchPipelineJobsQuery,
  useFetchRelevantJobsQuery,
} = jobsService;

export default jobsService;
