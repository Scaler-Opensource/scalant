import React from 'react';
import { FileDoneOutlined } from '@ant-design/icons';
import { Typography, Button } from 'antd';
import styles from './ResumeParsing.module.scss';

const { Paragraph, Text } = Typography;

const SuccessState = ({
  fileName = 'Resume.pdf',
  sections = ['Skills', 'Projects', 'Education', 'Work Experience'],
  onSave,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${styles.centered}`}
        style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}
      >
        <FileDoneOutlined style={{ fontSize: 40, color: '#52c41a' }} />
        <Paragraph className={styles.fileName} style={{ marginBottom: 0 }}>
          {fileName}
        </Paragraph>
        <Text type="secondary">Sections Parsed: {sections.join(', ')}</Text>
      </div>

      <Button
        type="primary"
        block
        className={styles.primaryButton}
        onClick={onSave}
      >
        Continue
      </Button>
    </div>
  );
};

export default SuccessState;
