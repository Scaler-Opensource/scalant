import React from 'react';
import { useSelector } from 'react-redux';
import { Button, message, Space, Typography } from 'antd';
import { BulbTwoTone } from '@ant-design/icons';
import { APPLICATION_STATUS } from '../../../utils/constants';
import { useApplicationFormContext, useJobPreview } from '../../../contexts';
import { useUpdateApplicationMutation } from '../../../services/createApplicationService';
import { createApplicationFormPayload } from '../../../utils/applicationForm';
import { PRODUCT_NAME } from '../../../utils/tracking';
import styles from './Footer.module.scss';

const ApplicationFormFooter = ({ onCancel }) => {
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );
  const experienceBasedSkills = userProfileData?.experienceBasedSkills || [];
  const { applicationId, formInstance, jobProfileId, stepName, setStepName } =
    useApplicationFormContext();
  const { analytics } = useJobPreview();
  const [updateApplication, { isLoading }] = useUpdateApplicationMutation();

  const handleNext = async () => {
    analytics?.click('Application Form - Next', PRODUCT_NAME);
    try {
      const payload = {
        job_profile_id: jobProfileId,
        step_name: stepName,
        form_data: createApplicationFormPayload(
          formInstance.getFieldsValue(),
          experienceBasedSkills
        ),
      };

      const response = await updateApplication({
        applicationId: applicationId,
        payload,
      });

      if (response?.data?.success) {
        setStepName(APPLICATION_STATUS.RESUME_FITMENT_CHECK);
      } else {
        message.error('Failed to update application');
      }
    } catch {
      message.error('Failed to update application');
    }
  };

  const handleCancel = () => {
    analytics?.click('Application Form - Cancel', PRODUCT_NAME);
    onCancel();
  };

  return (
    <Space className={styles.applicationFormFooterContainer}>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button loading={isLoading} type="primary" onClick={handleNext}>
        Next
      </Button>
    </Space>
  );
};

const ResumeChoiceSelectFooter = () => {
  const { applicationId, selectedResume, jobProfileId, stepName, setStepName } =
    useApplicationFormContext();
  const { analytics } = useJobPreview();
  const [updateApplication, { isLoading }] = useUpdateApplicationMutation();

  const handleGoBack = () => {
    analytics?.click('Resume Choice - Go Back', PRODUCT_NAME);
    setStepName(APPLICATION_STATUS.APPLICATION_FORM);
  };

  const handleSubmit = async () => {
    analytics?.click('Resume Choice - Proceed to Apply', PRODUCT_NAME);
    try {
      const payload = {
        job_profile_id: jobProfileId,
        step_name: stepName,
        resume_id: selectedResume,
      };

      const response = await updateApplication({
        applicationId: applicationId,
        payload,
      });

      if (response?.data?.success) {
        setStepName(APPLICATION_STATUS.SUCCESSFULLY_APPLIED);
      } else {
        message.error('Failed to update application');
      }
    } catch {
      message.error('Failed to update application');
    }
  };

  return (
    <Space className={styles.resumeChoiceSelectFooterContainer}>
      <Space>
        <BulbTwoTone />
        <Typography.Text strong>Quick Tip: </Typography.Text>
        <Typography.Text>
          Complete the improvements to boost your hiring chances
        </Typography.Text>
      </Space>
      <Space>
        <Button onClick={handleGoBack}>Go Back</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!selectedResume}
        >
          Proceed to Apply
        </Button>
      </Space>
    </Space>
  );
};

function Footer({ onCancel }) {
  const { stepName } = useApplicationFormContext();

  switch (stepName) {
    case APPLICATION_STATUS.APPLICATION_FORM:
      return <ApplicationFormFooter onCancel={onCancel} />;
    case APPLICATION_STATUS.RESUME_CHOICE_SELECT:
      return <ResumeChoiceSelectFooter />;
    default:
      return null;
  }
}

export default Footer;
