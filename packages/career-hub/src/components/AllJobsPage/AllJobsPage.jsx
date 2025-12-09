import React from 'react';
import { useFetchAllJobsQuery } from '../../services/jobsService';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './AllJobsPage.module.scss';

function AllJobsPage() {
  const { data, isLoading, error } = useFetchAllJobsQuery();
  const jobs = data?.jobs || data?.results || [];
  const companiesMap = data?.companiesMap || {};

  return (
    <div className={styles.allJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.all}
        jobs={jobs}
        companiesMap={companiesMap}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default AllJobsPage;
