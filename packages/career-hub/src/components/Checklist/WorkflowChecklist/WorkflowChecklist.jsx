import React, { useState } from 'react';
import { Typography } from 'antd';
import ChecklistSection from '../ChecklistSection';
import styles from './WorkflowChecklist.module.scss';

const { Title } = Typography;

const WorkflowChecklist = ({ 
  workflowGroups = [], 
  onStepSelect, 
  showTitle = true,
  isJobIneligible = false,
}) => {
  const [selectedStepId, setSelectedStepId] = useState(null);

  const handleStepSelect = (step) => {
    setSelectedStepId(step.id);
    onStepSelect?.(step);
  };

  if (!workflowGroups || workflowGroups.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No checklist items available</p>
      </div>
    );
  }

  return (
    <div className={styles.workflowChecklist}>
      {showTitle && (
        <Title level={4} className={styles.checklistTitle}>
          Finish these to Unlock your First Job
        </Title>
      )}
      {workflowGroups.map((group, index) => (
        <ChecklistSection
          key={group.id || index}
          group={group}
          selectedStepId={selectedStepId}
          onStepSelect={handleStepSelect}
          isJobIneligible={isJobIneligible}
        />
      ))}
    </div>
  );
};

export default WorkflowChecklist;

