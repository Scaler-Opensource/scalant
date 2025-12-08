import React from 'react';
import JobsList from '../JobsList';
import styles from './SavedJobsPage.module.scss';

function SavedJobsPage() {
  return (
    <div className={styles.savedJobsPage}>
      <JobsList currentTab="saved" />
    </div>
  );
}

export default SavedJobsPage;
