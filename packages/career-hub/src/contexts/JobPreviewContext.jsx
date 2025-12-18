import React, { createContext, useContext, useState } from 'react';
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
export const JobPreviewProvider = ({
  country = 'IN',
  jobId,
  currentTab,
  openMockInterviewModal = (skillId, skillName) => {
    console.log('Method not implemented. We should get it from MIT');
    console.log(skillId, skillName);
  },
  openResume = () => {
    console.log('Method not implemented. We should get it from MIT');
  },
  skip = false,
  children,
}) => {
  const { data, isLoading, error, refetch } = useGetJobPreviewQuery(jobId, {
    skip: !jobId || skip,
  });
  const [activeTab, setActiveTab] = useState();
  const [activeApplicationId, setActiveApplicationId] = useState(null);

  const value = {
    activeApplicationId,
    setActiveApplicationId,
    activeTab,
    setActiveTab,
    country,
    jobId,
    data,
    isLoading,
    error,
    refetch,
    openMockInterviewModal,
    openResume,
    jobData: data?.jobData,
    companyData: data?.companyData,
    highlights: data?.highlights,
    eligibilityCriteria: data?.eligibilityCriteria,
    currentTab,
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
