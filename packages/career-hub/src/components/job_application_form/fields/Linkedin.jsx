import React from 'react';
import { Form, Input } from 'antd';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import styles from './Field.module.scss';

function Linkedin({ fieldName, label, fieldProps }) {
  const { updateDefaultField } = useApplicationFormContext();

  const handleChange = (event) => {
    updateDefaultField(fieldName, event.target.value);
  };

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
      <Input {...fieldProps} onChange={handleChange} />
    </Form.Item>
  );
}

export default Linkedin;
