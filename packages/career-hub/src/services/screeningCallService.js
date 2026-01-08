import baseService from './baseService';

const screeningCallService = baseService.injectEndpoints({
  endpoints: (builder) => ({
    issueScreeningCall: builder.mutation({
      query: () => ({
        url: '/api/v3/careers-hub/screening-call/',
        method: 'POST',
      }),
    }),
  }),
});

export const { useIssueScreeningCallMutation } = screeningCallService;
