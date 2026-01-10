import React from 'react';
import PropTypes from 'prop-types';
import { Space, Typography } from 'antd';
import styles from './FormHeader.module.scss';

const { Text } = Typography;

function FormHeader({ currentStep, icon: Icon, title, totalSteps }) {
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

FormHeader.propTypes = {
  currentStep: PropTypes.number.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default FormHeader;

