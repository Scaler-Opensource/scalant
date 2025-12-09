import React from 'react';
import PropTypes from 'prop-types';
import EligibilityTag from '../EligibilityTag';
import styles from './JobCardHeader.module.scss';

/**
 * Job Card Actions component
 * Contains eligibility tag only
 */
const JobCardActions = ({ jobData, currentTab }) => {
  return (
    <div className={styles.actions}>
      <EligibilityTag
        jobData={jobData}
        currentTab={currentTab}
      />
    </div>
  );
};

JobCardActions.propTypes = {
  jobData: PropTypes.object.isRequired,
  currentTab: PropTypes.string
};

JobCardActions.defaultProps = {
  currentTab: 'all'
};

export default JobCardActions;
