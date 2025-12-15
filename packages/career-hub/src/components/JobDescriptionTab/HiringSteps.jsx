import React from 'react';
import { Steps } from 'antd';
import { useJobPreview } from '../../contexts';
import styles from './JobDescriptionTab.module.scss';

const HiringSteps = () => {
  const { jobData } = useJobPreview();
  const { hiringSteps } = jobData || {};

  if (!hiringSteps) {
    return null;
  }

  const items = hiringSteps?.map((step) => ({
    title: <span className={styles.descriptionTitle}>{step.stepName}</span>,
    description: (
      <span className={styles.descriptionText}>{step.interviewType}</span>
    ),
  }));

  return (
    <Steps className={styles.steps} current={-1} progressDot items={items} />
  );
};

export default HiringSteps;
