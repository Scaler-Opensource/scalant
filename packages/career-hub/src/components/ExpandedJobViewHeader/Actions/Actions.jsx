import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import {
  CheckCircleFilled,
  RiseOutlined,
  SaveTwoTone,
} from '@ant-design/icons';
import { APPLICATION_STATUS } from '../../../utils/constants';
import { ICONS } from '../../../utils/icons';
import { useJobPreview } from '../../../contexts';
import { useUpdateApplicationStatusMutation } from '../../../services/useUpdateApplicationStatus';
import Withdrawal from './Withdrawal';
import styles from './Actions.module.scss';

const SaveButton = () => {
  const { jobId, jobData, refetch } = useJobPreview();
  const [updateApplicationStatus, { isLoading }] =
    useUpdateApplicationStatusMutation();

  const { applicationStatus, appliedOn } = jobData || {};
  const isSaved = applicationStatus === APPLICATION_STATUS.SAVED;

  const handleSave = async () => {
    const response = await updateApplicationStatus({
      job_profile_id: jobId,
      update_action: 'save',
    });

    if (response?.data?.success) {
      message.success('Application saved successfully');
      refetch();
    } else {
      message.error('Failed to save application');
    }
  };

  if (appliedOn) {
    return null;
  }

  if (isSaved) {
    return (
      <Button
        icon={<img src={ICONS.bookmark} alt="bookmark" />}
        type="text"
        size="large"
        disabled
      >
        Saved
      </Button>
    );
  }

  return (
    <Button
      icon={<SaveTwoTone />}
      type="primary"
      ghost
      size="large"
      onClick={handleSave}
      loading={isLoading}
    >
      Save
    </Button>
  );
};

const ApplyButton = () => {
  const { jobData, eligibilityCriteria, setActiveApplicationId, jobId } =
    useJobPreview();
  const { appliedOn, applicationStatus } = jobData || {};
  const { isEligible } = eligibilityCriteria || {};
  const isWithdrawn = applicationStatus === APPLICATION_STATUS.WITHDRAWN;

  const handleApply = () => {
    setActiveApplicationId(jobId);
  };

  useEffect(() => {
    return () => {
      setActiveApplicationId(null);
    };
  }, [setActiveApplicationId]);

  if (isWithdrawn) {
    return null;
  }

  if (appliedOn) {
    return (
      <Button
        icon={<CheckCircleFilled />}
        className={styles.appliedButton}
        type="text"
        size="large"
      >
        Applied
      </Button>
    );
  }

  return (
    <Button
      icon={<RiseOutlined />}
      onClick={handleApply}
      className={styles.applyButton}
      type="primary"
      size="large"
      disabled={!isEligible}
    >
      Apply Now
    </Button>
  );
};

const Actions = () => {
  return (
    <div className={styles.jobActions}>
      <ApplyButton />
      <SaveButton />
      <Withdrawal />
    </div>
  );
};

export default Actions;
