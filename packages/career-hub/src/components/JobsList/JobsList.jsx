import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedJobId, clearSelectedJobId } from '../../store/layoutSlice';
import JobCard from '../JobCard';
import jobCardStates from '../../dummyData/jobCardStates.json';

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

  return (
    <div className={className}>
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
