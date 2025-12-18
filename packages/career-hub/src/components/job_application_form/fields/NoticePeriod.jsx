import React from 'react';
import classNames from 'classnames';
import { Checkbox, Form, Input, Select, Space } from 'antd';
import {
  CHECKBOX_FIELD_MAP,
  NOTICE_PERIOD_OPTIONS,
} from '../../../utils/applicationForm';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import styles from './Field.module.scss';

function NoticePeriod({ fieldName, label }) {
  const { defaultFormData, updateDefaultField } = useApplicationFormContext();

  const handleChange = (value) => {
    const oldvalue = defaultFormData[fieldName] || {};
    updateDefaultField(fieldName, {
      ...oldvalue,
      notice_period: value,
      serving_notice: value === '-1',
    });
  };

  const handleCheckboxChange = (event) => {
    const oldvalue = defaultFormData[fieldName] || {};
    updateDefaultField(fieldName, {
      ...oldvalue,
      buyout_notice: event.target.checked,
    });
  };

  const handleAvailableJoiningDateChange = (event) => {
    const oldvalue = defaultFormData[fieldName] || {};
    updateDefaultField(fieldName, {
      ...oldvalue,
      available_joining_date: event.target.value,
    });
  };

  return (
    <Space className={styles.fieldGroup}>
      <Space
        className={classNames(styles.fieldGroup, styles.checkboxFieldGroup)}
      >
        <Form.Item
          label={label}
          name={fieldName}
          rules={[{ required: true, message: 'Please select notice period' }]}
          className={classNames(styles.field, styles.checkboxAdjacentField)}
        >
          <Select onChange={handleChange} options={NOTICE_PERIOD_OPTIONS} />
        </Form.Item>
        <Form.Item
          name={CHECKBOX_FIELD_MAP.notice_period_buyout}
          className={styles.field}
        >
          <Checkbox
            onChange={handleCheckboxChange}
            checked={defaultFormData[fieldName]?.buyout_notice === 'true'}
          >
            Negotiable / Buyout available
          </Checkbox>
        </Form.Item>
      </Space>
      {defaultFormData[fieldName]?.notice_period === '-1' && (
        <Form.Item
          label="Last Date of Job"
          name="available_joining_date"
          rules={[{ required: true, message: 'Please enter last date' }]}
          className={styles.field}
        >
          <Input type="date" onChange={handleAvailableJoiningDateChange} />
        </Form.Item>
      )}
    </Space>
  );
}

export default NoticePeriod;
