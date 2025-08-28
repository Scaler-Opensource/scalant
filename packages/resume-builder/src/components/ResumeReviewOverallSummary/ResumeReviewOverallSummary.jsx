import React from 'react';

import styles from './ResumeReviewOverallSummary.module.scss';
import { getOverallSummary } from '../../utils/resumeSteps';

const BACKGROUND_IMAGE_URL = {
  success:
    'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/132/734/original/Rectangle_17.png',
  warning:
    'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/132/730/original/Rectangle_14_%283%29.png',
  loading:
    'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/133/974/original/blue_%281%29.png?1750330356',
  error:
    'https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/133/976/original/red_%281%29.png?1750330379',
};

const TYPE_MAP = {
  success: 'success',
  warning: 'warning',
  loading: 'loading',
  error: 'error',
  no_feedback: 'no_feedback',
};

const ResumeReviewOverallSummary = ({ reviewData, isReviewLoading }) => {
  const [type, text] = getOverallSummary(reviewData, isReviewLoading);
  if (type === TYPE_MAP.no_feedback) {
    return null;
  }
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL[type]})` }}
    >
      <div className={styles.innerContainer}>
        <div
          className={
            type === TYPE_MAP.success
              ? styles.successText
              : type === TYPE_MAP.warning
                ? styles.warningText
                : type === TYPE_MAP.error
                  ? styles.errorText
                  : styles.loadingText
          }
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ResumeReviewOverallSummary;
