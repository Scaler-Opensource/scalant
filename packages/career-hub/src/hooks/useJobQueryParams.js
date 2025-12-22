import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTab } from '../store/filterSlice';
import { setSelectedJobId, clearSelectedJobId } from '../store/layoutSlice';
import {
  updateURLWithJobId,
  getJobIdFromURL,
  updateURLWithTab,
  getTabFromURL,
} from '../utils/filterQueryParams';
import { TAG_TO_TAB_MAPPING } from '../utils/constants';

/**
 * Custom hook to manage job_ids and tab query parameters
 * Handles synchronization between URL, Redux state, and component state
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.syncToURL - Whether to update URL when state changes (default: true)
 * @param {boolean} options.syncFromURL - Whether to read from URL on mount (default: true)
 * @returns {Object} - Object containing current values and update functions
 */
function useJobQueryParams({ syncToURL = true, syncFromURL = true } = {}) {
  const dispatch = useDispatch();
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
  );
  const currentTab = useSelector(
    (state) => state.scalantCareerHub?.filter?.tab || TAG_TO_TAB_MAPPING.all
  );
  const hasInitialized = useRef(false);
  const isUpdatingFromURL = useRef(false);

  // Initialize from URL on mount (only once)
  useEffect(() => {
    if (!syncFromURL || hasInitialized.current) {
      return;
    }

    isUpdatingFromURL.current = true;
    const tabFromURL = getTabFromURL();
    const jobIdFromURL = getJobIdFromURL();

    // Set tab first (important: tab must be set before job_id)
    if (tabFromURL) {
      // Validate tab value
      const validTabs = Object.values(TAG_TO_TAB_MAPPING);
      if (validTabs.includes(tabFromURL)) {
        dispatch(setTab(tabFromURL));
      }
    }

    // Set job_id after tab is set
    if (jobIdFromURL) {
      const jobIdNum = Number(jobIdFromURL);
      if (!isNaN(jobIdNum)) {
        dispatch(setSelectedJobId(jobIdNum));
      }
    }

    hasInitialized.current = true;
    isUpdatingFromURL.current = false;
  }, [dispatch, syncFromURL]);

  // Sync tab changes to URL
  useEffect(() => {
    if (!syncToURL || isUpdatingFromURL.current || !hasInitialized.current) {
      return;
    }
    updateURLWithTab(currentTab);
  }, [currentTab, syncToURL]);

  // Sync job_id changes to URL
  useEffect(() => {
    if (!syncToURL || isUpdatingFromURL.current || !hasInitialized.current) {
      return;
    }
    if (selectedJobId) {
      updateURLWithJobId(selectedJobId);
    } else {
      updateURLWithJobId(null);
    }
  }, [selectedJobId, syncToURL]);

  /**
   * Update job_id in both Redux and URL
   * @param {number|null} jobId - The job ID to set, or null to clear
   */
  const updateJobId = (jobId) => {
    if (jobId) {
      dispatch(setSelectedJobId(jobId));
    } else {
      dispatch(clearSelectedJobId());
    }
    if (syncToURL) {
      updateURLWithJobId(jobId);
    }
  };

  /**
   * Update tab in both Redux and URL
   * @param {string} tab - The tab value to set
   */
  const updateTab = (tab) => {
    // Validate tab value
    const validTabs = Object.values(TAG_TO_TAB_MAPPING);
    if (validTabs.includes(tab)) {
      dispatch(setTab(tab));
      if (syncToURL) {
        updateURLWithTab(tab);
      }
    }
  };

  /**
   * Update both tab and job_id together
   * @param {string} tab - The tab value to set
   * @param {number|null} jobId - The job ID to set, or null to clear
   */
  const updateTabAndJobId = (tab, jobId) => {
    // Set tab first
    updateTab(tab);
    // Then set job_id
    updateJobId(jobId);
  };

  return {
    currentTab,
    selectedJobId,
    updateJobId,
    updateTab,
    updateTabAndJobId,
  };
}

export default useJobQueryParams;
