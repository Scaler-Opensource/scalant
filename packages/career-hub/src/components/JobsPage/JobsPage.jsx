import React, { useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import JobsLayout from '../../layouts/JobsLayout';
import JobsHeader from '../JobsHeader';
import ProfileDetails from '../ProfileDetails';
import JobDetails from '../JobDetails';
import RelevantJobsPage from '../RelevantJobsPage';
import AllJobsPage from '../AllJobsPage';
import SavedJobsPage from '../SavedJobsPage';
import AppliedJobsPage from '../AppliedJobsPage';
import FilterDrawer from '../FilterDrawer';
import JobAlertModal from '../JobAlert/JobAlertModal';
import {
  setProcessCounts,
  setUserProfileData,
} from '../../store/dashboardSlice';
import { updateFiltersFromForm } from '../../store/filterSlice';
import { getFiltersFromURL } from '../../utils/filterQueryParams';
import { useJobQueryParams } from '../../hooks';
import {
  SIDER_WIDTH,
  TAG_TO_TAB_MAPPING,
  DEFAULT_PROCESS_COUNTS,
} from '../../utils/constants';
import styles from './JobsPage.module.scss';

function JobsPage({
  country,
  openMockInterviewModal,
  openResume,
  processCounts = DEFAULT_PROCESS_COUNTS,
  userProfileData,
  onUploadFile,
  onViewResume,
  onEditPreferences,
  onEditResume,
  onAddResume,
}) {
  const dispatch = useDispatch();
  const currentTab = useSelector(
    (state) =>
      state.scalantCareerHub?.filter?.tab || TAG_TO_TAB_MAPPING.relevant
  );
  const hasInitializedFilters = useRef(false);

  // Use custom hook to manage job_ids and tab query params
  // This hook handles reading from URL and syncing to Redux state
  const { selectedJobId } = useJobQueryParams({
    syncToURL: true,
    syncFromURL: true, // Read from URL on mount
  });

  // Initialize filters from URL query params synchronously before render
  // This prevents the API from being called with default filters first
  useLayoutEffect(() => {
    if (!hasInitializedFilters.current) {
      const urlFilters = getFiltersFromURL();

      // Combine all filters in a single dispatch
      const filtersToApply = { ...urlFilters };

      // Add job_ids to filters for API calls if present in URL
      // eslint-disable-next-line no-undef
      const params = new URLSearchParams(window.location.search);
      const jobIdFromURL = params.get('job_ids');
      if (jobIdFromURL) {
        filtersToApply.job_ids = [jobIdFromURL];
      }

      // Apply all filters in a single dispatch to avoid duplicate API calls
      if (Object.keys(filtersToApply).length > 0) {
        dispatch(updateFiltersFromForm(filtersToApply));
      }

      hasInitializedFilters.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProcessCounts(processCounts));
  }, [processCounts, dispatch]);

  useEffect(() => {
    if (userProfileData) {
      dispatch(setUserProfileData(userProfileData));
    }
  }, [userProfileData, dispatch]);

  const header = <JobsHeader />;
  const sider = selectedJobId ? (
    <JobDetails
      currentTab={currentTab}
      onUploadFile={onUploadFile}
      country={country}
      openMockInterviewModal={openMockInterviewModal}
      openResume={openResume}
      jobId={selectedJobId}
      onEditResume={onEditResume}
      onAddResume={onAddResume}
    />
  ) : (
    <ProfileDetails
      onViewResume={onViewResume}
      onEditPreferences={onEditPreferences}
    />
  );
  const siderWidth = selectedJobId
    ? SIDER_WIDTH.JOB_DETAILS
    : SIDER_WIDTH.PROFILE_DETAILS;

  const renderPageContent = () => {
    switch (currentTab) {
      case TAG_TO_TAB_MAPPING.relevant:
        return <RelevantJobsPage />;
      case TAG_TO_TAB_MAPPING.saved:
        return <SavedJobsPage />;
      case TAG_TO_TAB_MAPPING.applied:
        return <AppliedJobsPage />;
      case TAG_TO_TAB_MAPPING.all:
      default:
        return <AllJobsPage />;
    }
  };

  return (
    <>
      <JobsLayout
        header={header}
        sider={sider}
        siderWidth={siderWidth}
        className={styles.jobsPage}
      >
        {renderPageContent()}
      </JobsLayout>
      <FilterDrawer />
      <JobAlertModal />
    </>
  );
}

JobsPage.propTypes = {
  processCounts: PropTypes.shape({
    all: PropTypes.number,
    relevant: PropTypes.number,
    draft: PropTypes.number,
    applications: PropTypes.number,
    saved: PropTypes.number,
    archived: PropTypes.number,
  }),
  userProfileData: PropTypes.object,
};

export default JobsPage;
