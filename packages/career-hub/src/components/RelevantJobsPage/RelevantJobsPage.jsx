import React from 'react';
import { useFetchRelevantJobsQuery } from '../../services/jobsService';
import { useJobFilters, useAccumulatedJobs } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './RelevantJobsPage.module.scss';

function RelevantJobsPage() {
  const queryParams = useJobFilters();
  const { data, isLoading, error, isFetching } =
    useFetchRelevantJobsQuery(queryParams);

  const {
    accumulatedJobs,
    accumulatedCompaniesMap,
    hasMore,
    isFetchingMore,
    isLoading: isLoadingFirstPage,
  } = useAccumulatedJobs(
    data,
    isFetching,
    isLoading,
    TAG_TO_TAB_MAPPING.relevant
  );

  return (
    <div className={styles.relevantJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.relevant}
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

export default RelevantJobsPage;
