import React, { useEffect, useState } from 'react';
import { Modal, Spin, Card, Tag, Button, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import styles from './BacklogTimeline.module.scss';
import { useGetBacklogQuery } from '../../context';

const { Title, Text } = Typography;

const BacklogTimeline = ({
  onCancel,
  title = 'Backlog clearance Plan',
  width = 800,
  onEditSchedule,
  open,
  ...modalProps
}) => {
  const {
    data: backlog,
    refetch,
    isLoading: loading,
    error,
  } = useGetBacklogQuery();
  const backlogItems = backlog?.backlog_data || [];
  const [aiLoader, setAiLoader] = useState(true);

  const handleCancel = () => {
    onCancel?.();
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    setAiLoader(true);
    const randomWaitTime = Math.floor(Math.random() * 3000) + 4000;
    const timer = setTimeout(() => {
      setAiLoader(false);
    }, randomWaitTime);

    return () => clearTimeout(timer);
  }, [open]);

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'finished':
        return 'success';
      case 'in_progress':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'completed':
        return <CheckCircleOutlined />;
      case 'in_progress':
        return <ClockCircleOutlined />;
      case 'pending':
        return <ExclamationCircleOutlined />;
      default:
        return <ExclamationCircleOutlined />;
    }
  };

  // const getTypeIcon = (type) => {
  //   const typeLower = type?.toLowerCase();
  //   if (typeLower.includes('interview')) return <VideoCameraOutlined />;
  //   if (typeLower.includes('lecture')) return <BookOutlined />;
  //   if (typeLower.includes('problem')) return <CodeOutlined />;
  //   if (typeLower.includes('test')) return <FileTextOutlined />;
  //   return <FileTextOutlined />;
  // };

  const getTypeColor = (type) => {
    const typeLower = type?.toLowerCase();
    if (typeLower.includes('interview')) return 'purple';
    if (typeLower.includes('lecture')) return 'blue';
    if (typeLower.includes('problem')) return 'orange';
    if (typeLower.includes('test')) return 'cyan';
    return 'default';
  };

  const formatTime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getProgressStats = () => {
    const total = backlogItems.length;
    const completed = backlogItems.filter(
      (item) => item.status?.toLowerCase() === 'completed'
    ).length;
    const inProgress = backlogItems.filter(
      (item) => item.status?.toLowerCase() === 'in_progress'
    ).length;
    const incomplete = backlogItems.filter(
      (item) => item.status?.toLowerCase() === 'pending'
    ).length;

    return { total, completed, inProgress, incomplete };
  };

  const renderTimelineItem = (item) => {
    const isComplete = item.status?.toLowerCase() === 'completed';
    const isPending = item.status?.toLowerCase() === 'pending';

    return (
      <Card
        className={isComplete ? styles.compactCard : styles.timelineCard}
        size="small"
      >
        <div
          className={isComplete ? styles.compactContent : styles.cardContent}
        >
          <div className={styles.itemHeader}>
            {/* <div className={styles.typeIcon}>
              <div
                className={styles.typeBadge}
                style={{ backgroundColor: getTypeColor(item.type) }}
              />
              <div className={styles.typeIconOverlay}>
                {getTypeIcon(item.type)}
              </div>
            </div> */}
            <div className={styles.itemInfo}>
              <Title level={5} className={styles.itemTitle}>
                {item.title}
              </Title>
              {!isComplete && (
                <div className={styles.itemMeta}>
                  <div className={styles.metaLeft}>
                    <Tag color={getTypeColor(item.type)} size="small">
                      {item.type?.split('_').join(' ').toUpperCase()}
                    </Tag>
                    <span className={styles.itemTime}>
                      <ClockCircleOutlined />
                      {formatTime(item.duration)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.itemStatus}>
              <Tag
                color={getStatusColor(item.status)}
                icon={getStatusIcon(item.status)}
                size="small"
              >
                {item.status?.split('_').join(' ').toUpperCase()}
              </Tag>
              {!isComplete && !isPending && item.link && (
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => {
                    // eslint-disable-next-line no-undef
                    window.open(item.link, '_blank');
                  }}
                  size="small"
                  className={styles.viewButton}
                >
                  Start Learning
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // Sort items: completed first, then in progress, then pending
  const sortedBacklogItems = [...backlogItems].sort((a, b) => {
    const aStatus = a.status?.toLowerCase();
    const bStatus = b.status?.toLowerCase();

    // Completed items first
    if (aStatus === 'completed' && bStatus !== 'completed') return -1;
    if (bStatus === 'completed' && aStatus !== 'completed') return 1;

    // Then in progress items
    if (aStatus === 'in_progress' && bStatus === 'pending') return -1;
    if (bStatus === 'in_progress' && aStatus === 'pending') return 1;

    return 0;
  });

  // Separate completed items and limit to last 2
  const completedItems = sortedBacklogItems
    .filter((item) => item.status?.toLowerCase() === 'complete')
    .slice(-2);

  const activeItems = sortedBacklogItems.filter(
    (item) => item.status?.toLowerCase() !== 'complete'
  );

  // Combine items: last 2 completed + all active items
  const displayItems = [...completedItems, ...activeItems];

  const progressStats = getProgressStats();

  const onEditClick = () => {
    onEditSchedule?.();
    onCancel?.();
  };

  if (loading || aiLoader) {
    return (
      <Modal
        title={title}
        open={open}
        onCancel={handleCancel}
        width={width}
        footer={null}
        className={styles.modal}
        {...modalProps}
      >
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <Title level={4}>Curating your backlog clearance plan...</Title>
        </div>
      </Modal>
    );
  }

  if (error || !backlog?.success) {
    return (
      <Modal
        title={title}
        open={open}
        onCancel={handleCancel}
        width={width}
        footer={null}
        className={styles.modal}
        {...modalProps}
      >
        <div className={styles.errorContainer}>
          <ExclamationCircleOutlined className={styles.errorIcon} />
          <Title level={4}>Something went wrong</Title>
          <Text type="secondary">{error}</Text>
          <Button type="primary" onClick={refetch}>
            Try Again
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title={
        <div className={styles.modalTitle}>
          <span>{title}</span>
          <Button className={styles.modalTitleButton} onClick={onEditClick}>
            Edit Schedule
          </Button>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      width={width}
      footer={null}
      className={styles.modal}
      {...modalProps}
    >
      <div className={styles.container}>
        {backlogItems.length === 0 ? (
          <div className={styles.emptyState}>
            <TrophyOutlined className={styles.emptyIcon} />
            <Title level={3}>🎉 All Caught Up!</Title>
            <Text type="secondary">
              Amazing! You've completed all your backlog items.
            </Text>
          </div>
        ) : (
          <div className={styles.timelineContainer}>
            {/* Simple Progress Overview */}
            <div className={styles.progressOverview}>
              <div className={styles.progressBar}>
                <div className={styles.progressInfo}>
                  <Text strong>
                    {progressStats.completed} of {progressStats.total} completed
                  </Text>
                  <Text type="secondary">
                    {Math.round(
                      (progressStats.completed / progressStats.total) * 100
                    )}
                    % done
                  </Text>
                </div>
                <div className={styles.customProgressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${Math.round(
                        (progressStats.completed / progressStats.total) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Simple Timeline */}
            <div className={styles.customTimeline}>
              {displayItems.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.timelineItem} ${styles[`status${getStatusColor(item.status).charAt(0).toUpperCase() + getStatusColor(item.status).slice(1)}`]}`}
                >
                  <div
                    className={`${styles.timelineDot} ${styles[`status${getStatusColor(item.status).charAt(0).toUpperCase() + getStatusColor(item.status).slice(1)}`]}`}
                  >
                    {getStatusIcon(item.status)}
                  </div>
                  <div className={styles.timelineContent}>
                    {renderTimelineItem(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BacklogTimeline;
