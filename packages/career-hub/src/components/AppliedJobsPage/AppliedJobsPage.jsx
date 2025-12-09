import React from 'react';
import { useFetchPipelineJobsQuery } from '../../services/jobsService';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobsList from '../JobsList';
import styles from './AppliedJobsPage.module.scss';

function AppliedJobsPage() {
  const { data, isLoading, error } = useFetchPipelineJobsQuery({
    type: TAG_TO_TAB_MAPPING.applied,
  });
  const jobs = data?.jobs || data?.results || [];
  const companiesMap = data?.companiesMap || {};

  return (
    <div className={styles.appliedJobsPage}>
      <JobsList
        currentTab={TAG_TO_TAB_MAPPING.applied}
        jobs={jobs}
        companiesMap={companiesMap}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default AppliedJobsPage;
