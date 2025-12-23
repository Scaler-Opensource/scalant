import React from 'react';
import { Space, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useJobPreview } from '../../contexts';
import CollapsableHTML from '../CollapsableHTML';
import styles from './JobDescriptionTab.module.scss';

const Description = () => {
  const { jobData } = useJobPreview();
  const { jobDescText, jobDesc } = jobData || {};

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
          html={jobDescText}
          contentClassName={styles.descriptionText}
        />
      )}
      {jobDesc && (
        <Typography.Link
          className={styles.descriptionLink}
          href={jobDesc}
          target="_blank"
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
