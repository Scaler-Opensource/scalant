import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// eslint-disable-next-line no-undef
let baseUrl = window.location.origin;

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add CSRF token if available
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        if (csrfMeta) {
          headers.set('X-CSRF-Token', csrfMeta.content);
        }
      }
      return headers;
    },
  });
  return baseQuery(args, api, extraOptions);
};

export const backlogServiceApi = createApi({
  reducerPath: 'backlogServiceApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['BacklogLink'],
  endpoints: (builder) => ({
    getBacklog: builder.query({
      query: () => ({
        url: `/api/v3/mentee/backlog`,
        method: 'GET',
      }),
    }),
    createSchedule: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/v3/mentee/backlog`,
        method: 'POST',
        body: payload,
      }),
    }),
    getInitialData: builder.query({
      query: () => ({
        url: '/academy/mentee-dashboard/initial-load-data/',
        method: 'GET',
      }),
    }),
  }),
});

export const setBaseUrl = (url) => {
  if (url !== baseUrl) {
    baseUrl = url;
  }
};

export const {
  useGetBacklogQuery,
  useCreateScheduleMutation,
  useGetInitialDataQuery,
} = backlogServiceApi;

export default backlogServiceApi;
