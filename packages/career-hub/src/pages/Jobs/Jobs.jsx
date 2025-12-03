import React from 'react';
import { Typography } from 'antd';
import styles from './Jobs.module.scss';

const { Title, Paragraph } = Typography;

const Jobs = () => {
  return (
    <div className={styles.jobsPage}>
      <Title level={2}>Jobs</Title>
      <Paragraph>
        This is a placeholder for the Jobs page. Job listings will be displayed here.
      </Paragraph>
    </div>
  );
};

export default Jobs;

