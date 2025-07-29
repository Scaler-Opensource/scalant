import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Flex, Typography, Input } from 'antd';
import { DownOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import { PROJECT_FORM_REQUIRED_FIELDS } from '../../utils/constants';
import { updateFormData } from '../../store/formStoreSlice';
import RichTextEditor from '../RichTextEditor';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const { Text } = Typography;
const urlPattern =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const ProjectFormItem = ({ item, formId, required = false, index }) => {
  const dispatch = useDispatch();
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[formId]
  );
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleValuesChange = (changedValues, allValues) => {
    const currentItems = formData?.projectItems || [];
    const updatedItems = currentItems.map((projectItem) =>
      projectItem.index === index
        ? {
            ...projectItem,
            formData: allValues,
            completed: PROJECT_FORM_REQUIRED_FIELDS.every(
              (field) => allValues[field]
            ),
          }
        : projectItem
    );

    dispatch(
      updateFormData({
        formId,
        data: {
          projectItems: updatedItems,
        },
      })
    );
  };

  const handleExpand = () => {
    const currentItems = formData?.projectItems || [];
    const updatedItems = currentItems.map((projectItem) =>
      projectItem.index === index
        ? { ...projectItem, expanded: !projectItem.expanded }
        : projectItem
    );

    dispatch(
      updateFormData({
        formId,
        data: { projectItems: updatedItems },
      })
    );
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    const currentItems = formData?.projectItems || [];
    const updatedItems = currentItems.filter(
      (projectItem) => projectItem.index !== index
    );

    dispatch(updateFormData({ formId, data: { projectItems: updatedItems } }));
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  if (!item.expanded) {
    return (
      <Card key={index} onClick={handleExpand}>
        <Flex justify="space-between" align="center">
          <Text strong>
            {item.formData?.title ? item.formData?.title : '---'}
          </Text>
          <DownOutlined />
        </Flex>
      </Card>
    );
  }

  return (
    <Card key={index}>
      <Flex gap={16} justify="space-between">
        <Flex gap={4}>
          <Text>Project {index + 1}</Text>
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
          name={`title`}
          label="Project Name"
          rules={[{ required: required }]}
        >
          <Input placeholder="Enter Project Name" />
        </Form.Item>
        <Form.Item
          name={`project_link`}
          label="Project Link"
          rules={[
            { required: required },
            {
              pattern: urlPattern,
              message: 'Please enter a valid URL',
            },
          ]}
        >
          <Input placeholder="Enter Project Link" />
        </Form.Item>
        <Form.Item
          name={`description`}
          label="Key Points"
          rules={[{ required: required }]}
        >
          <RichTextEditor
            form={form}
            fieldName="description"
            placeholder="Enter Key Points"
            onValuesChange={handleValuesChange}
          />
        </Form.Item>
      </Form>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        title="Delete Project"
        description="Are you sure you want to delete this project?"
        style={{ top: 20 }}
      />
    </Card>
  );
};

export default ProjectFormItem;
