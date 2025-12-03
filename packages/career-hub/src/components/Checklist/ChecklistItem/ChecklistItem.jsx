import React from 'react';
import { Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './ChecklistItem.module.scss';

const { Text } = Typography;

const ChecklistItem = ({ step, isSelected, onSelect }) => {
  const isComplete = step.status === 'complete' || step.status === 'done';
  const stepLabel = step.label || step.module_name || 'Unnamed Step';

  if (isComplete) {
    return (
      <div className={styles.checklistItem}>
        <CheckCircleOutlined className={styles.checkIcon} style={{ color: '#52c41a' }} />
        <Text className={styles.completedLabel}>{stepLabel}</Text>
      </div>
    );
  }

  // Pending items: show unchecked icon only, not in a box
  return (
    <div 
      className={`${styles.checklistItem} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect?.(step)}
    >
      <div 
        className={styles.uncheckedIcon} 
        style={{ 
          borderColor: isSelected ? '#1890ff' : '#d9d9d9',
          backgroundColor: isSelected ? '#1890ff' : 'transparent'
        }} 
      />
      <Text className={isSelected ? styles.selectedText : styles.defaultText}>
        {stepLabel}
      </Text>
    </div>
  );
};

export default ChecklistItem;

