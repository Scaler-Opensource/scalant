import React from 'react';
import PropTypes from 'prop-types';

function JobDetails({ jobId, className }) {
  return (
    <div className={className}>
      <h1 style={{ textAlign: 'center' }}>Job Details</h1>
      <p style={{ textAlign: 'center' }}>Job ID: {jobId}</p>
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

