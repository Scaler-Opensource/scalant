import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { SaveOutlined, SaveTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/jobCard/formatting';
import styles from './SaveButton.module.scss';

/**
 * - SaveOutlined icon when not saved
 * - SaveTwoTone icon when saved (with date) - filled and grey
 */
const SaveButton = ({
  jobProfileId,
  applicationStatus,
  applicationLastUpdatedAt,
  onSave,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);

  // Get saved status from Redux store (with fallback to prop)
  const savedJobFromStore = useSelector(
    (state) => state.scalantCareerHub?.savedJobs?.savedJobs?.[jobProfileId]
  );

  // Use store data if available, otherwise fall back to props
  const isSaved = savedJobFromStore
    ? savedJobFromStore.status === 'Saved'
    : applicationStatus === 'Saved';

  const lastUpdatedAt =
    savedJobFromStore?.lastUpdatedAt || applicationLastUpdatedAt;

  const handleClick = async (e) => {
    e.stopPropagation(); // Prevent card click event

    // Don't do anything if already saved
    if (isSaved) {
      return;
    }

    setLoading(true);
    try {
      await onSave(jobProfileId, 'save');
    } catch {
      // Error is handled by the calling component
      // Re-throw to allow error handling upstream
    } finally {
      setLoading(false);
    }
  };

  if (isSaved && lastUpdatedAt) {
    return (
      <Button
        type="text"
        icon={<SaveTwoTone twoToneColor="#8c8c8c" />}
        onClick={handleClick}
        disabled
        className={styles.savedButton}
        style={{ color: '#8c8c8c' }}
        size="small"
      >
        Saved on {formatDate(lastUpdatedAt)}
      </Button>
    );
  }

  return (
    <Button
      type="text"
      icon={<SaveOutlined />}
      onClick={handleClick}
      disabled={disabled || loading}
      loading={loading}
      className={styles.saveButton}
      size="small"
    >
      {isSaved ? 'Saved' : 'Save'}
    </Button>
  );
};

SaveButton.propTypes = {
  jobProfileId: PropTypes.number.isRequired,
  applicationStatus: PropTypes.string,
  applicationLastUpdatedAt: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SaveButton.defaultProps = {
  applicationStatus: 'Not Applied',
  applicationLastUpdatedAt: null,
  disabled: false,
};

export default SaveButton;
