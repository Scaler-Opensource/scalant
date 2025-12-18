import React from 'react';
import { Form, Select } from 'antd';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import styles from './Field.module.scss';

function CurrentLocation({ fieldName, fieldProps, label }) {
  const { updateDefaultField } = useApplicationFormContext();

  const handleChange = (value) => {
    updateDefaultField(fieldName, value.join('/'));
  };

  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[{ required: true, message: 'Please select current location' }]}
      className={styles.field}
    >
      <Select {...fieldProps} onChange={handleChange} />
    </Form.Item>
  );
}

export default CurrentLocation;
