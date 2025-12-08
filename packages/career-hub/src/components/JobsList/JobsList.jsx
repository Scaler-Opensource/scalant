import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import { setSelectedJobId, clearSelectedJobId } from '../../store/layoutSlice';
import JobCard from '../JobCard';
import jobCardStates from '../../dummyData/jobCardStates.json';
import styles from './JobsList.module.scss';

const { Title } = Typography;

const TAB_HEADINGS = {
  relevant: 'Unlocked Jobs',
  all: 'All Jobs',
  saved: 'Saved Jobs',
  applications: 'Applied Jobs',
};

function JobsList({ className, currentTab }) {
  const dispatch = useDispatch();
  const selectedJobId = useSelector(
    (state) => state.scalantCareerHub.layout.selectedJobId
  );

  // Use dummy data for job cards (only once on mount)
  const jobCards = useMemo(
    () => [
      jobCardStates.eligible,
      jobCardStates.quickApply,
      jobCardStates.stepsPending,
      jobCardStates.ineligible,
      jobCardStates.saved,
    ],
    []
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

  const heading = TAB_HEADINGS[currentTab] || TAB_HEADINGS.all;

  return (
    <div className={className}>
      <Title level={2} className={styles.heading}>
        {heading}
      </Title>
      {jobCards.map((jobData) => (
        <JobCard
          key={jobData.id}
          jobData={jobData}
          isActive={selectedJobId === jobData.id}
          currentTab={currentTab}
          onClick={handleCardClick}
          onSave={handleSave}
          companiesList={{}}
          userCountry="IN"
        />
      ))}
    </div>
  );
}

JobsList.propTypes = {
  className: PropTypes.string,
  currentTab: PropTypes.string,
};

JobsList.defaultProps = {
  className: '',
  currentTab: 'all',
};

export default JobsList;
