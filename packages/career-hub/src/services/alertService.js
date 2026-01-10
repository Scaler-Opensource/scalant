import { careerHubApi } from './baseService';

const alertService = careerHubApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAlerts: builder.query({
      query: () => ({
        url: '/job-tracker/v1/alerts/list',
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response.data || [];
      },
      providesTags: ['JobAlerts'],
    }),
    createAlert: builder.mutation({
      query: (payload) => ({
        url: '/job-tracker/v1/alerts/',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ['JobAlerts'],
    }),
    updateAlertStatus: builder.mutation({
      query: (payload) => ({
        url: '/job-tracker/v1/alerts/update-status',
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ['JobAlerts'],
    }),
    deleteAlert: builder.mutation({
      query: (id) => ({
        url: `/job-tracker/v1/alerts/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ['JobAlerts'],
    }),
    updateAlert: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/job-tracker/v1/alerts/${id}`,
        method: 'PUT',
        body: payload,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ['JobAlerts'],
    }),
  }),
});

export const {
  useFetchAlertsQuery,
  useCreateAlertMutation,
  useUpdateAlertStatusMutation,
  useDeleteAlertMutation,
  useUpdateAlertMutation,
} = alertService;

export default alertService;
