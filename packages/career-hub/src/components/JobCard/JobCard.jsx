import React from 'react';
import { Card } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import JobCardHeader from './JobCardHeader';
import JobCardBody from './JobCardBody';
import { useJobCardState } from '../../hooks/useJobCardState';
import styles from './JobCard.module.scss';

/**
 * Job Card component (Main Container)
 * 
 * Features:
 * - Conditional rendering based on isActive
 * - Click handling
 * - Save functionality
 * - Multiple eligibility states
 * - Expanded state
 */
const JobCard = ({
  jobData,
  isActive,
  currentTab,
  onClick,
  onSave,
  companiesList,
  userCountry,
  className,
  expanded
}) => {
  const { cardConfig, shouldShowBody, isExpired } = useJobCardState({
    currentTab,
    isActive,
    jobData
  });

  // Expanded state: becomes true when card is active (or explicitly set)
  const isExpanded = expanded !== undefined ? expanded : isActive;

  const handleClick = () => {
    if (onClick && !isExpired) {
      onClick(jobData.id);
    }
  };

  return (
    <Card
      hoverable={!isActive && !isExpired}
      className={classnames(
        styles.jobCard,
        {
          [styles.active]: isActive,
          [styles.expired]: isExpired,
          [styles.archived]: jobData.applicationStatus === 'Archived'
        },
        className
      )}
      onClick={handleClick}
    >
      <div className={styles.cardContent}>
        <JobCardHeader
          jobData={jobData}
          companiesList={companiesList}
          currentTab={currentTab}
        />
        {shouldShowBody && (
          <JobCardBody
            jobData={jobData}
            isActive={isActive}
            cardConfig={cardConfig}
            userCountry={userCountry}
            onSave={onSave}
          />
        )}
      </div>
    </Card>
  );
};

JobCard.propTypes = {
  jobData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.arrayOf(PropTypes.number),
    logo: PropTypes.string,
    preferredCities: PropTypes.string,
    expiry: PropTypes.string,
    jobProfileStatus: PropTypes.string,
    isRelevant: PropTypes.bool,
    applicationStatus: PropTypes.string,
    applicationLastUpdatedAt: PropTypes.string,
    minExperience: PropTypes.number,
    maxExperience: PropTypes.number,
    minCtc: PropTypes.number,
    maxCtc: PropTypes.number,
    preferredNoticePeriod: PropTypes.number,
    openForDiscussionCtc: PropTypes.bool,
    isInternship: PropTypes.bool,
    stipend: PropTypes.string,
    eligibilityCriteria: PropTypes.shape({
      isEligible: PropTypes.bool,
      reasons: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired,
  isActive: PropTypes.bool,
  currentTab: PropTypes.string,
  onClick: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  companiesList: PropTypes.object,
  userCountry: PropTypes.oneOf(['IN', 'US']),
  className: PropTypes.string,
  expanded: PropTypes.bool
};

JobCard.defaultProps = {
  isActive: false,
  currentTab: 'all',
  onClick: null,
  companiesList: {},
  userCountry: 'IN',
  className: '',
  expanded: undefined // When undefined, it will be derived from isActive
};

export default JobCard;

