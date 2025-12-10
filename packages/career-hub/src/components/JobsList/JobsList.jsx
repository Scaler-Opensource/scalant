import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Spin, Alert, Space, Tag } from 'antd';
import { setSelectedJobId, clearSelectedJobId } from '../../store/layoutSlice';
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
}) {
  const dispatch = useDispatch();
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
  );

  const handleCardClick = (jobId) => {
    if (selectedJobId === jobId) {
      dispatch(clearSelectedJobId());
    } else {
      dispatch(setSelectedJobId(jobId));
    }
  };

  const handleSave = async () => {
    return Promise.resolve();
  };

  const heading =
    TAB_HEADINGS[currentTab] || TAB_HEADINGS[TAG_TO_TAB_MAPPING.all];

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
          {heading} <Tag color="green">28 Found</Tag>
        </Title>
        <Text>
          Based on your profile, preferences, and activity like applies,
          searches, and saves
        </Text>
      </Space>
      <div className={styles.jobsListContainer}>
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
          />
        ))}
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
};

JobsList.defaultProps = {
  className: '',
  currentTab: TAG_TO_TAB_MAPPING.all,
  jobs: [],
  companiesMap: {},
  isLoading: false,
  error: null,
};

export default JobsList;
