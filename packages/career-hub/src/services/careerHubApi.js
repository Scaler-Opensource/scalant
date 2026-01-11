// Career Hub RTK Query API Service
// LLD: This service handles API calls for Career Hub
// Base URL will be set by host app context (window.location.origin)
// All backend calls go through this service and data is stored in Redux

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_PATH } from '../utils/constants';

// eslint-disable-next-line no-undef
let baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}${API_BASE_PATH}`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      // Add CSRF token if available (from host app)
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-undef
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        if (csrfMeta) {
          headers.set('X-CSRF-Token', csrfMeta.content);
        }
        // Add JWT token from Redux store if available
        const state = api.getState();
        const jwt = state.scalantCareerHub?.careerHub?.jwt;
        if (jwt) {
          headers.set('Authorization', `Bearer ${jwt}`);
        }
      }
      return headers;
    },
  });
  return baseQuery(args, api, extraOptions);
};

// LLD: RTK Query API service for Career Hub
// All endpoints match backend API structure
export const careerHubApi = createApi({
  reducerPath: 'careerHubApi',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Job', 'JobList', 'Alert', 'Workflow'],
  endpoints: (builder) => ({
    // Job Listings
    getAllJobs: builder.query({
      query: (params) => ({
        url: '/fetch-all-jobs/',
        method: 'POST',
        body: params,
      }),
      providesTags: ['JobList'],
    }),
    getRelevantJobs: builder.query({
      query: (params) => ({
        url: '/relevancy/',
        method: 'POST',
        body: params,
      }),
      providesTags: ['JobList'],
    }),
    getEligibleJobs: builder.query({
      query: (params) => ({
        url: '/fetch-eligible-jobs/',
        method: 'POST',
        body: params,
      }),
      providesTags: ['JobList'],
    }),
    getRecommendedJobs: builder.query({
      query: (params) => ({
        url: '/fetch-recommended-jobs/',
        method: 'POST',
        body: params,
      }),
      providesTags: ['JobList'],
    }),
    
    // Job Details
    getJobProfile: builder.query({
      query: (jobProfileId) => ({
        url: `/job_profile/${jobProfileId}/`,
        method: 'GET',
      }),
      providesTags: (result, error, jobProfileId) => [
        { type: 'Job', id: jobProfileId },
      ],
    }),
    
    // Job Application
    updateApplicationStatus: builder.mutation({
      query: (payload) => ({
        url: '/update-application/',
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Job', 'JobList'],
    }),
    
    getJobApplicationForm: builder.query({
      query: (jobProfileId) => ({
        url: '/v1/job-applications/',
        method: 'GET',
        params: { job_profile_id: jobProfileId },
      }),
    }),
    
    submitJobApplication: builder.mutation({
      query: (payload) => ({
        url: '/v1/job-applications/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Job', 'JobList'],
    }),
    
    // Job Alerts
    getAlerts: builder.query({
      query: () => ({
        url: '/alerts/list',
        method: 'GET',
      }),
      providesTags: ['Alert'],
    }),
    
    createAlert: builder.mutation({
      query: (payload) => ({
        url: '/alerts/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Alert'],
    }),
    
    updateAlert: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/alerts/${id}`,
        method: 'UPDATE',
        body: payload,
      }),
      invalidatesTags: ['Alert'],
    }),
    
    // Workflow - Eligibility Progress
    getWorkflowProgress: builder.query({
      query: () => ({
        url: '/api/v3/careers-hub/eligibility/progress/',
        method: 'GET',
      }),
      providesTags: ['Workflow'],
    }),
  }),
});

// LLD: Helper to set base URL from host app
export const setBaseUrl = (url) => {
  if (url !== baseUrl) {
    baseUrl = url;
  }
};

// LLD: Export hooks for use in components
export const {
  useGetAllJobsQuery,
  useGetRelevantJobsQuery,
  useGetEligibleJobsQuery,
  useGetRecommendedJobsQuery,
  useGetJobProfileQuery,
  useUpdateApplicationStatusMutation,
  useGetJobApplicationFormQuery,
  useSubmitJobApplicationMutation,
  useGetAlertsQuery,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useGetWorkflowProgressQuery,
} = careerHubApi;

export default careerHubApi;

