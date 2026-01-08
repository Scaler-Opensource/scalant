import { careerHubApi } from './baseService';

const fitmentService = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    getFitment: builder.query({
      query: ({ jobProfileId }) => ({
        url: '/api/v3/user-resumes/job-fitment-evaluation',
        params: {
          job_profile_id: jobProfileId,
        },
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetFitmentQuery } = fitmentService;
