import { careerHubApi } from './baseService';
import {
  transformJobsData,
  createCompaniesMap,
} from '../utils/transformJobsData';

const jobsService = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllJobs: builder.query({
      query: (params = {}) => ({
        url: '/job-tracker/fetch-all-jobs/',
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        const jobs = transformJobsData(response);
        const companiesMap = createCompaniesMap(response);
        return {
          jobs,
          companiesMap,
          results: jobs, // Keep for backward compatibility
        };
      },
      providesTags: ['Jobs'],
    }),
    fetchPipelineJobs: builder.query({
      query: (params = {}) => ({
        url: '/job-tracker/fetch-pipeline-jobs/',
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        const jobs = transformJobsData(response);
        const companiesMap = createCompaniesMap(response);
        return {
          jobs,
          companiesMap,
          results: jobs, // Keep for backward compatibility
        };
      },
      providesTags: ['PipelineJobs'],
    }),
    fetchRelevantJobs: builder.query({
      query: (params = {}) => ({
        url: '/job-tracker/relevancy/',
        method: 'GET',
        params,
      }),
      transformResponse: (response) => {
        const jobs = transformJobsData(response);
        const companiesMap = createCompaniesMap(response);
        return {
          jobs,
          companiesMap,
          results: jobs, // Keep for backward compatibility
        };
      },
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
