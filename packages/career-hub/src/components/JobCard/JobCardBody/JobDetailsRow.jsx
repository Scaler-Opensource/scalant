import React from 'react';
import { Space, Divider, Typography } from 'antd';
import PropTypes from 'prop-types';
import {
  formatExperience,
  formatCtc,
  formatNoticePeriod,
  formatLocation,
} from '../../../utils/jobCard';
import SaveButton from '../SaveButton';
import styles from './JobCardBody.module.scss';

const { Text } = Typography;

const DetailItem = ({ text }) => {
  if (!text) return null;

  return <Text className={styles.detailText}>{text}</Text>;
};

DetailItem.propTypes = {
  text: PropTypes.string,
};

/**
 * Job Details Row component (consolidated)
 * Shows: Location | Experience | CTC | Notice Period | Save Button (inline)
 *
 * Conditional rendering:
 * - When selectedJobId is not null: Hide Experience and Notice Period for all cards
 * - When selectedJobId is null: Show all details
 */
const JobDetailsRow = ({
  jobData,
  cardConfig,
  userCountry,
  onSave,
  selectedJobId,
}) => {
  const {
    preferredCities,
    minExperience,
    maxExperience,
    minCtc,
    maxCtc,
    openForDiscussionCtc,
    isInternship,
    stipend,
    preferredNoticePeriod,
  } = jobData;

  // Location: Always show
  const location = formatLocation(preferredCities);

  // Experience: Hide when any job is selected (selectedJobId is not null)
  const experience =
    selectedJobId === null && cardConfig.isExperienceCtcAvailable
      ? formatExperience(minExperience, maxExperience)
      : null;

  // CTC: Always show when config allows
  const ctc = cardConfig.isExperienceCtcAvailable
    ? formatCtc({
        minCtc,
        maxCtc,
        openForDiscussionCtc,
        isInternship,
        stipend,
        userCountry,
      })
    : null;

  // Notice Period: Hide when any job is selected (selectedJobId is not null)
  const noticePeriod =
    selectedJobId === null && cardConfig.isNoticePeriodAvailable
      ? formatNoticePeriod(preferredNoticePeriod)
      : null;

  const details = [
    location && { text: location },
    experience && { text: experience },
    ctc && { text: ctc },
    noticePeriod && { text: noticePeriod },
  ].filter(Boolean);

  return (
    <div className={styles.detailsRowContainer}>
      {details.length > 0 && (
        <Space
          split={<Divider type="vertical" />}
          className={styles.detailsRow}
        >
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
    applicationLastUpdatedAt: PropTypes.string,
  }).isRequired,
  cardConfig: PropTypes.shape({
    isExperienceCtcAvailable: PropTypes.bool,
    isNoticePeriodAvailable: PropTypes.bool,
  }).isRequired,
  userCountry: PropTypes.oneOf(['IN', 'US']),
  onSave: PropTypes.func.isRequired,
  selectedJobId: PropTypes.number,
};

JobDetailsRow.defaultProps = {
  userCountry: 'IN',
  selectedJobId: null,
};

export default JobDetailsRow;
