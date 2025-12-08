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

export const careerHubApi = createApi({
  reducerPath: 'careerHubApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['CareerHub', 'JobPreview'],
  endpoints: () => ({}),
});

export const setBaseUrl = (url) => {
  if (url !== baseUrl) {
    baseUrl = url;
  }
};

export default careerHubApi;

