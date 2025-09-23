import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Typography, Button, Upload } from 'antd';
import styles from './ResumeParsing.module.scss';

const { Paragraph, Text } = Typography;
const { Dragger } = Upload;

const UploadPrompt = ({ onSkip, onSelectFile }) => {
  return (
    <div className={styles.container}>
      <Dragger
        multiple={false}
        accept=".pdf,.doc,.docx,.txt,.md"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={({ file }) => {
          // Pass a synthetic event-like object to reuse onSelectFile handler signature
          if (file) {
            const synthetic = {
              target: { files: [file.originFileObj || file] },
            };
            onSelectFile?.(synthetic);
          }
        }}
      >
        <div className={styles.centered}>
          <InboxOutlined style={{ fontSize: 40, color: '#1677ff' }} />
          <Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
            Click or drop your old resume to upload
          </Paragraph>
          <Text type="secondary">We support PDF, DOCX, TXT & MD below 2MB</Text>
        </div>
      </Dragger>

      <Button block className={styles.secondaryButton} onClick={onSkip}>
        Skip and Fill Manually
      </Button>
    </div>
  );
};

export default UploadPrompt;
