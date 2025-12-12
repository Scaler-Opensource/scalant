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
  }),
});

export const { useFetchProcessCountsQuery } = dashboardService;

export default dashboardService;
