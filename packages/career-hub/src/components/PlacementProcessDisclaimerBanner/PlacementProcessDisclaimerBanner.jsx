import React from 'react';
import { Flex, Typography } from 'antd';
import { InfoCircleTwoTone } from '@ant-design/icons';
import styles from './PlacementProcessDisclaimerBanner.module.scss';

const PlacementProcessDisclaimerBanner = () => {
  return (
    <Flex className={styles.container}>
      <InfoCircleTwoTone twoToneColor="#913ECE" />
      <Typography.Text>
        Our placement team has access to the same application status and updates
        that are visible to you
      </Typography.Text>
    </Flex>
  );
};

export default PlacementProcessDisclaimerBanner;
