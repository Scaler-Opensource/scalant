import React, { useState } from 'react';
import { Form, Select, Space } from 'antd';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import { YEAR_OPTIONS, MONTH_OPTIONS } from '../../../utils/applicationForm';
import styles from './Field.module.scss';

function TotalYearsOfExperience({ fieldName }) {
  const { defaultFormData, updateDefaultField } = useApplicationFormContext();
  const [years, setYears] = useState(
    Math.floor(defaultFormData[fieldName] / 12)
  );
  const [months, setMonths] = useState(defaultFormData[fieldName] % 12);

  const handleChange = ({ newYears, newMonths }) => {
    updateDefaultField(fieldName, newYears * 12 + newMonths);
  };

  const handleYearsChange = (value) => {
    setYears(() => {
      handleChange({ newYears: value, newMonths: months });
      return value;
    });
  };

  const handleMonthsChange = (value) => {
    setMonths(() => {
      handleChange({ newMonths: value, newYears: years });
      return value;
    });
  };

  return (
    <Space className={styles.fieldGroup}>
      <Form.Item
        label="Experience Years"
        name={`${fieldName}_years`}
        rules={[
          { required: true, message: 'Please select years of experience' },
        ]}
        className={styles.field}
      >
        <Select
          onChange={handleYearsChange}
          options={YEAR_OPTIONS}
          showSearch
        />
      </Form.Item>
      <Form.Item
        label="Experience Months"
        name={`${fieldName}_months`}
        rules={[
          { required: true, message: 'Please select months of experience' },
        ]}
        className={styles.field}
      >
        <Select
          onChange={handleMonthsChange}
          options={MONTH_OPTIONS}
          showSearch
        />
      </Form.Item>
    </Space>
  );
}

export default TotalYearsOfExperience;
