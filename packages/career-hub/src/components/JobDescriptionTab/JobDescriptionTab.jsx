import React from 'react';
import { Space, Typography } from 'antd';
import InterviewExperiencesBanner from '../InterviewExperiencesBanner';
import Company from './Company';
import Description from './Description';
import Benefits from './Benefits';
import HiringSteps from './HiringSteps';
import styles from './JobDescriptionTab.module.scss';

const BasicInfo = () => {
  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.descriptionContainer}
    >
      <Typography.Title level={3}>Job Description</Typography.Title>
      <Company />
      <Description />
      <Benefits />
    </Space>
  );
};

const PostApplicationProcess = () => {
  return (
    <Space
      direction="vertical"
      size="large"
      className={styles.descriptionContainer}
    >
      <Typography.Title level={3}>Post Application Process</Typography.Title>
      <HiringSteps />
    </Space>
  );
};

const JobDescriptionTab = () => {
  return (
    <Space direction="vertical" size="large" className={styles.container}>
      <BasicInfo />
      <PostApplicationProcess />
      <InterviewExperiencesBanner />
    </Space>
  );
};

export default JobDescriptionTab;
