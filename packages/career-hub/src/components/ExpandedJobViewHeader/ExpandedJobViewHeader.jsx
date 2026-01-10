import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import styles from './ExpandedJobViewHeader.module.scss';

/**
 * ExpandedJobViewHeader - Job header section (placeholder)
 * 
 * Layout Component:
 * - Will contain: CompanyLogo, JobTitleAndCompany, JobDetailsRow, JobActions
 * - Currently placeholder -
 */
const ExpandedJobViewHeader = ({
  jobData,
  companyData,
  eligibilityCriteria,
  currentTab,
  onApply,
  onSave,
  onNotInterested,
}) => {
  return (
    <Card className={styles.headerCard}>
      <div>Expanded Job View Header - Content to be added </div>
      <div>Job: {jobData?.title || 'N/A'}</div>
      <div>Company: {companyData?.name || jobData?.name || 'N/A'}</div>
    </Card>
  );
};

ExpandedJobViewHeader.propTypes = {
  jobData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  companyData: PropTypes.object,
  eligibilityCriteria: PropTypes.object,
  currentTab: PropTypes.string,
  onApply: PropTypes.func,
  onSave: PropTypes.func,
  onNotInterested: PropTypes.func,
};

ExpandedJobViewHeader.defaultProps = {
  companyData: null,
  eligibilityCriteria: null,
  currentTab: 'all',
  onApply: null,
  onSave: null,
  onNotInterested: null,
};

export default ExpandedJobViewHeader;

