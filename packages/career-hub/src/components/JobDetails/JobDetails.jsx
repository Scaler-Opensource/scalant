import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setActiveJob } from '../../store/jobPreviewSlice';
import ExpandedJobView from '../ExpandedJobView/ExpandedJobView';

/**
 * JobDetails - Component that displays expanded job view
 *
 * ExpandedJobView uses RTK Query directly for data fetching.
 * This component just sets the active job ID in Redux for UI state tracking.
 */
function JobDetails({ jobId, className }) {
  const dispatch = useDispatch();

  // Update active job when jobId changes
  useEffect(() => {
    if (jobId) {
      dispatch(setActiveJob(jobId));
    }
  }, [jobId, dispatch]);

  if (!jobId) {
    return null;
  }

  return (
    <div className={className}>
      <ExpandedJobView jobId={jobId} isActive={!!jobId} currentTab="all" />
    </div>
  );
}

JobDetails.propTypes = {
  jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

JobDetails.defaultProps = {
  jobId: null,
  className: '',
};

export default JobDetails;
