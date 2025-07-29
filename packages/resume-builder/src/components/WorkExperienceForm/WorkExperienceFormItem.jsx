import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Card,
  Flex,
  Divider,
  Typography,
  Checkbox,
  DatePicker,
} from 'antd';
import { DownOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import { WORK_EXPERIENCE_FORM_REQUIRED_FIELDS } from '../../utils/constants';
import { updateFormData } from '../../store/formStoreSlice';
import RichTextEditor from '../RichTextEditor';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const { Text } = Typography;

const WorkExperienceFormItem = ({ item, formId, required = false, index }) => {
  const dispatch = useDispatch();
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[formId]
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues, allValues) => {
    const currentItems = formData?.workExperienceItems || [];

    // If all required fields are filled mark completed
    const updatedItems = currentItems.map((workExperienceItem) =>
      workExperienceItem.index === index
        ? {
            ...workExperienceItem,
            formData: allValues,
            completed: WORK_EXPERIENCE_FORM_REQUIRED_FIELDS.every(
              (field) => allValues[field]
            ),
          }
        : workExperienceItem
    );

    dispatch(
      updateFormData({
        formId,
        data: {
          workExperienceItems: updatedItems,
        },
      })
    );
  };

  const handleExpand = () => {
    const currentItems = formData?.workExperienceItems || [];
    const updatedItems = currentItems.map((workExperienceItem) =>
      workExperienceItem.index === index
        ? { ...workExperienceItem, expanded: !workExperienceItem.expanded }
        : workExperienceItem
    );

    dispatch(
      updateFormData({
        formId,
        data: { workExperienceItems: updatedItems },
      })
    );
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    const currentItems = formData?.workExperienceItems || [];
    const updatedItems = currentItems.filter(
      (workExperienceItem) => workExperienceItem.index !== index
    );

    dispatch(
      updateFormData({
        formId,
        data: { workExperienceItems: updatedItems },
      })
    );
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  if (!item.expanded) {
    return (
      <Card key={index} onClick={handleExpand}>
        <Flex justify="space-between" align="center">
          <Flex vertical gap={4}>
            <Text strong>{item.formData?.company}</Text>
            <Text>
              {item.formData?.position ? `${item.formData?.position}, ` : '---'}
              <Divider type="vertical" />
              {item.formData?.from
                ? `${item.formData?.from.format('YYYY')}`
                : '---'}
              -
              {item.formData?.to
                ? `${item.formData?.to.format('YYYY')}`
                : item.formData?.is_current
                  ? `Present`
                  : '---'}
            </Text>
          </Flex>
          <DownOutlined />
        </Flex>
      </Card>
    );
  }

  return (
    <Card key={index}>
      <Flex gap={16} justify="space-between">
        <Flex gap={4}>
          <Text>Work Experience {index + 1}</Text>
            <DeleteOutlined onClick={handleDelete} style={{ color: 'red' }} />
        </Flex>
        <UpOutlined onClick={handleExpand} />
      </Flex>
      <Form
        form={form}
        layout="vertical"
        initialValues={item.formData}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name={`company`}
          label="Company"
          rules={[{ required: required }]}
        >
          <Input placeholder="Enter Company" />
        </Form.Item>
        <Form.Item
          name={`position`}
          label="Position"
          rules={[{ required: required }]}
        >
          <Input placeholder="Enter Position" />
        </Form.Item>
        <Form.Item name={`is_current`} valuePropName="checked">
          <Checkbox>I am currently working here</Checkbox>
        </Form.Item>
        <Flex gap={16}>
          <Form.Item
            name={`from`}
            label="Start Date"
            rules={[{ required: required }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name={`to`}
            label="End Date"
            rules={[{ required: required && !item.formData?.is_current }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabled={item.formData?.is_current}
            />
          </Form.Item>
        </Flex>
        <Form.Item name={`location`} label="Location">
          <Input />
        </Form.Item>
        <Form.Item name={`short_description`} label="Key Points">
          <RichTextEditor
            form={form}
            fieldName="short_description"
            placeholder="Enter Key Points"
            onValuesChange={handleValuesChange}
          />
        </Form.Item>
      </Form>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        title="Delete Work Experience"
        description="Are you sure you want to delete this work experience?"
        style={{ top: 20 }}
      />
    </Card>
  );
};

export default WorkExperienceFormItem;
