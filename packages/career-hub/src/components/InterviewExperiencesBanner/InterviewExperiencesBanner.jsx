import React, { useCallback } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import { APPLICATION_STATUS } from '../../utils/constants';
import { ICONS } from '../../utils/icons';
import { useHasCompletedScreeningCall } from '../../hooks';
import { useJobPreview } from '../../contexts';
import ActionBanner from '../ActionBanner';
import styles from './InterviewExperiencesBanner.module.scss';

const INTERVIEW_QUESTIONS_URL =
  'https://companion.scaler.com/interview-experiences';

const InterviewExperiencesBanner = () => {
  const hasCompletedScreeningCall = useHasCompletedScreeningCall();
  const { jobData, companyData } = useJobPreview();
  const { appliedOn, title: jobTitle, applicationStatus } = jobData || {};
  const isWithdrawn = applicationStatus === APPLICATION_STATUS.WITHDRAWN;
  const { name: companyName } = companyData || {};

  const handleClick = useCallback(() => {
    globalThis.open(
      `${INTERVIEW_QUESTIONS_URL}?company=${encodeURIComponent(
        companyName
      )}&role=${encodeURIComponent(jobTitle)}`,
      '_blank'
    );
  }, [companyName, jobTitle]);

  if (!hasCompletedScreeningCall || !appliedOn || isWithdrawn) {
    return null;
  }

  return (
    <ActionBanner
      icon={<img src={ICONS.monitor} className={styles.monitorIcon} />}
      title="We've got the resources you need for this role"
      description="Explore Interview Experiences from Scaler learners who have attempted this before"
      buttonText="Explore"
      buttonIcon={<DoubleRightOutlined />}
      className={styles.monitorBanner}
      onClick={handleClick}
    />
  );
};

export default InterviewExperiencesBanner;
