import React from 'react';
import JobsList from '../JobsList';
import styles from './RelevantJobsPage.module.scss';

function RelevantJobsPage() {
  return (
    <div className={styles.relevantJobsPage}>
      <JobsList currentTab="relevant" />
    </div>
  );
}

export default RelevantJobsPage;
