import React from 'react';
import { useSelector } from 'react-redux';
import { Button, message, Space, Typography } from 'antd';
import { BulbTwoTone } from '@ant-design/icons';
import { APPLICATION_STATUS } from '../../../utils/constants';
import { useApplicationFormContext } from '../../../contexts';
import { useUpdateApplicationMutation } from '../../../services/createApplicationService';
import { createApplicationFormPayload } from '../../../utils/applicationForm';
import styles from './Footer.module.scss';

const ApplicationFormFooter = ({ onCancel }) => {
  const userProfileData = useSelector(
    (state) => state.scalantCareerHub.dashboard.userProfileData
  );
  const experienceBasedSkills = userProfileData?.experienceBasedSkills || [];
  const { applicationId, formInstance, jobProfileId, stepName, setStepName } =
    useApplicationFormContext();
  const [updateApplication, { isLoading }] = useUpdateApplicationMutation();

  const handleNext = async () => {
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
        setStepName(APPLICATION_STATUS.RESUME_CHOICE_SELECT);
      } else {
        message.error('Failed to update application');
      }
    } catch {
      message.error('Failed to update application');
    }
  };

  return (
    <Space className={styles.applicationFormFooterContainer}>
      <Button onClick={onCancel}>Cancel</Button>
      <Button loading={isLoading} type="primary" onClick={handleNext}>
        Next
      </Button>
    </Space>
  );
};

const ResumeChoiceSelectFooter = () => {
  const { applicationId, selectedResume, jobProfileId, stepName, setStepName } =
    useApplicationFormContext();
  const [updateApplication, { isLoading }] = useUpdateApplicationMutation();

  const handleGoBack = () => {
    setStepName(APPLICATION_STATUS.APPLICATION_FORM);
  };

  const handleSubmit = async () => {
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
        window.location.reload();
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
          Complete the steps below to boost your chances
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
