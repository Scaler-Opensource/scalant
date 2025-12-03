import baseService from './baseService';

const createApplicationService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: ({ jobProfileId, utmMedium, utmSource, currentTab, utmId }) => ({
        url: '/api/v3/careers-hub/applications/',
        method: 'POST',
        body: {
          job_profile_id: jobProfileId,
          medium: utmMedium ?? 'ch',
          origin: utmSource ?? 'direct',
          tab_name: currentTab,
          action_type: utmId ?? 'apply',
        },
      }),
    }),
    getApplication: builder.query({
      query: ({ applicationId, jobProfileId, status }) => ({
        url: `/api/v3/careers-hub/applications/${applicationId}`,
        params: {
          job_profile_id: jobProfileId,
          step_name: status,
        },
      }),
    }),
  }),
});

export const { useCreateApplicationMutation, useGetApplicationQuery } =
  createApplicationService;
