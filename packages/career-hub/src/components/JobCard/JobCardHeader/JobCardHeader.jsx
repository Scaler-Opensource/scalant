import React from 'react';
import { Row, Col } from 'antd';
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
    <Row gutter={[12, 8]} className={styles.header}>
      {/* Left: Logo + Title & Company */}
      <Col flex="auto">
        <Row gutter={12} align="top" wrap={false}>
          <Col>
            <CompanyLogo
              logo={jobData.logo}
              company={jobData.company}
              companiesList={companiesList}
              companyName={jobData.name}
            />
          </Col>
          <Col flex="auto">
            <JobTitleAndCompany
              title={jobData.title}
              companyName={jobData.name}
            />
          </Col>
        </Row>
      </Col>

      {/* Right: Tag only */}
      <Col>
        <JobCardActions
          jobData={jobData}
          currentTab={currentTab}
        />
      </Col>
    </Row>
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
