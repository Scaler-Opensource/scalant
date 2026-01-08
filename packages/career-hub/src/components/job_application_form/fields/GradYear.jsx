import React from 'react';
import { Form, Select } from 'antd';
import styles from './Field.module.scss';

function GradYear({ fieldName, label }) {
  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[{ required: true, message: 'Please select graduation year' }]}
      className={styles.field}
    >
      <Select
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
