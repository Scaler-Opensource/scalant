import React from 'react';
import { Space, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useJobPreview } from '../../contexts';
import { PRODUCT_NAME } from '../../utils/tracking';
import CollapsableHTML from '../CollapsableHTML';
import styles from './JobDescriptionTab.module.scss';

const Description = () => {
  const { jobData, analytics } = useJobPreview();
  const { jobDescText, jobDesc } = jobData || {};

  const handleKnowMoreClick = () => {
    analytics?.click('Job Description - Know More', PRODUCT_NAME);
  };

  return (
    <Space
      className={styles.contentContainer}
      direction="vertical"
      size="large"
    >
      <Typography.Text className={styles.descriptionTitle}>
        About the Role
      </Typography.Text>
      {jobDescText && (
        <CollapsableHTML
          analytics={analytics}
          html={jobDescText}
          contentClassName={styles.descriptionText}
        />
      )}
      {jobDesc && (
        <Typography.Link
          className={styles.descriptionLink}
          href={jobDesc}
          target="_blank"
          onClick={handleKnowMoreClick}
        >
          <Space>
            <LinkOutlined />
            Know More
          </Space>
        </Typography.Link>
      )}
    </Space>
  );
};

export default Description;
