import React from 'react';
import { Space, Typography } from 'antd';
import { useJobPreview } from '../../contexts';
import Recruiters from './Recruiters';
import TimelineSteps from './TimelineSteps';
import styles from './ApplicationTimelineTab.module.scss';

const Timeline = () => {
  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.descriptionContainer}
    >
      <Typography.Title level={3}>Your Application Status</Typography.Title>
      <TimelineSteps />
    </Space>
  );
};

const RecruiterDetails = () => {
  const { jobData } = useJobPreview();
  const { recruiters } = jobData || {};

  if (!recruiters || recruiters.length === 0) {
    return null;
  }
  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.descriptionContainer}
    >
      <Typography.Title level={3}>Recruiter Details</Typography.Title>
      <Recruiters />
    </Space>
  );
};

const ApplicationTimelineTab = () => {
  return (
    <Space direction="vertical" size="large" className={styles.container}>
      <Timeline />
      <RecruiterDetails />
    </Space>
  );
};

export default ApplicationTimelineTab;
