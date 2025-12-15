import React from 'react';
import { Divider } from 'antd';
import {
  formatCtc,
  formatExperience,
  formatNoticePeriod,
} from '../../utils/jobCard';
import { useJobPreview } from '../../contexts';
import styles from './ExpandedJobViewHeader.module.scss';

const ExtraDetails = () => {
  const { jobData } = useJobPreview();
  const {
    minCtc,
    maxCtc,
    openForDiscussionCtc,
    isInternship,
    stipend,
    preferredNoticePeriod,
    minExperience,
    maxExperience,
  } = jobData || {};

  const ctc = formatCtc({
    minCtc,
    maxCtc,
    openForDiscussionCtc,
    isInternship,
    stipend,
  });
  const experience = formatExperience(minExperience, maxExperience);
  const noticePeriod = formatNoticePeriod(preferredNoticePeriod);

  return (
    <div className={styles.extraDetails}>
      {[ctc, experience, noticePeriod].filter(Boolean).map((detail, index) => (
        <React.Fragment key={index}>
          <div className={styles.detail}>{detail}</div>
          <Divider
            size="large"
            type="vertical"
            className={styles.extraDetailsDivider}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ExtraDetails;
