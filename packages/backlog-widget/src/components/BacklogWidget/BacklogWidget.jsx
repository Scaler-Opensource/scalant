import React from 'react';
import { Card, Typography, Button, Flex } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import styles from './BacklogWidget.module.scss';

const { Text, Title } = Typography;

const STATUSES = {
  onTrack: 'on-track',
  offTrack: 'off-track',
};

const STATUS_MAP = {
  [STATUSES.onTrack]: {
    title: 'On-Track',
    encouragement:
      'Good to see you take the initiative to clear the backlog! Keep up the enthusiasm',
    emoji: '🥳',
    icon: CheckCircleFilled,
    iconClass: styles.checkIcon,
  },
  [STATUSES.offTrack]: {
    title: 'Off-Track',
    encouragement:
      'You need to clear your backlog to stay on track! Keep up the enthusiasm',
    emoji: '🥺',
    icon: ExclamationCircleFilled,
    iconClass: styles.warningIcon,
  },
};

const BacklogWidget = ({ status = STATUSES.onTrack, onClick = () => { } }) => {
  const statusConfig = STATUS_MAP[status];
  const StatusIcon = statusConfig.icon;

  return (
    <Card className={styles.backlogWidget}>
      <Flex align="center" justify="space-between" gap="middle">
        <Flex align="stretch" gap="middle" flex={1}>
          <div className={styles.statusIcon}>
            <StatusIcon className={statusConfig.iconClass} />
          </div>
          <Flex vertical gap="small">
            <Title level={5} className={styles.statusTitle}>
              Your backlog clearance is:{' '}
              <span className={styles.onTrack}>{statusConfig.title}</span>
            </Title>
            <Text type="secondary" className={styles.encouragement}>
              {statusConfig.encouragement}{' '}
              <span className={styles.emoji}>{statusConfig.emoji}</span>
            </Text>
          </Flex>
        </Flex>
        <Button type="primary" className={styles.openButton} onClick={onClick}>
          Open Backlog Widget
        </Button>
      </Flex>
    </Card>
  );
};

export default BacklogWidget;
