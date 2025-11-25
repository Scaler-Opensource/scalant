import React from 'react';
import { Tag, Typography, Flex } from 'antd';
import styles from './SkillsAndToolkit.module.scss';

const { Text } = Typography;

const SuggestedSkillsPanel = ({
  courseBasedSkills,
  selectedSkillIds,
  onSkillSelect,
}) => {
  if (!courseBasedSkills || courseBasedSkills.length === 0) {
    return null;
  }

  const handleSkillClick = (skill) => {
    const isSelected = selectedSkillIds.includes(skill.subtopic_id);
    if (isSelected) {
      return; // Don't allow re-selection
    }
    onSkillSelect?.(skill);
  };

  return (
    <div className={styles.suggestedSkillsPanel}>
      <Text strong style={{ display: 'block', marginBottom: 12 }}>
        Most popular skills across current active jobs:
      </Text>
      <Flex wrap="wrap" gap={8}>
        {courseBasedSkills.map((skill) => {
          const isSelected = selectedSkillIds.includes(skill.subtopic_id);
          return (
            <Tag
              key={skill.subtopic_id}
              className={`${styles.suggestedSkillTag} ${
                isSelected ? styles.selected : ''
              }`}
              onClick={() => handleSkillClick(skill)}
              style={{
                cursor: isSelected ? 'not-allowed' : 'pointer',
                opacity: isSelected ? 0.6 : 1,
              }}
            >
              {skill.subtopic}
            </Tag>
          );
        })}
      </Flex>
    </div>
  );
};

export default SuggestedSkillsPanel;
