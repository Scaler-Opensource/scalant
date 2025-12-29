import React from 'react';
import { Row, Col, Flex } from 'antd';
import PropTypes from 'prop-types';
import CompanyLogo from '../../CompanyLogo';
import JobTitleAndCompany from './JobTitleAndCompany';
import JobCardActions from './JobCardActions';
import styles from './JobCardHeader.module.scss';

const JobCardHeader = ({ jobData, companiesList, currentTab, isExpanded }) => {
  // Get company name: first try jobData.companyName, then fallback to companiesList
  const companyName =
    jobData.companyName ||
    (jobData.company &&
      jobData.company[0] &&
      companiesList[jobData.company[0]]?.name) ||
    '';

  return (
    <Row gutter={[12, 8]} className={styles.header}>
      <Col flex="auto">
        <Row gutter={12} align="top" wrap={false}>
          <Col>
            <CompanyLogo
              logo={jobData.logo}
              company={jobData.company}
              companiesList={companiesList}
              companyName={companyName}
            />
          </Col>
          <Col flex="auto">
            <JobTitleAndCompany
              title={jobData.title}
              companyName={companyName}
              isExpanded={isExpanded}
            />
          </Col>
        </Row>
      </Col>
      {/* Right: Tag only */}
      <Flex>
        <JobCardActions jobData={jobData} currentTab={currentTab} />
      </Flex>
    </Row>
  );
};

JobCardHeader.propTypes = {
  jobData: PropTypes.object.isRequired,
  companiesList: PropTypes.object,
  currentTab: PropTypes.string,
  isExpanded: PropTypes.bool,
};

JobCardHeader.defaultProps = {
  companiesList: {},
  currentTab: 'all',
  isExpanded: false,
};

export default JobCardHeader;
