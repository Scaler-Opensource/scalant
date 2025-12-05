import React from 'react';
import PropTypes from 'prop-types';
import JobDetailsRow from './JobDetailsRow';
import styles from './JobCardBody.module.scss';

/**
 * Job Card Body component
 * Conditionally renders job details based on card state
 */
const JobCardBody = ({ jobData, isActive, cardConfig, userCountry, onSave }) => {
  return (
    <div className={styles.body}>
      <JobDetailsRow
        jobData={jobData}
        isActive={isActive}
        cardConfig={cardConfig}
        userCountry={userCountry}
        onSave={onSave}
      />
    </div>
  );
};

JobCardBody.propTypes = {
  jobData: PropTypes.object.isRequired,
  isActive: PropTypes.bool,
  cardConfig: PropTypes.object.isRequired,
  userCountry: PropTypes.oneOf(['IN', 'US']),
  onSave: PropTypes.func.isRequired
};

JobCardBody.defaultProps = {
  isActive: false,
  userCountry: 'IN'
};

export default JobCardBody;
