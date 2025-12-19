import React from 'react';
import { Space, Typography } from 'antd';
import { InfoCircleFilled, FileTextTwoTone } from '@ant-design/icons';
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
};

function FormHeader() {
  const { stepName } = useApplicationFormContext();

  if (!STEP_MAP[stepName]) return null;

  const {
    currentStep,
    icon: Icon,
    title,
    totalSteps,
  } = STEP_MAP[stepName] || {};

  return (
    <Space className={styles.container} direction="vertical">
      <Text className={styles.stepText}>
        Step {currentStep}/{totalSteps}
      </Text>
      <Space className={styles.titleContainer}>
        <Icon className={styles.titleIcon} />
        <Text className={styles.titleText}>{title}</Text>
      </Space>
    </Space>
  );
}

export default FormHeader;
