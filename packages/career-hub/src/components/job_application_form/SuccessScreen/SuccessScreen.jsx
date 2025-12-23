import React from 'react';
import { Flex, Typography } from 'antd';
import { ICONS } from '../../../utils/icons';
import ScreeningCallBanner from '../../ScreeningCallBanner';
import styles from './SuccessScreen.module.scss';

const SuccessScreen = () => {
  return (
    <Flex vertical className={styles.container}>
      <img
        src={ICONS.likeBadge}
        alt="like-badge"
        className={styles.likeBadge}
      />
      <Typography.Title level={3}>
        Application Submitted successfully!
      </Typography.Title>
      <Typography.Text className={styles.description}>
        Your job application has now been received by the team, you can track
        your status within the job details itself
      </Typography.Text>
      <ScreeningCallBanner forceShow />
    </Flex>
  );
};

export default SuccessScreen;
