import React from 'react';
import JobsList from '../JobsList';
import styles from './AllJobsPage.module.scss';

function AllJobsPage() {
  return (
    <div className={styles.allJobsPage}>
      <JobsList currentTab="all" />
    </div>
  );
}

export default AllJobsPage;
