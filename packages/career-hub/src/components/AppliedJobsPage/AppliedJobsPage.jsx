import React from 'react';
import JobsList from '../JobsList';
import styles from './AppliedJobsPage.module.scss';

function AppliedJobsPage() {
  return (
    <div className={styles.appliedJobsPage}>
      <JobsList currentTab="applications" />
    </div>
  );
}

export default AppliedJobsPage;
