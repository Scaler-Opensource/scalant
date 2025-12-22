import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ExpandedJobView from '../ExpandedJobView/ExpandedJobView';
import styles from './JobDetails.module.scss';

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
  onUploadFile,
  currentTab,
  onEditResume,
  onAddResume,
}) {
  if (!jobId) {
    return null;
  }

  return (
    <div className={classNames(styles.jobDetails, className)}>
      <ExpandedJobView
        onUploadFile={onUploadFile}
        country={country}
        openMockInterviewModal={openMockInterviewModal}
        openResume={openResume}
        jobId={jobId}
        isActive={!!jobId}
        currentTab={currentTab}
        onEditResume={onEditResume}
        onAddResume={onAddResume}
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
