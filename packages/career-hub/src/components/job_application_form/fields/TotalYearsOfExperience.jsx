import React from 'react';
import { Form, Select, Space } from 'antd';
import {
  YEAR_OPTIONS,
  MONTH_OPTIONS,
  EXPERIENCE_FIELD_MAP,
} from '../../../utils/applicationForm';
import styles from './Field.module.scss';

function TotalYearsOfExperience() {
  return (
    <Space className={styles.fieldGroup}>
      <Form.Item
        label="Experience Years"
        name={EXPERIENCE_FIELD_MAP.years_of_experience}
        rules={[
          { required: true, message: 'Please select years of experience' },
        ]}
        className={styles.field}
      >
        <Select options={YEAR_OPTIONS} showSearch />
      </Form.Item>
      <Form.Item
        label="Experience Months"
        name={EXPERIENCE_FIELD_MAP.months_of_experience}
        rules={[
          { required: true, message: 'Please select months of experience' },
        ]}
        className={styles.field}
      >
        <Select options={MONTH_OPTIONS} showSearch />
      </Form.Item>
    </Space>
  );
}

export default TotalYearsOfExperience;
