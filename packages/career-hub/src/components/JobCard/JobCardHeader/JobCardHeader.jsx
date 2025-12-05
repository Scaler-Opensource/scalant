import React from 'react';
import PropTypes from 'prop-types';
import CompanyLogo from './CompanyLogo';
import JobTitleAndCompany from './JobTitleAndCompany';
import JobCardActions from './JobCardActions';
import styles from './JobCardHeader.module.scss';

/**
 * Job Card Header component
 * Layout: Logo + Title/Company (left) | Tag + Save Button (right)
 */
const JobCardHeader = ({ jobData, companiesList, currentTab }) => {
  return (
    <div className={styles.header}>
      {/* Left: Logo + Title & Company */}
      <div className={styles.leftSection}>
        <div className={styles.logoAndTitle}>
          <div className={styles.logoWrapper}>
            <CompanyLogo
              logo={jobData.logo}
              company={jobData.company}
              companiesList={companiesList}
              companyName={jobData.name}
            />
          </div>
          <div className={styles.titleWrapper}>
            <JobTitleAndCompany
              title={jobData.title}
              companyName={jobData.name}
            />
          </div>
        </div>
      </div>

      {/* Right: Tag only */}
      <div className={styles.actionsWrapper}>
        <JobCardActions
          jobData={jobData}
          currentTab={currentTab}
        />
      </div>
    </div>
  );
};

JobCardHeader.propTypes = {
  jobData: PropTypes.object.isRequired,
  companiesList: PropTypes.object,
  currentTab: PropTypes.string
};

JobCardHeader.defaultProps = {
  companiesList: {},
  currentTab: 'all'
};

export default JobCardHeader;
