import React from 'react';
import { Tag, Typography, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { formatExperience } from '../../utils/resumeUtils';
import styles from './SkillsAndToolkit.module.scss';

const { Text } = Typography;

const SelectedSkillsPanel = ({ selectedSkills, onRemove, onEdit }) => {
  if (!selectedSkills || selectedSkills.length === 0) {
    return null;
  }

  const handleTagClick = (skill) => {
    onEdit?.(skill);
  };

  const handleRemove = (e, skillId) => {
    e.stopPropagation();
    onRemove?.(skillId);
  };

  return (
    <div className={styles.selectedSkillsPanel}>
      <Text strong style={{ display: 'block', marginBottom: 12 }}>
        Selected Skills:
      </Text>
      <Flex wrap="wrap" gap={8}>
        {selectedSkills.map((skill) => {
          const experience = skill.proficiency_period;
          const experienceText =
            experience && experience.years !== undefined
              ? experience.months === 0 && experience.years === 0
                ? '(Fresher)'
                : `(${formatExperience(experience.years, experience.months, true)})`
              : '';

          return (
            <Tag
              key={skill.skill_id}
              className={styles.selectedSkillTag}
              onClick={() => handleTagClick(skill)}
              style={{ cursor: 'pointer' }}
            >
              <span>
                {skill.name} {experienceText}
              </span>
              <CloseOutlined
                className={styles.closeIcon}
                onClick={(e) => handleRemove(e, skill.skill_id)}
              />
            </Tag>
          );
        })}
      </Flex>
    </div>
  );
};

export default SelectedSkillsPanel;
