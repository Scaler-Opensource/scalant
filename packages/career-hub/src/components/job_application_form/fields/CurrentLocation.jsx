import React from 'react';
import { Form, Select } from 'antd';
import styles from './Field.module.scss';

function CurrentLocation({ fieldName, fieldProps, label }) {
  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[{ required: true, message: 'Please select current location' }]}
      className={styles.field}
    >
      <Select {...fieldProps} />
    </Form.Item>
  );
}

export default CurrentLocation;
