import React from 'react';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
  ClockCircleOutlined,
  RocketTwoTone,
  UnlockTwoTone
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { determineJobTag } from '../../../utils/jobCard/eligibility';
import styles from './EligibilityTag.module.scss';

const ICON_MAP = {
  CheckCircleOutlined: CheckCircleOutlined,
  CheckCircleTwoTone: CheckCircleTwoTone,
  CloseCircleOutlined: CloseCircleOutlined,
  ClockCircleOutlined: ClockCircleOutlined,
  RocketTwoTone: RocketTwoTone,
  UnlockTwoTone: UnlockTwoTone
};

/**
 * Eligibility Tag component
 * Shows job eligibility status with appropriate icon and color
 */
const EligibilityTag = ({ jobData, currentTab }) => {
  const tagData = determineJobTag(jobData, jobData.eligibilityCriteria);
  
  if (!tagData) return null;

  const IconComponent = ICON_MAP[tagData.icon];
  
  // Get specific class name for each tag type
  const getTagClassName = () => {
    const baseClass = styles.tag;
    switch (tagData.tag) {
      case 'quick_apply':
        return `${baseClass} ${styles.quickApply}`;
      case 'eligible':
        return `${baseClass} ${styles.eligible}`;
      case 'steps_to_apply':
        return `${baseClass} ${styles.stepsPending}`;
      case 'ineligible':
        return `${baseClass} ${styles.ineligible}`;
      case 'notice_period_mismatch':
        return `${baseClass} ${styles.noticePeriodMismatch}`;
      case 'expired':
        return `${baseClass} ${styles.expired}`;
      default:
        return baseClass;
    }
  };

  // Handle icon with two-tone colors
  const renderIcon = () => {
    if (!IconComponent) return null;
    
    // For two-tone icons, apply color props
    if (tagData.icon === 'CheckCircleTwoTone' || 
        tagData.icon === 'UnlockTwoTone' || 
        tagData.icon === 'RocketTwoTone') {
      return <IconComponent twoToneColor={tagData.color} />;
    }
    
    return <IconComponent />;
  };

  // Don't use Ant Design color prop for custom styled tags (only for expired)
  const shouldUseAntdColor = tagData.tag === 'expired';

  return (
    <Tag
      icon={renderIcon()}
      color={shouldUseAntdColor ? tagData.antdColor : undefined}
      className={getTagClassName()}
    >
      {tagData.text}
    </Tag>
  );
};

EligibilityTag.propTypes = {
  jobData: PropTypes.shape({
    isRelevant: PropTypes.bool,
    expiry: PropTypes.string,
    jobProfileStatus: PropTypes.string,
    eligibilityCriteria: PropTypes.shape({
      isEligible: PropTypes.bool,
      reasons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        isEligible: PropTypes.bool,
        data: PropTypes.object
      }))
    })
  }).isRequired,
  currentTab: PropTypes.string
};

EligibilityTag.defaultProps = {
  currentTab: 'all'
};

export default EligibilityTag;

