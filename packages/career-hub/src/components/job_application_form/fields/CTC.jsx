import React from 'react';
import { Form, Input } from 'antd';
import styles from './Field.module.scss';

function CTC({ fieldName, fieldProps, label }) {
  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[{ required: true, message: `${label} is required` }]}
      layout="vertical"
      className={styles.field}
      extra="Enter amount in lakhs. For eg, if amount is 50 LPA, enter 50."
    >
      <Input {...fieldProps} />
    </Form.Item>
  );
}

export default CTC;
