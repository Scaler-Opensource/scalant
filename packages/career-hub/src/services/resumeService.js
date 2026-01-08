import baseService from './baseService';

const resumeService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    getResumesEligibility: builder.query({
      query: ({ jobProfileId }) => ({
        url: '/api/v3/user-resumes/eligibility',
        params: {
          job_profile_id: jobProfileId,
        },
      }),
    }),
    getResumeLink: builder.query({
      query: ({ resumeId }) => ({
        url: `/api/v3/user-resumes/${resumeId}/download`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetResumesEligibilityQuery, useGetResumeLinkQuery } =
  resumeService;
