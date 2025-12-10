import React from 'react';
import { useFetchAllJobsQuery } from '../../services/jobsService';
import { useJobFilters } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './AllJobsPage.module.scss';

function AllJobsPage() {
  const queryParams = useJobFilters();
  const { data, isLoading, error } = useFetchAllJobsQuery(queryParams);
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
