import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

import { APPLICATION_STATUS, TAG_TO_TAB_MAPPING } from '../../utils/constants';
import { ICONS } from '../../utils/icons';
import { PRODUCT_NAME } from '../../utils/tracking';
import { useIssueScreeningCallMutation } from '../../services/screeningCallService';
import { useJobPreview } from '../../contexts';
import ActionBanner from '../ActionBanner';
import styles from './ScreeningCallBanner.module.scss';

const ScreeningCallBanner = ({ forceShow = false }) => {
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );
  const hasCompletedScreeningCall =
    userProfileData?.hasCompletedScreeningCall ?? false;
  const { analytics, jobData, currentTab } = useJobPreview();
  const { applicationStatus } = jobData || {};
  const isWithdrawn = applicationStatus === APPLICATION_STATUS.WITHDRAWN;
  const [handleScreeningCall, { isLoading }] = useIssueScreeningCallMutation();

  const handleClick = useCallback(async () => {
    const response = await handleScreeningCall();

    if (response?.data?.url) {
      globalThis.open(response.data.url, '_blank');
    } else {
      message.error('Failed to initiate screening call. Please try again.');
    }
    analytics?.click('Screening Call - Take Call', PRODUCT_NAME);
  }, [analytics, handleScreeningCall]);

  if (hasCompletedScreeningCall) {
    return null;
  }

  if (
    !forceShow &&
    (currentTab !== TAG_TO_TAB_MAPPING.applied || isWithdrawn)
  ) {
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
