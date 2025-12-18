import React from 'react';
import { Form, Select } from 'antd';
import styles from './Field.module.scss';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';

function GradYear({ fieldName, label }) {
  const { updateDefaultField } = useApplicationFormContext();

  const handleChange = (value) => {
    updateDefaultField(fieldName, value);
  };

  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[{ required: true, message: 'Please select graduation year' }]}
      className={styles.field}
    >
      <Select
        onChange={handleChange}
        showSearch
        options={[...Array(71)]
          .map((_, i) => {
            const year = new Date().getFullYear() - 60 + i;
            return { label: year, value: `${year}-01-01` };
          })
          .reverse()}
      />
    </Form.Item>
  );
}

export default GradYear;
