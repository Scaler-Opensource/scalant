import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Spin, Alert, Space, Tag } from 'antd';
import { setSelectedJobId, clearSelectedJobId } from '../../store/layoutSlice';
import {
  initializeSavedJobs,
  setJobSavedStatus,
} from '../../store/savedJobsSlice';
import { useUpdateApplicationStatusMutation } from '../../services/useUpdateApplicationStatus';
import { updateURLWithJobId } from '../../utils/filterQueryParams';
import { useInfiniteScroll } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import JobCard from '../JobCard';
import styles from './JobsList.module.scss';

const { Title, Text } = Typography;

const TAB_HEADINGS = {
  [TAG_TO_TAB_MAPPING.relevant]: 'Unlocked Jobs',
  [TAG_TO_TAB_MAPPING.all]: 'All Jobs',
  [TAG_TO_TAB_MAPPING.saved]: 'Saved Jobs',
  [TAG_TO_TAB_MAPPING.applied]: 'Applied Jobs',
};

function JobsList({
  className,
  currentTab,
  jobs = [],
  companiesMap = {},
  isLoading = false,
  error = null,
  isFetchingMore = false,
  hasMore = true,
}) {
  const dispatch = useDispatch();
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
  );
  const processCounts = useSelector(
    (state) => state.scalantCareerHub?.dashboard?.processCounts || {}
  );
  const calculatedHasMore = hasMore !== undefined ? hasMore : true;

  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  const { sentinelRef } = useInfiniteScroll({
    hasMore: calculatedHasMore,
    isLoading,
    isFetchingMore,
  });

  // Initialize saved jobs from API data when jobs are loaded
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      dispatch(initializeSavedJobs(jobs));
    }
  }, [jobs, dispatch]);

  // Auto-select job if job_ids is in URL and job is loaded
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      // Check if there's a job_ids in URL
      // eslint-disable-next-line no-undef
      const params = new URLSearchParams(window.location.search);
      const jobIdFromURL = params.get('job_ids');
      if (jobIdFromURL) {
        const jobIdNum = Number(jobIdFromURL);
        // Find the job with matching ID (check both id and jobProfileId)
        const matchingJob = jobs.find(
          (job) =>
            job.id === jobIdNum ||
            job.jobProfileId === jobIdNum ||
            String(job.id) === jobIdFromURL ||
            String(job.jobProfileId) === jobIdFromURL
        );
        // Only set if not already selected or if selected job doesn't match
        if (matchingJob && selectedJobId !== matchingJob.id) {
          dispatch(setSelectedJobId(matchingJob.id));
        }
      }
    }
  }, [jobs, selectedJobId, dispatch]);

  const handleCardClick = (jobId) => {
    if (selectedJobId === jobId) {
      dispatch(clearSelectedJobId());
      // Remove job_ids from URL
      updateURLWithJobId(null);
    } else {
      dispatch(setSelectedJobId(jobId));
      // Update URL with job_ids
      updateURLWithJobId(jobId);
    }
  };

  const handleSave = async (jobProfileId, action) => {
    // Only allow saving, not unsaving
    if (action !== 'save') {
      return;
    }

    const payload = {
      job_profile_id: jobProfileId,
      application_status: 'Saved',
    };

    const result = await updateApplicationStatus(payload).unwrap();

    // Update the saved jobs store
    dispatch(
      setJobSavedStatus({
        jobId: jobProfileId,
        status: 'Saved',
        lastUpdatedAt:
          result?.applicationLastUpdatedAt || new Date().toISOString(),
      })
    );

    return result;
  };

  const heading =
    TAB_HEADINGS[currentTab] || TAB_HEADINGS[TAG_TO_TAB_MAPPING.all];

  const getCountForTab = () => {
    return processCounts[currentTab] || 0;
  };

  if (isLoading) {
    return (
      <div className={className}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>
        <Spin size="large" className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>
        <Alert
          message="Error loading jobs"
          description={
            error?.data?.message ||
            error?.message ||
            'Failed to fetch jobs. Please try again later.'
          }
          type="error"
          showIcon
          className={styles.alert}
        />
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className={className}>
        <Title level={2} className={styles.heading}>
          {heading}
        </Title>
        <Alert
          message="No jobs found"
          description="There are no jobs available at the moment."
          type="info"
          showIcon
          className={styles.alert}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <Space direction="vertical" className={styles.header}>
        <Title level={4} className={styles.heading}>
          {heading} <Tag color="green">{getCountForTab()} Found</Tag>
        </Title>
        <Text>
          Based on your profile, preferences, and activity like applies,
          searches, and saves
        </Text>
      </Space>
      <div className={styles.jobsList}>
        {jobs.map((jobData) => (
          <JobCard
            key={jobData.id}
            jobData={jobData}
            isActive={selectedJobId === jobData.id}
            currentTab={currentTab}
            onClick={handleCardClick}
            onSave={handleSave}
            companiesList={companiesMap}
            userCountry="IN"
            selectedJobId={selectedJobId}
          />
        ))}
        {/* Sentinel element for infinite scroll */}
        {calculatedHasMore && (
          <div ref={sentinelRef} className={styles.sentinel}>
            {isFetchingMore && (
              <div className={styles.loadingMore}>
                <Spin size="small" />
                <span>Loading more jobs...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

JobsList.propTypes = {
  className: PropTypes.string,
  currentTab: PropTypes.string,
  jobs: PropTypes.arrayOf(PropTypes.object),
  companiesMap: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  isFetchingMore: PropTypes.bool,
  hasMore: PropTypes.bool,
};

JobsList.defaultProps = {
  className: '',
  currentTab: TAG_TO_TAB_MAPPING.all,
  jobs: [],
  companiesMap: {},
  isLoading: false,
  error: null,
  isFetchingMore: false,
  hasMore: true,
};

export default JobsList;
