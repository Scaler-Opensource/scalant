import React, { useState } from 'react';
import { Form, Select } from 'antd';
import { useLazyGetSelectOptionsQuery } from '../../../services/selectOptionsService';
import styles from './Field.module.scss';

function Company({ fieldName, label }) {
  const [fetchSelectOptions] = useLazyGetSelectOptionsQuery();
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    const response = await fetchSelectOptions({
      fieldType: 'companies',
      query: value,
    });

    setOptions(response?.data || []);
  };

  return (
    <Form.Item
      label={label}
      name={fieldName}
      rules={[{ required: true, message: 'Please select a company' }]}
      layout="vertical"
      className={styles.field}
    >
      <Select
        options={options}
        showSearch
        filterOption={false}
        onSearch={handleSearch}
      />
    </Form.Item>
  );
}

export default Company;
