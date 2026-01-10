import React from 'react';
import PropTypes from 'prop-types';
import JobDetailsRow from './JobDetailsRow';
import styles from './JobCardBody.module.scss';

/**
 * Job Card Body component
 * Conditionally renders job details based on card state
 */
const JobCardBody = ({
  jobData,
  cardConfig,
  userCountry,
  onSave,
  selectedJobId,
}) => {
  return (
    <div className={styles.body}>
      <JobDetailsRow
        jobData={jobData}
        cardConfig={cardConfig}
        userCountry={userCountry}
        onSave={onSave}
        selectedJobId={selectedJobId}
      />
    </div>
  );
};

JobCardBody.propTypes = {
  jobData: PropTypes.object.isRequired,
  cardConfig: PropTypes.object.isRequired,
  userCountry: PropTypes.oneOf(['IN', 'US']),
  onSave: PropTypes.func.isRequired,
  selectedJobId: PropTypes.number,
};

JobCardBody.defaultProps = {
  userCountry: 'IN',
  selectedJobId: null,
};

export default JobCardBody;
