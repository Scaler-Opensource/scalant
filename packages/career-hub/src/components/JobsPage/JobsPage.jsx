import React from 'react';
import { useSelector } from 'react-redux';
import JobsLayout from '../../layouts/JobsLayout';
import JobsHeader from '../JobsHeader';
import ProfileDetails from '../ProfileDetails';
import JobDetails from '../JobDetails';
import RelevantJobsPage from '../RelevantJobsPage';
import AllJobsPage from '../AllJobsPage';
import SavedJobsPage from '../SavedJobsPage';
import AppliedJobsPage from '../AppliedJobsPage';
import { SIDER_WIDTH } from '../../utils/constants';
import styles from './JobsPage.module.scss';

function JobsPage() {
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
  );
  const currentTab = useSelector(
    (state) => state.scalantCareerHub?.filter?.tab || 'all'
  );

  const header = <JobsHeader />;
  const sider = selectedJobId ? (
    <JobDetails jobId={selectedJobId} />
  ) : (
    <ProfileDetails />
  );
  const siderWidth = selectedJobId
    ? SIDER_WIDTH.JOB_DETAILS
    : SIDER_WIDTH.PROFILE_DETAILS;

  const renderPageContent = () => {
    switch (currentTab) {
      case 'relevant':
        return <RelevantJobsPage />;
      case 'saved':
        return <SavedJobsPage />;
      case 'applications':
        return <AppliedJobsPage />;
      case 'all':
      default:
        return <AllJobsPage />;
    }
  };

  return (
    <JobsLayout
      header={header}
      sider={sider}
      siderWidth={siderWidth}
      className={styles.jobsPage}
    >
      {renderPageContent()}
    </JobsLayout>
  );
}

export default JobsPage;
