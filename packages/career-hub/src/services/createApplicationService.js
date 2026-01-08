import baseService from './baseService';

const BASE_URL = '/api/v3/careers-hub/applications';

const createApplicationService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: ({ jobProfileId, utmMedium, utmSource, currentTab, utmId }) => ({
        url: BASE_URL,
        method: 'POST',
        body: {
          job_profile_id: jobProfileId,
          medium: utmMedium ?? 'ch',
          origin: utmSource ?? 'direct',
          tab_name: currentTab,
          action_type: utmId ?? 'apply',
        },
      }),
      invalidatesTags: ['Jobs', 'PipelineJobs', 'RelevantJobs'],
    }),
    getApplication: builder.query({
      query: ({ applicationId, jobProfileId, status }) => ({
        url: `${BASE_URL}/${applicationId}`,
        params: {
          job_profile_id: jobProfileId,
          step_name: status,
        },
      }),
    }),
    updateApplication: builder.mutation({
      query: ({ applicationId, payload }) => ({
        url: `${BASE_URL}/${applicationId}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Jobs', 'PipelineJobs', 'RelevantJobs'],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} = createApplicationService;

export default createApplicationService;
