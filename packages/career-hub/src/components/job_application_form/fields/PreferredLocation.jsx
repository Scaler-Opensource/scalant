import React from 'react';
import { Checkbox, Form, Select, Space } from 'antd';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import {
  ANYWHERE_IN_INDIA,
  CHECKBOX_FIELD_MAP,
} from '../../../utils/applicationForm';
import styles from './Field.module.scss';
import classNames from 'classnames';

function PreferredLocation({ fieldName, label, fieldProps }) {
  const { defaultFormData, updateDefaultField } = useApplicationFormContext();
  const anywhereInIndia = defaultFormData[fieldName] === ANYWHERE_IN_INDIA;

  const handleChange = (value) => {
    updateDefaultField(fieldName, value.join('/'));
  };

  const handleCheckboxChange = (event) => {
    updateDefaultField(
      fieldName,
      event.target.checked ? ANYWHERE_IN_INDIA : null
    );
  };

  return (
    <Space className={classNames(styles.fieldGroup, styles.checkboxFieldGroup)}>
      <Form.Item
        label={label}
        name={fieldName}
        rules={[
          { required: true, message: 'Please select preferred locations' },
        ]}
        className={classNames(styles.field, styles.checkboxAdjacentField)}
      >
        <Select
          {...fieldProps}
          onChange={handleChange}
          disabled={anywhereInIndia}
        />
      </Form.Item>
      <Form.Item name={CHECKBOX_FIELD_MAP.preferred_location_anywhere_in_india}>
        <Checkbox checked={anywhereInIndia} onChange={handleCheckboxChange}>
          Anywhere in India
        </Checkbox>
      </Form.Item>
    </Space>
  );
}

export default PreferredLocation;
