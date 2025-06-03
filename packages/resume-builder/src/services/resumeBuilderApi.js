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

export const resumeBuilderApi = createApi({
  reducerPath: 'resumeBuilderApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['ResumeLink'],
  endpoints: (builder) => ({
    updateResumeDetails: builder.mutation({
      query: ({ resumeId, payload }) => ({
        url: `/api/v3/user-resumes/${resumeId}/`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['ResumeLink'],
    }),
    getResumeLink: builder.query({
      query: ({ resumeId }) => ({
        url: `/api/v3/user-resumes/${resumeId}/download`,
        method: 'GET',
      }),
      providesTags: (result, error, { resumeId }) => [
        { type: 'ResumeLink', id: resumeId },
      ],
    }),
    updateResumePreferences: builder.mutation({
      query: ({ payload }) => ({
        url: `/resume/preferences/update`,
        method: 'PATCH',
        body: {
          ...payload,
        },
      }),
      invalidatesTags: ['ResumeLink'],
    }),
    getResumeReview: builder.mutation({
      query: ({ resumeId }) => ({
        url: `/api/v3/user-resumes/${resumeId}/request_resume_review`,
        method: 'POST',
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
  useUpdateResumeDetailsMutation,
  useGetResumeLinkQuery,
  useUpdateResumePreferencesMutation,
  useGetResumeReviewMutation,
} = resumeBuilderApi;

export default resumeBuilderApi;
