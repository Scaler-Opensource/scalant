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
import { ELIGIBILITY_ICONS, ELIGIBILITY_TAG_TYPES } from '../../../utils/jobCard/constants';
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
    const baseClass = styles.eligibilityTag;
    switch (tagData.tag) {
      case ELIGIBILITY_TAG_TYPES.QUICK_APPLY:
        return `${baseClass} ${styles.quickApply}`;
      case ELIGIBILITY_TAG_TYPES.ELIGIBLE:
        return `${baseClass} ${styles.eligible}`;
      case ELIGIBILITY_TAG_TYPES.STEPS_TO_APPLY:
        return `${baseClass} ${styles.stepsPending}`;
      case ELIGIBILITY_TAG_TYPES.INELIGIBLE:
        return `${baseClass} ${styles.ineligible}`;
      case ELIGIBILITY_TAG_TYPES.NOTICE_PERIOD_MISMATCH:
        return `${baseClass} ${styles.noticePeriodMismatch}`;
      case ELIGIBILITY_TAG_TYPES.EXPIRED:
        return `${baseClass} ${styles.expired}`;
      default:
        return baseClass;
    }
  };

  // Handle icon with two-tone colors
  const renderIcon = () => {
    if (!IconComponent) return null;
    
    // For two-tone icons, apply color props
    const TWO_TONE_ICONS = [
      ELIGIBILITY_ICONS.CHECK_CIRCLE_TWO_TONE,
      ELIGIBILITY_ICONS.UNLOCK_TWO_TONE,
      ELIGIBILITY_ICONS.ROCKET_TWO_TONE
    ];
    
    if (TWO_TONE_ICONS.includes(tagData.icon)) {
      return <IconComponent twoToneColor={tagData.color} />;
    }
    
    return <IconComponent />;
  };

  // Don't use Ant Design color prop for custom styled tags (only for expired)
  const shouldUseAntdColor = tagData.tag === ELIGIBILITY_TAG_TYPES.EXPIRED;

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
