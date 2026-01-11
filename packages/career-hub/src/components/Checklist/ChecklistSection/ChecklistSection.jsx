// Checklist Section Component
// LLD: Renders a single workflow group section (e.g., "Earn your certification", "Build & review resume")
// Component placement: Used in WorkflowChecklist to display each workflow group

import React from 'react';
import { Typography, Progress, Collapse, Tag } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import ChecklistItem from '../ChecklistItem';
import styles from './ChecklistSection.module.scss';

const { Title, Text } = Typography;
const { Panel } = Collapse;

// LLD: ChecklistSection Component
// Props:
//   - group: Workflow group object with label, steps, etc.
//   - selectedStepId: Currently selected step ID
//   - onStepSelect: Callback when step is selected
//   - isJobIneligible: Whether to show "Unlock First Job" progress bar
const ChecklistSection = ({
  group,
  selectedStepId,
  onStepSelect,
  isJobIneligible = false,
}) => {
  // LLD: Calculate progress percentage for this group
  const completedSteps = group.steps?.filter(
    (step) => step.status === 'complete' || step.status === 'done'
  ).length || 0;
  const totalSteps = group.steps?.length || 0;
  const progressPercentage =
    totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const isFirstJobGroup = group.label?.toLowerCase().includes('unlock') || 
                          group.label?.toLowerCase().includes('first job') ||
                          group.label?.toLowerCase().includes('mbe blocker');

  // Calculate workflow status badge
  const getStatusBadge = () => {
    if (progressPercentage === 100) return { text: 'Done', color: 'success' };
    if (progressPercentage >= 50) return { text: 'In Progress', color: 'processing' };
    return { text: 'Urgent', color: 'error' };
  };

  const statusBadge = !isJobIneligible ? getStatusBadge() : null;

  return (
    <Collapse
      defaultActiveKey={['1']}
      className={styles.checklistSection}
      expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 0 : 180} />}
    >
      <Panel
        header={
          <div className={styles.panelHeader}>
            <Title level={4} className={styles.sectionTitle}>
              {group.label}
            </Title>
            {statusBadge && (
              <Tag color={statusBadge.color}>{statusBadge.text}</Tag>
            )}
          </div>
        }
        key="1"
      >
        {group.description && (
          <Text type="secondary" className={styles.sectionDescription}>
            {group.description}
          </Text>
        )}

        <div className={styles.stepsList}>
          {group.steps?.map((step, index) => (
            <ChecklistItem
              key={step.id || index}
              step={step}
              isSelected={selectedStepId === step.id}
              onSelect={() => onStepSelect?.(step)}
            />
          ))}
        </div>

        {isFirstJobGroup && isJobIneligible && (
          <div className={styles.progressSection}>
            <Progress
              percent={progressPercentage}
              steps={totalSteps}
              strokeColor="#1890ff"
              showInfo={false}
              className={styles.fullWidthProgress}
            />
            <Text className={styles.progressText}>Unlock First Job</Text>
          </div>
        )}
      </Panel>
    </Collapse>
  );
};

export default ChecklistSection;

