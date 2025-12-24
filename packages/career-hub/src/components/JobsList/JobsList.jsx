import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Spin, Alert, Space, Tag, Button } from 'antd';
import {
  initializeSavedJobs,
  setJobSavedStatus,
} from '../../store/savedJobsSlice';
import { updateFormFilters } from '../../store/filterSlice';
import { useUpdateApplicationStatusMutation } from '../../services/useUpdateApplicationStatus';
import { useInfiniteScroll, useJobQueryParams } from '../../hooks';
import { TAG_TO_TAB_MAPPING } from '../../utils/constants';
import { PRODUCT_NAME } from '../../utils/tracking';
import JobCard from '../JobCard';
import { RightOutlined } from '@ant-design/icons';

import styles from './JobsList.module.scss';
const { Title, Text } = Typography;
const TAB_HEADINGS = {
  [TAG_TO_TAB_MAPPING.relevant]: 'Preferred Jobs',
  [TAG_TO_TAB_MAPPING.all]: 'All Jobs',
  [TAG_TO_TAB_MAPPING.saved]: 'Saved Jobs',
  [TAG_TO_TAB_MAPPING.applied]: 'Applied Jobs',
};

function JobsList({
  analytics,
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
  const processCounts = useSelector(
    (state) => state.scalantCareerHub?.dashboard?.processCounts || {}
  );
  const calculatedHasMore = hasMore !== undefined ? hasMore : true;

  const [updateApplicationStatus] = useUpdateApplicationStatusMutation();

  // Use custom hook to manage job_ids and tab query params
  const { selectedJobId, updateJobId, updateTab } = useJobQueryParams({
    syncToURL: true,
    syncFromURL: false, // Don't sync from URL here, let JobsPage handle initialization
  });

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
          updateJobId(matchingJob.id);
        }
      }
    }
  }, [jobs, selectedJobId, updateJobId]);

  const handleCardClick = (jobId) => {
    analytics?.click('Jobs List - Job Card Click', PRODUCT_NAME);
    if (selectedJobId === jobId) {
      updateJobId(null);
      dispatch(updateFormFilters({ job_ids: null }));
    } else {
      updateJobId(jobId);
    }
  };

  const handleSave = async (jobProfileId, action) => {
    // Only allow saving, not unsaving
    if (action !== 'save') {
      return;
    }

    const payload = {
      job_profile_id: jobProfileId,
      update_action: 'save',
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

  const handleAllJobsClick = () => {
    analytics?.click('Jobs List - Go to All Jobs', PRODUCT_NAME);
    updateTab(TAG_TO_TAB_MAPPING.all);
  };

  const heading =
    TAB_HEADINGS[currentTab] || TAB_HEADINGS[TAG_TO_TAB_MAPPING.all];

  const getCountForTab = () => {
    return processCounts[currentTab] || 0;
  };

  if (isLoading) {
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
        <Spin size="large" className={styles.spinner} />
      </div>
    );
  }

  if (error) {
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
        <div className={styles.header}>
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
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
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
        <div className={styles.noJobsContainer}>
          <img
            src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/171/464/original/3cd470a8085619f7775acfa9e3f15053ee5eb687.png?1766383387"
            alt="No Jobs Found"
            className={styles.noJobsImage}
          />
          <Title level={3} className={styles.noJobsHeading}>
            No Suitable Roles Available at the Moment
          </Title>
          <Text className={styles.noJobsText}>
            Your current preferences do not match any active opportunities,
            Please visit the All Jobs section to explore existing job
            opportunities.
          </Text>
          <Button type="primary" onClick={handleAllJobsClick}>
            Go to All Jobs <RightOutlined />
          </Button>
        </div>
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
            analytics={analytics}
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
  analytics: PropTypes.object,
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
  currentTab: TAG_TO_TAB_MAPPING.relevant,
  jobs: [],
  companiesMap: {},
  isLoading: false,
  error: null,
  isFetchingMore: false,
  hasMore: true,
};

export default JobsList;
