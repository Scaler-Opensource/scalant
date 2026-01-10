import React from 'react';
import { useFetchAllJobsQuery } from '../../services/jobsService';
import { useJobFilters, useAccumulatedJobs } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './AllJobsPage.module.scss';

function AllJobsPage() {
  const queryParams = useJobFilters();
  const { data, isLoading, error, isFetching } =
    useFetchAllJobsQuery(queryParams);

  const {
    accumulatedJobs,
    accumulatedCompaniesMap,
    hasMore,
    isFetchingMore,
    isLoading: isLoadingFirstPage,
  } = useAccumulatedJobs(data, isFetching, isLoading, TAG_TO_TAB_MAPPING.all);

  return (
    <div className={styles.allJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.all}
        jobs={accumulatedJobs}
        companiesMap={accumulatedCompaniesMap}
        isLoading={isLoadingFirstPage}
        error={error}
        isFetchingMore={isFetchingMore}
        hasMore={hasMore}
      />
    </div>
  );
}

export default AllJobsPage;
