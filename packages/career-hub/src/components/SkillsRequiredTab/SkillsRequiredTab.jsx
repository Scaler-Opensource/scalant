import React from 'react';
import { Space } from 'antd';
import PropTypes from 'prop-types';
import styles from './SkillsRequiredTab.module.scss';

/**
 * SkillsRequiredTab - Tab content container for "Requirements" tab
 * 
 * Layout Component:
 * - Container for skills requirement components
 * - Will contain: ExpertSkillsTable, TechStackTable, AdditionalCriteriaTable
 * - Currently placeholder - content components to be added in PR 2
 */
const SkillsRequiredTab = ({ eligibilityCriteria, jobData }) => {
  if (!eligibilityCriteria) {
    return null;
  }

  return (
    <div className={styles.skillsRequiredTab}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Content components will be added here in PR 2 */}
        <div>Skills Required Tab - Content components to be added</div>
      </Space>
    </div>
  );
};

SkillsRequiredTab.propTypes = {
  eligibilityCriteria: PropTypes.object,
  jobData: PropTypes.shape({
    contestSkills: PropTypes.array,
  }),
};

SkillsRequiredTab.defaultProps = {
  eligibilityCriteria: null,
  jobData: {},
};

export default SkillsRequiredTab;

