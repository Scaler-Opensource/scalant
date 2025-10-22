import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography, Button } from 'antd';
import styles from './ResumeParsing.module.scss';

const { Paragraph, Text } = Typography;

const ErrorState = ({ fileName = 'Resume.pdf', onRetry, onSkip }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${styles.centered}`}
        style={{ background: '#fff1f0', borderColor: '#ffccc7' }}
      >
        <ExclamationCircleOutlined style={{ fontSize: 40, color: '#ff4d4f' }} />
        <Paragraph className={styles.fileName} style={{ marginBottom: 0 }}>
          {fileName}
        </Paragraph>
        <Text type="secondary">
          We were not able to analyze anything from the file
        </Text>
      </div>

      <Button
        type="primary"
        block
        className={styles.primaryButton}
        onClick={onRetry}
      >
        Retry
      </Button>
      <Button
        block
        className={styles.secondaryButton}
        type="text"
        onClick={onSkip}
      >
        Skip and Fill Manually
      </Button>
    </div>
  );
};

export default ErrorState;
