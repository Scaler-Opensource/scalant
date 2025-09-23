import React from 'react';
import { FilePdfOutlined } from '@ant-design/icons';
import { Typography, Progress, Button } from 'antd';
import styles from './ResumeParsing.module.scss';

const { Paragraph } = Typography;

const Loading = ({
  fileName = 'Resume.pdf',
  percent = 40,
  onChooseDifferentFile,
}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.centered}`}>
        <FilePdfOutlined style={{ fontSize: 40, color: '#1677ff' }} />
        <Paragraph className={styles.fileName}>{fileName}</Paragraph>
        <div className={styles.progressWrap}>
          <Progress percent={percent} showInfo={true} />
        </div>
      </div>

      <Button block disabled className={styles.primaryButton} type="primary">
        Save Resume & Continue
      </Button>
      <Button
        block
        onClick={onChooseDifferentFile}
        className={styles.secondaryButton}
        type="text"
      >
        Choose a different file
      </Button>
    </div>
  );
};

export default Loading;
