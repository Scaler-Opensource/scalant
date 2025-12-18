import React from 'react';
import { Alert, App, Card, Spin } from 'antd';
import { JobPreviewProvider } from '../../contexts';
import { useGetJobPreviewQuery } from '../../services/jobPreviewApi';
import ExpandedJobViewBody from '../ExpandedJobViewBody';
import ExpandedJobViewHeader from '../ExpandedJobViewHeader';
import JobApplicationForm from '../job_application_form';
import JobHighlights from '../JobHighlights';
import InterviewExperiencesBanner from '../InterviewExperiencesBanner';
import ScreeningCallBanner from '../ScreeningCallBanner';
import styles from './ExpandedJobView.module.scss';

const ExpandedJobViewContent = () => {
  return (
    <div className={styles.expandedJobView}>
      <ExpandedJobViewHeader />
      <JobHighlights />
      <ScreeningCallBanner />
      <InterviewExperiencesBanner />
      <ExpandedJobViewBody />
    </div>
  );
};

const ExpandedJobView = ({
  country,
  openMockInterviewModal,
  openResume,
  jobId,
  isActive,
  currentTab,
  onUploadFile,
}) => {
  const { data, isLoading, isFetching, error } = useGetJobPreviewQuery(jobId, {
    skip: !jobId || !isActive,
  });

  if (!isActive || !jobId) {
    return null;
  }

  if (isLoading || isFetching) {
    return (
      <Card className={`${styles.expandedJobView} ${styles.loadingCard}`}>
        <Spin size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={styles.expandedJobView}>
        <Alert
          type="error"
          message="Failed to load job details"
          description={
            error?.data?.message || error?.message || 'Please try again later'
          }
          showIcon
        />
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <App>
      <JobPreviewProvider
        country={country}
        openMockInterviewModal={openMockInterviewModal}
        openResume={openResume}
        jobId={jobId}
        skip={!isActive}
      >
        <ExpandedJobViewContent currentTab={currentTab} />
        <JobApplicationForm
          currentTab={currentTab}
          onUploadFile={onUploadFile}
        />
      </JobPreviewProvider>
    </App>
  );
};

export default ExpandedJobView;
