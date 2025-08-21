import React from 'react';
import { Card, Typography, Button, Flex } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';
import styles from './BacklogWidget.module.scss';
import { useGetBacklogQuery } from '../../services/backlogService';
import withBacklogStore from '../../hoc/withBacklogStore';

const { Text, Title } = Typography;

const STATUSES = {
  onTrack: 'on_track',
  offTrack: 'off_track',
  backLogInProgress: 'backlog_in_progress',
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
  [STATUSES.backLogInProgress]: {
    title: 'Off-Track',
    encouragement:
      'You need to clear your backlog to stay on track! Keep up the enthusiasm',
    emoji: '🥺',
    icon: ExclamationCircleFilled,
    iconClass: styles.warningIcon,
  },
};

const BacklogWidget = ({ createSchedule, showBacklogPlan }) => {
  const { data: backlog } = useGetBacklogQuery();
  const statusConfig = STATUS_MAP[backlog?.status];
  const StatusIcon = statusConfig?.icon;

  if (!backlog?.success || !StatusIcon) {
    return null;
  }

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
        {backlog?.status === STATUSES.offTrack && (
          <Button
            type="primary"
            className={styles.openButton}
            onClick={createSchedule}
          >
            Create a Schedule!
          </Button>
        )}
        {backlog?.status === STATUSES.backLogInProgress && (
          <Button
            type="primary"
            className={styles.openButton}
            onClick={showBacklogPlan}
          >
            Clear Backlog!
          </Button>
        )}
      </Flex>
    </Card>
  );
};

export default withBacklogStore(BacklogWidget);
