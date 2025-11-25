import React, { useEffect } from 'react';
import { Modal, Form, InputNumber, Typography, Space } from 'antd';

const { Text } = Typography;

const ExperienceModal = ({ open, skill, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.resetFields();
    }
  }, [open, form, skill?.subtopic_id]);

  const handleFinish = (values) => {
    onSubmit?.(values);
  };

  return (
    <Modal
      open={open}
      title={
        skill
          ? `Enter your experience with ${skill.subtopic}`
          : 'Enter your experience'
      }
      onCancel={onCancel}
      okText="Save"
      onOk={() => form.submit()}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ years: 0, months: 0 }}
        onFinish={handleFinish}
      >
        <Text>Specify your experience in years and months.</Text>
        <Space size={16} style={{ marginTop: 16 }}>
          <Form.Item
            label="Years"
            name="years"
            rules={[
              {
                required: true,
                message: 'Please enter years of experience',
              },
            ]}
          >
            <InputNumber min={0} placeholder="Years" />
          </Form.Item>
          <Form.Item
            label="Months"
            name="months"
            rules={[
              {
                required: true,
                message: 'Please enter months of experience',
              },
            ]}
          >
            <InputNumber min={0} max={11} placeholder="Months" />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default ExperienceModal;
