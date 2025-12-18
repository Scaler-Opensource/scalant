import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Space, Spin } from 'antd';
import { useApplicationForm } from '../../../hooks';
import {
  getInitialFormData,
  NON_CUSTOM_FIELD_COMPONENT_MAPPING,
  NON_CUSTOM_FIELDS,
} from '../../../utils/applicationForm';
import { useApplicationFormContext } from '../../../contexts/ApplicationFormContext';
import styles from './ApplicationForm.module.scss';
import CustomField from '../fields/CustomField';

function NonCustomField({ field }) {
  if (!NON_CUSTOM_FIELD_COMPONENT_MAPPING[field?.attributes?.title]) {
    return null;
  }

  const { title } = field.attributes;
  const { component: FieldComponent, props } =
    NON_CUSTOM_FIELD_COMPONENT_MAPPING[title];

  return <FieldComponent {...props} />;
}

function ApplicationForm({ jobProfileId, applicationId, status }) {
  const { data, isLoading } = useApplicationForm({
    jobProfileId,
    applicationId,
    status,
  });
  const {
    defaultFormData,
    customFormData,
    setDefaultFormData,
    setCustomFormData,
  } = useApplicationFormContext();
  const [form] = Form.useForm();

  console.log({ defaultFormData, customFormData });

  const nonCustomFieldsMap = useMemo(
    () =>
      data?.reduce((acc, field) => {
        if (!field.attributes.custom) {
          acc[field.attributes.title] = field;
        }
        return acc;
      }, {}),
    [data]
  );

  const customFieldsMap = useMemo(
    () => data?.filter((field) => field.attributes.custom),
    [data]
  );

  useEffect(() => {
    if (!nonCustomFieldsMap || !customFieldsMap) return;

    const initialDefaultFormData = Object.fromEntries(
      Object.entries(nonCustomFieldsMap).map(([key, value]) => [
        key,
        value.attributes.response,
      ])
    );
    const initialCustomFormData = customFieldsMap.map((field) => ({
      id: field.id,
      response: field.attributes.response,
    }));

    setDefaultFormData(initialDefaultFormData);
    setCustomFormData(initialCustomFormData);

    form.setFieldsValue(getInitialFormData(initialDefaultFormData));
  }, [
    nonCustomFieldsMap,
    customFieldsMap,
    setDefaultFormData,
    setCustomFormData,
    form,
  ]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Space direction="vertical" size="middle">
      <Form layout="vertical" className={styles.form} form={form}>
        {NON_CUSTOM_FIELDS.map((field) => (
          <NonCustomField key={field} field={nonCustomFieldsMap[field]} />
        ))}
        {Object.entries(customFieldsMap).map(([key, value]) => (
          <CustomField key={key} field={value} />
        ))}
      </Form>
    </Space>
  );
}

ApplicationForm.propTypes = {
  jobProfileId: PropTypes.number.isRequired,
  applicationId: PropTypes.number,
  status: PropTypes.string,
};

export default ApplicationForm;
