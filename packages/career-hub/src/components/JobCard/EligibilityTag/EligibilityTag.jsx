import React from 'react';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { determineJobTag } from '../../../utils/jobCard/eligibility';
import styles from './EligibilityTag.module.scss';

const ICON_MAP = {
  CheckCircleOutlined: CheckCircleOutlined,
  CloseCircleOutlined: CloseCircleOutlined,
  ClockCircleOutlined: ClockCircleOutlined,
  RocketOutlined: RocketOutlined,
};

/**
 * Eligibility Tag component
 * Shows job eligibility status with appropriate icon and color
 */
const EligibilityTag = ({ jobData, currentTab }) => {
  const tagData = determineJobTag(jobData, jobData.eligibilityCriteria);

  if (!tagData) return null;

  const IconComponent = ICON_MAP[tagData.icon];

  return (
    <Tag
      icon={IconComponent && <IconComponent />}
      color={tagData.antdColor}
      className={styles.tag}
      style={
        tagData.tag === 'expired'
          ? { color: tagData.color, borderColor: tagData.color }
          : {}
      }
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
      reasons: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          isEligible: PropTypes.bool,
          data: PropTypes.object,
        })
      ),
    }),
  }).isRequired,
  currentTab: PropTypes.string,
};

EligibilityTag.defaultProps = {
  currentTab: 'all',
};

export default EligibilityTag;
