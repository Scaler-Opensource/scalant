import React from 'react';
import { Space, Typography } from 'antd';
import { useJobPreview } from '../../contexts';
import CollapsableContainer from '../CollapsableContainer/CollapsableContainer';
import styles from './JobDescriptionTab.module.scss';

const Benefits = () => {
  const { jobData, country } = useJobPreview();
  const { benefits, visaSponsorship } = jobData || {};
  const isVisaSponsored = visaSponsorship === 'yes';

  if ((!benefits && !isVisaSponsored) || country !== 'US') {
    return null;
  }

  return (
    <Space
      className={styles.contentContainer}
      direction="vertical"
      size="large"
    >
      <Typography.Text className={styles.descriptionTitle}>
        Benefits
      </Typography.Text>
      <CollapsableContainer contentClassName={styles.descriptionText}>
        <ul className={styles.list}>
          {benefits?.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
          {isVisaSponsored && <li>Visa sponsorship available</li>}
        </ul>
      </CollapsableContainer>
    </Space>
  );
};

export default Benefits;
