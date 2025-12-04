import React, { useState } from 'react';
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
  disabled = false
}) => {
  const [loading, setLoading] = useState(false);
  const isSaved = applicationStatus === 'Saved';

  const handleClick = async (e) => {
    e.stopPropagation(); // Prevent card click event
    
    setLoading(true);
    try {
      await onSave(jobProfileId, isSaved ? 'unsave' : 'save');
    } catch (error) {
      console.error('Save action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isSaved && applicationLastUpdatedAt) {
    return (
      <Button
        type="text"
        icon={<SaveTwoTone twoToneColor="#8c8c8c" />}
        onClick={handleClick}
        disabled={disabled || loading}
        loading={loading}
        className={styles.savedButton}
        style={{ color: '#8c8c8c' }}
        size="small"
      >
        Saved on {formatDate(applicationLastUpdatedAt)}
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
  disabled: PropTypes.bool
};

SaveButton.defaultProps = {
  applicationStatus: 'Not Applied',
  applicationLastUpdatedAt: null,
  disabled: false
};

export default SaveButton;
