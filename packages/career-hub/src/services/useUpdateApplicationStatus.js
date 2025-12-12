import baseService from './baseService';

const useUpdateApplicationStatusService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    updateApplicationStatus: builder.mutation({
      query: (payload) => ({
        url: `/job-tracker/update-application/`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (result, error, { job_profile_id }) => [
        { type: 'JobPreview', id: job_profile_id },
      ],
    }),
  }),
});

export const { useUpdateApplicationStatusMutation } =
  useUpdateApplicationStatusService;
