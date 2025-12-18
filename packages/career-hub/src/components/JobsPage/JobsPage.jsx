import React, { useEffect } from 'react';
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
}) {
  const dispatch = useDispatch();
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
  );
  const currentTab = useSelector(
    (state) => state.scalantCareerHub?.filter?.tab || TAG_TO_TAB_MAPPING.all
  );

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
      onUploadFile={onUploadFile}
      country={country}
      openMockInterviewModal={openMockInterviewModal}
      openResume={openResume}
      jobId={selectedJobId}
    />
  ) : (
    <ProfileDetails />
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
