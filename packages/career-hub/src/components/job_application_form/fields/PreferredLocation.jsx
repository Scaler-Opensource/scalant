import React from 'react';
import classNames from 'classnames';
import { Checkbox, Form, Select, Space } from 'antd';
import { CHECKBOX_FIELD_MAP } from '../../../utils/applicationForm';
import styles from './Field.module.scss';

function PreferredLocation({ fieldName, label, fieldProps }) {
  const isAnywhereInIndia = Form.useWatch(
    CHECKBOX_FIELD_MAP.preferred_location_anywhere_in_india
  );

  return (
    <Space className={classNames(styles.fieldGroup, styles.checkboxFieldGroup)}>
      <Form.Item
        label={label}
        name={fieldName}
        className={classNames(styles.field, styles.checkboxAdjacentField)}
      >
        <Select {...fieldProps} disabled={isAnywhereInIndia} />
      </Form.Item>
      <Form.Item
        name={CHECKBOX_FIELD_MAP.preferred_location_anywhere_in_india}
        valuePropName="checked"
      >
        <Checkbox>Anywhere in India</Checkbox>
      </Form.Item>
    </Space>
  );
}

export default PreferredLocation;
