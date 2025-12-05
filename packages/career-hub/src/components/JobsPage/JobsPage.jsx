import React from 'react';
import { useSelector } from 'react-redux';
import JobsLayout from '../../layouts/JobsLayout';
import JobsHeader from '../JobsHeader';
import JobsList from '../JobsList';
import ProfileDetails from '../ProfileDetails';
import JobDetails from '../JobDetails';
import { SIDER_WIDTH } from '../../utils/constants';
import styles from './JobsPage.module.scss';

function JobsPage() {
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
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

  return (
    <JobsLayout
      header={header}
      sider={sider}
      siderWidth={siderWidth}
      className={styles.jobsPage}
    >
      <JobsList />
    </JobsLayout>
  );
}

export default JobsPage;
