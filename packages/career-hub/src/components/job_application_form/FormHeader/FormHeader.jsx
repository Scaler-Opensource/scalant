import React from 'react';
import { Button, Flex, Space, Typography } from 'antd';
import {
  InfoCircleFilled,
  FileTextTwoTone,
  CloseOutlined,
} from '@ant-design/icons';
import { APPLICATION_STATUS } from '../../../utils/constants';
import { useApplicationFormContext } from '../../../contexts';
import styles from './FormHeader.module.scss';

const { Text } = Typography;

const STEP_MAP = {
  [APPLICATION_STATUS.APPLICATION_FORM]: {
    currentStep: 1,
    icon: InfoCircleFilled,
    title: 'Required Details',
    totalSteps: 2,
  },
  [APPLICATION_STATUS.RESUME_CHOICE_SELECT]: {
    currentStep: 2,
    icon: FileTextTwoTone,
    title: 'Select which Resume to share for this job application',
    totalSteps: 2,
  },
  [APPLICATION_STATUS.SUCCESSFULLY_APPLIED]: {
    currentStep: 2,
    icon: FileTextTwoTone,
    title: 'Select which Resume to share for this job application',
    totalSteps: 2,
  },
};

function FormHeader({ onClose }) {
  const { stepName } = useApplicationFormContext();

  if (!STEP_MAP[stepName]) return null;

  const {
    currentStep,
    icon: Icon,
    title,
    totalSteps,
  } = STEP_MAP[stepName] || {};

  const handleClose = () => {
    if (stepName === APPLICATION_STATUS.SUCCESSFULLY_APPLIED) {
      window.location.reload();
    } else {
      onClose?.();
    }
  };

  return (
    <Flex justify="space-between">
      <Space className={styles.container} direction="vertical">
        <Text className={styles.stepText}>
          Step {currentStep}/{totalSteps}
        </Text>
        <Space className={styles.titleContainer}>
          <Icon className={styles.titleIcon} />
          <Text className={styles.titleText}>{title}</Text>
        </Space>
      </Space>
      <Button icon={<CloseOutlined />} type="text" onClick={handleClose} />
    </Flex>
  );
}

export default FormHeader;
