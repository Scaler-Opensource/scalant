import React from 'react';
import { Space, Typography } from 'antd';
import { useJobPreview } from '../../contexts';
import { toTitleCase } from '../../utils/caseUtil';
import styles from './JobDescriptionTab.module.scss';

const Company = () => {
  const { companyData } = useJobPreview();
  const {
    name,
    employeeCount,
    companyVision,
    location,
    category,
    companyWebsite,
  } = companyData || {};

  return (
    <Space
      className={styles.contentContainer}
      direction="vertical"
      size="large"
    >
      <Typography.Link
        className={styles.descriptionTitle}
        href={companyWebsite}
        target="_blank"
      >
        About {name}
      </Typography.Link>
      {companyVision && (
        <Typography.Paragraph className={styles.descriptionText}>
          {React.createElement('div', {
            dangerouslySetInnerHTML: {
              __html: companyVision,
            },
          })}
        </Typography.Paragraph>
      )}
      {location && (
        <Space>
          <Typography.Text className={styles.descriptionTitle}>
            Office Location:
          </Typography.Text>
          <Typography.Text className={styles.descriptionText}>
            {location}
          </Typography.Text>
        </Space>
      )}
      {category && (
        <Space>
          <Typography.Text className={styles.descriptionTitle}>
            Company Category:
          </Typography.Text>
          <Typography.Text className={styles.descriptionText}>
            {toTitleCase(category)}
          </Typography.Text>
        </Space>
      )}
      {employeeCount && (
        <Space>
          <Typography.Text className={styles.descriptionTitle}>
            No. of Employees:
          </Typography.Text>
          <Typography.Text className={styles.descriptionText}>
            {employeeCount}
          </Typography.Text>
        </Space>
      )}
    </Space>
  );
};

export default Company;
