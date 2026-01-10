import React from 'react';
import { useFetchPipelineJobsQuery } from '../../services/jobsService';
import { useJobFilters, useAccumulatedJobs } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './AppliedJobsPage.module.scss';

function AppliedJobsPage() {
  const queryParams = useJobFilters();
  const { data, isLoading, error, isFetching } = useFetchPipelineJobsQuery({
    type: TAG_TO_TAB_MAPPING.applied,
    ...queryParams,
  });

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
    TAG_TO_TAB_MAPPING.applied
  );

  return (
    <div className={styles.appliedJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.applied}
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

export default AppliedJobsPage;
