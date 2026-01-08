import React from 'react';
import { Space, Typography } from 'antd';
import { useJobPreview } from '../../contexts';
import Certification from './Certification';
import ResumeSkills from './ResumeSkills';
import OtherRequirements from './OtherRequirements';
import styles from './SkillsRequiredTab.module.scss';

const SkillsRequiredTab = () => {
  const { jobData } = useJobPreview();
  const { eligibilityCriteria } = jobData || {};

  if (!eligibilityCriteria) {
    return null;
  }

  return (
    <Space direction="vertical" size="large" className={styles.container}>
      <Typography.Title level={3}>Job Check-list</Typography.Title>
      <Certification />
      <ResumeSkills />
      <OtherRequirements />
    </Space>
  );
};

export default SkillsRequiredTab;
