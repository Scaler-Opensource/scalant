import React from 'react';
import { Space, Typography } from 'antd';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './JobCardHeader.module.scss';

const { Title, Text } = Typography;

/**
 * Job Title and Company Name component (consolidated)
 * Displays job title in blue (#006AFF) and company name below it
 */
const JobTitleAndCompany = ({ title, companyName, isExpanded }) => {
  return (
    <Space
      direction="vertical"
      size={4}
      className={classnames(styles.titleContainer, {
        [styles.titleContainerExpanded]: isExpanded,
        [styles.titleContainerCollapsed]: !isExpanded,
      })}
    >
      <Title level={5} className={styles.jobTitle} ellipsis={{ rows: 1 }}>
        {title}
      </Title>
      <Text type="secondary" ellipsis className={styles.companyName}>
        {companyName}
      </Text>
    </Space>
  );
};

JobTitleAndCompany.propTypes = {
  title: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
};

JobTitleAndCompany.defaultProps = {
  isExpanded: false,
};

export default JobTitleAndCompany;
