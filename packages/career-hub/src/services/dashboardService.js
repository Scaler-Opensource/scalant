import { careerHubApi } from './baseService';

const dashboardService = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProcessCounts: builder.query({
      query: () => ({
        url: '/job-tracker/fetch-process-counts/',
        method: 'POST',
      }),
      transformResponse: (response) => {
        return response.process_counts || {};
      },
      providesTags: ['ProcessCounts'],
    }),
    updateJobStatus: builder.mutation({
      query: (payload) => ({
        url: '/academy/mentee/jobs-mapping/update-status',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useUpdateJobStatusMutation } = dashboardService;

export default dashboardService;
