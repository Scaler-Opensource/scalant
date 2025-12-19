import React from 'react';
import { Form, Input } from 'antd';
import styles from './Field.module.scss';

function Linkedin({ fieldName, label, fieldProps }) {
  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[
        {
          required: true,
          message: 'Please enter your LinkedIn profile URL',
          type: 'url',
        },
      ]}
      layout="vertical"
      className={styles.field}
    >
      <Input {...fieldProps} />
    </Form.Item>
  );
}

export default Linkedin;
