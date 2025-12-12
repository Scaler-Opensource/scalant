import React, { createContext, useContext } from 'react';
import { useGetJobPreviewQuery } from '../services/jobPreviewApi';

const JobPreviewContext = createContext(null);

/**
 * JobPreviewProvider - Provides job preview data to child components
 *
 * @param {Object} props
 * @param {number} props.jobId - The job ID to fetch data for
 * @param {boolean} props.skip - Whether to skip the query (optional)
 * @param {React.ReactNode} props.children - Child components
 */
export const JobPreviewProvider = ({ jobId, skip = false, children }) => {
  const { data, isLoading, error, refetch } = useGetJobPreviewQuery(jobId, {
    skip: !jobId || skip,
  });

  const value = {
    jobId,
    data,
    isLoading,
    error,
    refetch,
    jobData: data?.jobData,
    companyData: data?.companyData,
    highlights: data?.highlights,
    eligibilityCriteria: data?.eligibilityCriteria,
  };

  return (
    <JobPreviewContext.Provider value={value}>
      {children}
    </JobPreviewContext.Provider>
  );
};

/**
 * useJobPreview - Hook to access job preview data from context
 *
 * @returns {Object} Job preview data and loading/error states
 * @throws {Error} If used outside of JobPreviewProvider
 */
export const useJobPreview = () => {
  const context = useContext(JobPreviewContext);

  if (!context) {
    throw new Error('useJobPreview must be used within a JobPreviewProvider');
  }

  return context;
};

export default JobPreviewContext;
