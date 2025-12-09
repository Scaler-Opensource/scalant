import { useMemo } from 'react';
import { JOB_CARD_CONFIG } from '../utils/jobCard/constants';

/**
 * Custom hook to manage job card state and configuration
 * 
 * @param {Object} params - Hook parameters
 * @param {string} params.currentTab - Current active tab
 * @param {boolean} params.isActive - Whether card is active/selected
 * @param {Object} params.jobData - Job data object
 * @returns {Object} Card state and configuration
 */
export const useJobCardState = ({ currentTab, isActive, jobData }) => {
  // Get configuration for current tab
  const cardConfig = useMemo(() => {
    return JOB_CARD_CONFIG[currentTab] || JOB_CARD_CONFIG.all;
  }, [currentTab]);

  // Determine if body should be shown
  const shouldShowBody = useMemo(() => {
    // Always show body unless specified otherwise
    return true;
  }, []);

  // Check if job is expired
  const isExpired = useMemo(() => {
    if (!jobData.expiry) return false;
    
    return (
      new Date(jobData.expiry) < new Date() ||
      jobData.jobProfileStatus !== 'active'
    );
  }, [jobData.expiry, jobData.jobProfileStatus]);

  return {
    cardConfig,
    shouldShowBody,
    isExpired
  };
};

export default useJobCardState;
