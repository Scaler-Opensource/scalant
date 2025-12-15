import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Radio, Row, Col } from 'antd';
import { useFilterMetaOptions } from '../../hooks/useFilterMetaOptions';
import {
  ALERT_FREQUENCY,
  ALERT_NOTIFICATION_TYPE,
} from '../../utils/constants';
import styles from './JobAlertModal.module.scss';

const { Option } = Select;

function JobAlertForm({ form, initialValues, onSubmit, isSubmitting }) {
  const { functions, locations, ctcRanges } = useFilterMetaOptions();
  const [frequency, setFrequency] = useState('realtime');

  useEffect(() => {
    if (initialValues && form) {
      // Map frequency back to form value
      const frequencyReverseMap = {
        [ALERT_FREQUENCY.REALTIME]: 'realtime',
        [ALERT_FREQUENCY.DAILY]: 'daily',
        [ALERT_FREQUENCY.ALTERNATE_DAY]: 'alternate',
        [ALERT_FREQUENCY.WEEKLY]: 'weekly',
      };

      const frequencyValue =
        frequencyReverseMap[initialValues.frequency] || 'realtime';

      const formValues = {
        name: initialValues.name,
        job_functions: initialValues.job_functions || [],
        min_ctc: initialValues.min_ctc,
        locations: initialValues.locations || [],
        min_experience: initialValues.min_experience?.toString() || '',
        max_experience: initialValues.max_experience?.toString() || '',
        frequency: frequencyValue,
        notification_type:
          initialValues.notification_type || ALERT_NOTIFICATION_TYPE.EMAIL,
      };

      form.setFieldsValue(formValues);
      setFrequency(frequencyValue);
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Map frequency values
      const frequencyMap = {
        realtime: ALERT_FREQUENCY.REALTIME,
        daily: ALERT_FREQUENCY.DAILY,
        alternate: ALERT_FREQUENCY.ALTERNATE_DAY,
        weekly: ALERT_FREQUENCY.WEEKLY,
      };

      // Prepare payload
      const isRealtime = values.frequency === 'realtime';
      const payload = {
        alert: {
          name: values.name,
          job_functions: values.job_functions || [],
          min_ctc: values.min_ctc,
          locations: values.locations || [],
          min_experience: values.min_experience
            ? parseInt(values.min_experience, 10)
            : 0,
          max_experience: values.max_experience
            ? parseInt(values.max_experience, 10)
            : null,
          frequency: frequencyMap[values.frequency] || ALERT_FREQUENCY.REALTIME,
          notification_type: isRealtime
            ? values.notification_type || ALERT_NOTIFICATION_TYPE.EMAIL
            : ALERT_NOTIFICATION_TYPE.EMAIL,
        },
      };

      if (onSubmit) {
        await onSubmit(payload);
      }
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error submitting form:', error);
    }
  };

  // Expose submit handler via form ref if needed
  useEffect(() => {
    if (form && onSubmit) {
      form.submit = handleSubmit;
    }
  }, [form, onSubmit]);

  // Watch frequency changes from form
  const watchedFrequency = Form.useWatch('frequency', form) || 'realtime';
  useEffect(() => {
    setFrequency(watchedFrequency);
  }, [watchedFrequency]);

  return (
    <Form
      form={form}
      layout="vertical"
      className={styles.createAlertContent}
      initialValues={{ frequency: 'realtime' }}
    >
      <Form.Item
        label="Alert Name"
        name="name"
        rules={[{ required: true, message: 'Please enter alert name' }]}
      >
        <Input placeholder="Give your job alert a name" />
      </Form.Item>

      <Form.Item
        label="Job Function"
        name="job_functions"
        rules={[
          {
            required: true,
            message: 'Please select at least one job function',
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select job function"
          className={styles.formInput}
        >
          {functions.map((func) => (
            <Option key={func.key} value={func.key}>
              {func.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Minimum CTC (in Lakhs)?"
        name="min_ctc"
        rules={[{ required: true, message: 'Please select minimum CTC' }]}
      >
        <Select placeholder="Select range" className={styles.formInput}>
          {ctcRanges.map((range) => (
            <Option key={range.value} value={range.value}>
              {range.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Locations?"
        name="locations"
        rules={[
          { required: true, message: 'Please select at least one location' },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select locations"
          className={styles.formInput}
        >
          {locations.map((loc) => (
            <Option key={loc.key} value={loc.value}>
              {loc.value}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Experience (Years)?">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="min_experience"
              rules={[
                { required: true, message: 'Please enter minimum experience' },
              ]}
              noStyle
            >
              <Input placeholder="Minimum" type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="max_experience"
              rules={[
                { required: true, message: 'Please enter maximum experience' },
              ]}
              noStyle
            >
              <Input placeholder="Maximum" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        label="Alert Frequency"
        name="frequency"
        rules={[{ required: true, message: 'Please select alert frequency' }]}
      >
        <Radio.Group
          className={styles.radioGroup}
          onChange={(e) => {
            setFrequency(e.target.value);
            // Set default email when frequency changes to non-realtime
            if (e.target.value !== 'realtime') {
              form.setFieldsValue({
                notification_type: ALERT_NOTIFICATION_TYPE.EMAIL,
              });
            }
          }}
        >
          <Radio value="realtime">Realtime</Radio>
          <Radio value="daily">Daily</Radio>
          <Radio value="alternate">Every alternate day</Radio>
          <Radio value="weekly">Weekly</Radio>
        </Radio.Group>
      </Form.Item>

      {frequency === 'realtime' && (
        <Form.Item
          label="Alert mode"
          name="notification_type"
          rules={[
            { required: true, message: 'Please select notification type' },
          ]}
        >
          <Radio.Group className={styles.radioGroup}>
            <Radio value={ALERT_NOTIFICATION_TYPE.EMAIL}>Email</Radio>
            <Radio value={ALERT_NOTIFICATION_TYPE.WHATSAPP}>Whatsapp</Radio>
            <Radio value={ALERT_NOTIFICATION_TYPE.BOTH}>Both</Radio>
          </Radio.Group>
        </Form.Item>
      )}
    </Form>
  );
}

export default JobAlertForm;

