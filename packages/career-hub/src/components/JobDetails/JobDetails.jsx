import React from 'react';
import PropTypes from 'prop-types';
import ExpandedJobView from '../ExpandedJobView/ExpandedJobView';

/**
 * JobDetails - Component that displays expanded job view
 *
 * ExpandedJobView uses RTK Query directly for data fetching.
 * This component just sets the active job ID in Redux for UI state tracking.
 */
function JobDetails({
  country,
  openMockInterviewModal,
  openResume,
  jobId,
  className,
}) {
  if (!jobId) {
    return null;
  }

  return (
    <div className={className}>
      <ExpandedJobView
        country={country}
        openMockInterviewModal={openMockInterviewModal}
        openResume={openResume}
        jobId={jobId}
        isActive={!!jobId}
        currentTab="all"
      />
    </div>
  );
}

JobDetails.propTypes = {
  country: PropTypes.string,
  openMockInterviewModal: PropTypes.func,
  openResume: PropTypes.func,
  jobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

JobDetails.defaultProps = {
  jobId: null,
  className: '',
};

export default JobDetails;
