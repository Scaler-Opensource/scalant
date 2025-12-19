import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, Skeleton } from 'antd';
import { useApplicationForm } from '../../../hooks';
import {
  getInitialCustomFormData,
  getInitialFormData,
  NON_CUSTOM_FIELD_COMPONENT_MAPPING,
  NON_CUSTOM_FIELDS,
} from '../../../utils/applicationForm';
import { useApplicationFormContext } from '../../../contexts';
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

function ApplicationForm() {
  const { applicationId, stepName, jobProfileId } = useApplicationFormContext();
  const { data, isLoading } = useApplicationForm({
    jobProfileId,
    applicationId,
    status: stepName,
  });
  const [form] = Form.useForm();
  const { setFormInstance } = useApplicationFormContext();

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

    form.setFieldsValue({
      ...getInitialFormData(initialDefaultFormData),
      ...getInitialCustomFormData(initialCustomFormData),
    });
  }, [nonCustomFieldsMap, customFieldsMap, form]);

  useEffect(() => {
    setFormInstance(form);
  }, [form, setFormInstance]);

  if (isLoading || !nonCustomFieldsMap || !customFieldsMap) {
    return <Skeleton active />;
  }

  return (
    <Form layout="vertical" className={styles.form} form={form}>
      {NON_CUSTOM_FIELDS.map((field) => (
        <NonCustomField key={field} field={nonCustomFieldsMap[field]} />
      ))}
      {Object.entries(customFieldsMap).map(([key, value]) => (
        <CustomField key={key} field={value} />
      ))}
    </Form>
  );
}

ApplicationForm.propTypes = {
  jobProfileId: PropTypes.number.isRequired,
  applicationId: PropTypes.number,
  status: PropTypes.string,
};

export default ApplicationForm;
