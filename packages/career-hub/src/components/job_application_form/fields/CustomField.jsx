import React, { useState } from 'react';
import { Button, Form, Input, message, Upload } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { CUSTOM_FIELD_TYPE_MAP } from '../../../utils/applicationForm';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import styles from './Field.module.scss';

function GenericField({ formType, field }) {
  const { updateCustomField } = useApplicationFormContext();

  const handleChange = (event) => {
    updateCustomField(field.id, event.target.value);
  };

  return (
    <Form.Item
      label={field.attributes.title}
      name={field.id}
      rules={[
        { required: true, message: `${field.attributes.title} is required` },
      ]}
      layout="vertical"
      className={styles.field}
    >
      <Input onChange={handleChange} type={formType} />
    </Form.Item>
  );
}

function UploadField({ field }) {
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const { onUploadFile, updateCustomField } = useApplicationFormContext();

  const handleSelectFile = async (e) => {
    setIsUploaded(false);
    const file = e?.target?.files?.[0];

    if (!file) return;
    setIsUploading(true);
    setFileName(file.name);

    try {
      if (onUploadFile) {
        const url = await onUploadFile(file);
        updateCustomField(field.id, {
          file_name: file.name,
          file_url: url,
        });
        setIsUploaded(true);
        message.success('File uploaded successfully');
      } else {
        throw new Error('Upload file function not provided');
      }
    } catch {
      message.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form.Item
      label={field.attributes.title}
      name={field.id}
      rules={[
        { required: true, message: `${field.attributes.title} is required` },
      ]}
      layout="vertical"
      className={styles.field}
    >
      <Upload
        multiple={false}
        accept=".pdf,.doc,.docx,.txt,.md"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={({ file }) => {
          if (file) {
            const synthetic = {
              target: { files: [file.originFileObj || file] },
            };
            handleSelectFile(synthetic);
          }
        }}
        disabled={isUploading}
      >
        <Button
          className={styles.field}
          loading={isUploading}
          icon={isUploaded && <CheckCircleFilled />}
        >
          {isUploaded && fileName}
          {!isUploaded && !isUploaded && 'Upload File'}
        </Button>
      </Upload>
    </Form.Item>
  );
}

function CustomField({ field }) {
  switch (field.attributes.form_type) {
    case CUSTOM_FIELD_TYPE_MAP.upload:
      return <UploadField field={field} />;
    case CUSTOM_FIELD_TYPE_MAP.date_time:
      return <GenericField formType="date" field={field} />;
    default:
      return (
        <GenericField formType={field.attributes.form_type} field={field} />
      );
  }
}

export default CustomField;
