import React from 'react';
import { useFetchPipelineJobsQuery } from '../../services/jobsService';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './SavedJobsPage.module.scss';

function SavedJobsPage() {
  const { data, isLoading, error } = useFetchPipelineJobsQuery({
    type: TAG_TO_TAB_MAPPING.saved,
  });
  const jobs = data?.jobs || data?.results || [];
  const companiesMap = data?.companiesMap || {};

  return (
    <div className={styles.savedJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.saved}
        jobs={jobs}
        companiesMap={companiesMap}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default SavedJobsPage;
