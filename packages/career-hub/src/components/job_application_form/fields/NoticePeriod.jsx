import React from 'react';
import classNames from 'classnames';
import { Checkbox, Form, Input, Select, Space } from 'antd';
import {
  NOTICE_PERIOD_FIELD_MAP,
  NOTICE_PERIOD_OPTIONS,
} from '../../../utils/applicationForm';
import styles from './Field.module.scss';

function NoticePeriod({ label }) {
  const isCurrentlyServing =
    Form.useWatch(NOTICE_PERIOD_FIELD_MAP.notice_period) === '-1';

  return (
    <Space className={styles.fieldGroup}>
      <Space
        className={classNames(styles.fieldGroup, styles.checkboxFieldGroup)}
      >
        <Form.Item
          label={label}
          name={NOTICE_PERIOD_FIELD_MAP.notice_period}
          rules={[{ required: true, message: 'Please select notice period' }]}
          className={classNames(styles.field, styles.checkboxAdjacentField)}
        >
          <Select options={NOTICE_PERIOD_OPTIONS} />
        </Form.Item>
        <Form.Item
          name={NOTICE_PERIOD_FIELD_MAP.buyout_notice}
          className={styles.field}
          valuePropName="checked"
        >
          <Checkbox>Negotiable / Buyout available</Checkbox>
        </Form.Item>
      </Space>
      {isCurrentlyServing && (
        <Form.Item
          label="Last Date of Job"
          name={NOTICE_PERIOD_FIELD_MAP.available_joining_date}
          rules={[{ required: true, message: 'Please enter last date' }]}
          className={styles.field}
        >
          <Input type="date" />
        </Form.Item>
      )}
    </Space>
  );
}

export default NoticePeriod;
