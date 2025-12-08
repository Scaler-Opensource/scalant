import React from 'react';
import { Space } from 'antd';
import PropTypes from 'prop-types';
import styles from './JobDescriptionTab.module.scss';

/**
 * JobDescriptionTab - Tab content container for "About Role" tab
 * 
 * Layout Component:
 * - Container for job description content components
 * - Will contain: JobDescription, Benefits, VisaSponsorship, PreviousRoles, PostApplicationProcess
 * - Currently placeholder 
 */
const JobDescriptionTab = ({ jobData, companyData }) => {
  return (
    <div className={styles.jobDescriptionTab}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Content components will be added here in PR 2 */}
        <div>Job Description Tab - Content components to be added</div>
      </Space>
    </div>
  );
};

JobDescriptionTab.propTypes = {
  jobData: PropTypes.shape({
    jobDescText: PropTypes.string,
    benefits: PropTypes.string,
    visaSponsorship: PropTypes.string,
    previousRolesData: PropTypes.array,
    applicationTimeline: PropTypes.object,
    applicationStatus: PropTypes.string,
  }),
  companyData: PropTypes.object,
};

JobDescriptionTab.defaultProps = {
  jobData: {},
  companyData: {},
};

export default JobDescriptionTab;

