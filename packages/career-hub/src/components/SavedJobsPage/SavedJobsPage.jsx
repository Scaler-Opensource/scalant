import React from 'react';
import PropTypes from 'prop-types';
import { useFetchPipelineJobsQuery } from '../../services/jobsService';
import { useJobFilters, useAccumulatedJobs } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './SavedJobsPage.module.scss';

function SavedJobsPage({ analytics }) {
  const queryParams = useJobFilters();
  const { data, isLoading, error, isFetching } = useFetchPipelineJobsQuery({
    type: TAG_TO_TAB_MAPPING.saved,
    ...queryParams,
  });

  const {
    accumulatedJobs,
    accumulatedCompaniesMap,
    hasMore,
    isFetchingMore,
    isLoading: isLoadingFirstPage,
  } = useAccumulatedJobs(data, isFetching, isLoading, TAG_TO_TAB_MAPPING.saved);

  return (
    <div className={styles.savedJobsPage}>
      <JobsList
        analytics={analytics}
        currentTab={TAG_TO_TAB_MAPPING.saved}
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

export default SavedJobsPage;
