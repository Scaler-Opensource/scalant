import React from 'react';
import { Card, Typography, Button, Tag } from 'antd';
import {
  UserOutlined,
  StarOutlined,
  LineChartOutlined,
  LikeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import styles from './DetailsPanel.module.scss';

const { Title, Text } = Typography;

const DetailsPanel = ({ selectedStep, onActionClick }) => {
  if (!selectedStep) {
    return (
      <Card className={styles.detailsPanel}>
        <Title level={4} className={styles.emptyTitle}>
          Select a task to view details
        </Title>
        <Text type="secondary" className={styles.emptyText}>
          Click on any checklist item from the left to see its details and instructions here.
        </Text>
      </Card>
    );
  }

  const primaryDefinition = selectedStep.definitions?.[0];
  const stepType = primaryDefinition?.key || '';
  const meta = primaryDefinition?.meta || {};
  const points = meta.points || [];
  const tag = primaryDefinition?.tag;
  const title = primaryDefinition?.title || selectedStep.label;

  // Determine card type based on step
  const isMockInterview = stepType.includes('mock_interview');
  const isSkillTest = stepType.includes('skill') || stepType.includes('contest');
  const isResume = stepType.includes('resume') || 
                    selectedStep.label?.toLowerCase().includes('resume') ||
                    selectedStep.label?.toLowerCase().includes('resume builder') ||
                    selectedStep.label?.toLowerCase().includes('resume review');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'user':
        return <UserOutlined />;
      case 'star':
        return <StarOutlined />;
      default:
        return null;
    }
  };

  const getActionButton = () => {
    if (isResume) {
      return (
        <Button
          type="primary"
          icon={<FileTextOutlined />}
          size="large"
          block
          className={styles.actionButton}
          onClick={() => onActionClick?.('open-resume-builder', selectedStep)}
        >
          Open Resume Builder
        </Button>
      );
    }

    if (isSkillTest) {
      return (
        <Button
          type="primary"
          icon={<LineChartOutlined />}
          size="large"
          block
          className={styles.actionButton}
          onClick={() => onActionClick?.('start-skill-test', selectedStep)}
        >
          Start Skill Test
        </Button>
      );
    }

    // Default: Mock Interview
    return (
      <Button
        type="primary"
        icon={<LineChartOutlined />}
        size="large"
        block
        className={styles.actionButton}
        onClick={() => onActionClick?.('start-mock-interview', selectedStep)}
      >
        Start Mock Interview
      </Button>
    );
  };

  return (
    <Card className={styles.detailsPanel}>
      <div className={styles.header}>
        <Title level={3} className={styles.title}>
          {title}
        </Title>
        {tag && (
          <Tag color={isSkillTest ? 'blue' : isResume ? 'green' : 'purple'} className={styles.tag}>
            {tag}
          </Tag>
        )}
      </div>

      {points.length > 0 ? (
        <div className={styles.pointsList}>
          {points.map((point, index) => (
            <div key={index} className={styles.pointItem}>
              <span className={styles.pointIcon}>{getIcon(point.icon)}</span>
              <Text className={styles.pointText}>{point.text}</Text>
            </div>
          ))}
        </div>
      ) : isResume && (
        <div className={styles.pointsList}>
          <div className={styles.pointItem}>
            <span className={styles.pointIcon}><FileTextOutlined /></span>
            <Text className={styles.pointText}>Build an ATS-friendly resume with our guided builder</Text>
          </div>
          <div className={styles.pointItem}>
            <span className={styles.pointIcon}><StarOutlined /></span>
            <Text className={styles.pointText}>Get suggestions and improvements from industry experts</Text>
          </div>
        </div>
      )}

      {getActionButton()}

      {(meta.learner_cleared_interview || meta.learner_cleared_skill) && (
        <div className={styles.stats}>
          <LikeOutlined className={styles.statsIcon} />
          <Text type="secondary" className={styles.statsText}>
            {meta.learner_cleared_interview || meta.learner_cleared_skill} learners have completed and applying for jobs
          </Text>
        </div>
      )}
    </Card>
  );
};

export default DetailsPanel;

