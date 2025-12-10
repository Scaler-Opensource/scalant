import React from 'react';
import { useFetchRelevantJobsQuery } from '../../services/jobsService';
import { useJobFilters } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './RelevantJobsPage.module.scss';

function RelevantJobsPage() {
  const queryParams = useJobFilters();
  const { data, isLoading, error } = useFetchRelevantJobsQuery(queryParams);
  const jobs = data?.jobs || data?.results || [];
  const companiesMap = data?.companiesMap || {};

  return (
    <div className={styles.relevantJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.relevant}
        jobs={jobs}
        companiesMap={companiesMap}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default RelevantJobsPage;
