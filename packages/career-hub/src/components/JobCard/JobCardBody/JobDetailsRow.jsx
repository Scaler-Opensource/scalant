import React from 'react';
import { Space, Divider, Typography } from 'antd';
import PropTypes from 'prop-types';
import {
  formatExperience,
  formatCtc,
  formatNoticePeriod,
  formatLocation
} from '../../../utils/jobCard';
import SaveButton from '../SaveButton';
import styles from './JobCardBody.module.scss';

const { Text } = Typography;

const DetailItem = ({ text }) => {
  if (!text) return null;
  
  return (
    <Text className={styles.detailText}>{text}</Text>
  );
};

DetailItem.propTypes = {
  text: PropTypes.string
};

/**
 * Job Details Row component (consolidated)
 * Shows: Location | CTC | Experience | Notice Period | Save Button (inline)
 * 
 * Conditional rendering:
 * - When isActive: Hide last 2 items (Experience and Notice Period)
 * - When !isActive: Show all details
 */
const JobDetailsRow = ({ jobData, isActive, cardConfig, userCountry, onSave }) => {
  const {
    preferredCities,
    minExperience,
    maxExperience,
    minCtc,
    maxCtc,
    openForDiscussionCtc,
    isInternship,
    stipend,
    preferredNoticePeriod
  } = jobData;

  const locationText = formatLocation(preferredCities);
  const ctcText = cardConfig.isExperienceCtcAvailable
    ? formatCtc({
        minCtc,
        maxCtc,
        openForDiscussionCtc,
        isInternship,
        stipend,
        userCountry
      })
    : null;
  const experienceText = cardConfig.isExperienceCtcAvailable
    ? formatExperience(minExperience, maxExperience)
    : null;
  const noticePeriodText = cardConfig.isNoticePeriodAvailable
    ? formatNoticePeriod(preferredNoticePeriod)
    : null;

  // Build array of all available details in the correct order
  const allDetails = [
    locationText && { text: locationText },
    ctcText && { text: ctcText },
    experienceText && { text: experienceText },
    noticePeriodText && { text: noticePeriodText }
  ].filter(Boolean);

  // When active, hide last 2 items (Experience and Notice Period)
  const details = isActive && allDetails.length > 2
    ? allDetails.slice(0, -2)
    : allDetails;

  return (
    <div className={styles.detailsRowContainer}>
      {details.length > 0 && (
        <Space split={<Divider type="vertical" />} className={styles.detailsRow}>
          {details.map((detail, index) => (
            <DetailItem key={index} text={detail.text} />
          ))}
        </Space>
      )}
      <div className={styles.saveButtonWrapper}>
        <SaveButton
          jobProfileId={jobData.id}
          applicationStatus={jobData.applicationStatus}
          applicationLastUpdatedAt={jobData.applicationLastUpdatedAt}
          onSave={onSave}
        />
      </div>
    </div>
  );
};

JobDetailsRow.propTypes = {
  jobData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    preferredCities: PropTypes.string,
    minExperience: PropTypes.number,
    maxExperience: PropTypes.number,
    minCtc: PropTypes.number,
    maxCtc: PropTypes.number,
    openForDiscussionCtc: PropTypes.bool,
    isInternship: PropTypes.bool,
    stipend: PropTypes.string,
    preferredNoticePeriod: PropTypes.number,
    applicationStatus: PropTypes.string,
    applicationLastUpdatedAt: PropTypes.string
  }).isRequired,
  isActive: PropTypes.bool,
  cardConfig: PropTypes.shape({
    isExperienceCtcAvailable: PropTypes.bool,
    isNoticePeriodAvailable: PropTypes.bool
  }).isRequired,
  userCountry: PropTypes.oneOf(['IN', 'US']),
  onSave: PropTypes.func.isRequired
};

JobDetailsRow.defaultProps = {
  isActive: false,
  userCountry: 'IN'
};

export default JobDetailsRow;

