import React from 'react';
import EligibilityTag from './index';
import jobCardStates from '../../../dummyData/jobCardStates.json';
import styles from './EligibilityTag.stories.module.scss';

export default {
  title: 'JobCard/EligibilityTag',
  component: EligibilityTag,
};

export const AllStates = () => (
  <div className={styles.container}>
    <div className={styles.row}>
      <span className={styles.label}>Quick Apply:</span>
      <EligibilityTag jobData={jobCardStates.quickApply} currentTab="all" />
    </div>
    <div className={styles.row}>
      <span className={styles.label}>Eligible:</span>
      <EligibilityTag jobData={jobCardStates.eligible} currentTab="all" />
    </div>
    <div className={styles.row}>
      <span className={styles.label}>Steps Pending:</span>
      <EligibilityTag jobData={jobCardStates.stepsPending} currentTab="all" />
    </div>
    <div className={styles.row}>
      <span className={styles.label}>Ineligible:</span>
      <EligibilityTag jobData={jobCardStates.ineligible} currentTab="all" />
    </div>
    <div className={styles.row}>
      <span className={styles.label}>Expired:</span>
      <EligibilityTag jobData={jobCardStates.expired} currentTab="all" />
    </div>
    <div className={styles.row}>
      <span className={styles.label}>Notice Period Mismatch:</span>
      <EligibilityTag jobData={jobCardStates.noticePeriodMismatch} currentTab="all" />
    </div>
  </div>
);

