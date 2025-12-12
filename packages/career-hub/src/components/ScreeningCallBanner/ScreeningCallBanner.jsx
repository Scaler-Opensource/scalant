import React, { useCallback } from 'react';
import { message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

import { ICONS } from '../../utils/icons';
import { useIssueScreeningCallMutation } from '../../services/screeningCallService';
import { useHasCompletedScreeningCall } from '../../hooks';
import { useJobPreview } from '../../contexts';
import ActionBanner from '../ActionBanner';
import styles from './ScreeningCallBanner.module.scss';

const ScreeningCallBanner = () => {
  const hasCompletedScreeningCall = useHasCompletedScreeningCall();
  const { jobData } = useJobPreview();
  const { appliedOn } = jobData || {};
  const [handleScreeningCall, { isLoading }] = useIssueScreeningCallMutation();

  const handleClick = useCallback(async () => {
    const response = await handleScreeningCall();

    if (response?.data?.url) {
      globalThis.open(response.data.url, '_blank');
    } else {
      message.error('Failed to initiate screening call. Please try again.');
    }
  }, [handleScreeningCall]);

  if (hasCompletedScreeningCall || !appliedOn) {
    return null;
  }

  return (
    <ActionBanner
      icon={<img src={ICONS.airplay} className={styles.screeningCallIcon} />}
      title="Complete your 5-minute Screening Call now"
      description="Verify your details with a quick screening call and become a priority applicant for us"
      buttonText="Take Call"
      buttonIcon={<PhoneOutlined className={styles.screeningCallButtonIcon} />}
      className={styles.screeningCallBanner}
      onClick={handleClick}
      isLoading={isLoading}
    />
  );
};

export default ScreeningCallBanner;
