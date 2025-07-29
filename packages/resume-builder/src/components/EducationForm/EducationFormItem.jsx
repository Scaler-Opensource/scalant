import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Typography,
  Flex,
  Divider,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';
import { DownOutlined, DeleteOutlined, UpOutlined } from '@ant-design/icons';
import { updateFormData } from '../../store/formStoreSlice';
import { EDUCATION_FORM_REQUIRED_FIELDS } from '../../utils/constants';
import styles from './EducationForm.module.scss';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const { Text } = Typography;

const EducationFormItem = ({ item, formId, required = false, index }) => {
  const dispatch = useDispatch();
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[formId]
  );
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleValuesChange = (changedValues, allValues) => {
    const currentItems = formData?.educationItems || [];
    const updatedItems = currentItems.map((educationItem) =>
      educationItem.index === index
        ? {
            ...educationItem,
            formData: allValues,
            completed: EDUCATION_FORM_REQUIRED_FIELDS.every(
              (field) => allValues[field]
            ),
          }
        : educationItem
    );

    dispatch(
      updateFormData({
        formId,
        data: {
          educationItems: updatedItems,
        },
      })
    );
  };

  const handleExpand = () => {
    const currentItems = formData?.educationItems || [];
    const updatedItems = currentItems.map((educationItem) =>
      educationItem.index === index
        ? {
            ...educationItem,
            expanded: !educationItem.expanded,
          }
        : educationItem
    );

    dispatch(
      updateFormData({
        formId,
        data: {
          educationItems: updatedItems,
        },
      })
    );
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalOk = () => {
    const currentItems = formData?.educationItems || [];
    const updatedItems = currentItems.filter(
      (educationItem) => educationItem.index !== index
    );

    dispatch(
      updateFormData({
        formId,
        data: {
          educationItems: updatedItems,
        },
      })
    );
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const selectAfter = (
    <Form.Item name="grade_type" noStyle>
      <Select
        options={[
          { label: 'CGPA', value: 'cgpa' },
          { label: 'Percentage', value: 'percentage' },
        ]}
      />
    </Form.Item>
  );

  if (!item.expanded) {
    return (
      <Card key={index} onClick={handleExpand}>
        <Flex justify="space-between" align="center">
          <Flex vertical gap={4}>
            <Text strong>
              {item.formData?.university ? item.formData?.university : '---'}
            </Text>
            <Text>
              {item.formData?.degree ? `${item.formData.degree}, ` : '---'}
              <Divider type="vertical" />
              {item.formData?.graduation_date
                ? `${item.formData.graduation_date.format('YYYY')}`
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
          <Text strong>Education {index + 1}</Text>
          <DeleteOutlined onClick={handleDelete} style={{ color: 'red' }} />
        </Flex>
        <UpOutlined onClick={handleExpand} />
      </Flex>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={{
          grade_type: 'cgpa',
          ...item.formData,
        }}
      >
        <Form.Item
          name="university"
          label="University Name"
          rules={[{ required }]}
        >
          <Input placeholder="Enter University Name" />
        </Form.Item>
        <Flex gap={16}>
          <Form.Item
            name="degree"
            label="Degree Type"
            rules={[{ required }]}
            className={styles.midWidth}
          >
            <Select
              placeholder="Select Degree Type"
              options={[
                { label: 'BE/B.Tech/Bs', value: 'BE/B.Tech/Bs' },
                { label: 'ME/M.Tech', value: 'ME/M.Tech' },
                {
                  label: 'Dual Degree - BE + ME',
                  value: 'Dual Degree - BE + ME',
                },
                { label: 'MS', value: 'MS' },
                { label: 'MBA', value: 'MBA' },
                { label: 'MCA/BCA', value: 'MCA/BCA' },
                { label: 'BE + MBA', value: 'BE + MBA' },
                { label: 'Other', value: 'Other' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="field"
            label="Field of Study"
            className={styles.midWidth}
          >
            <Select
              placeholder="Select Field of Study"
              options={[
                { label: 'Computer Science', value: 'computer-science' },
                {
                  label: 'Information Technology',
                  value: 'information-technology',
                },
                {
                  label: 'Mathematics and Computing',
                  value: 'mathematics-and-computing',
                },
                {
                  label: 'Electronics',
                  value: 'electronics',
                },
                {
                  label: 'Mechanical',
                  value: 'mechanical',
                },
                {
                  label: 'Civil',
                  value: 'civil',
                },
                {
                  label: 'MBA',
                  value: 'mba',
                },
                {
                  label: 'Electical',
                  value: 'electrical',
                },
                {
                  label: 'Other',
                  value: 'other',
                },
              ]}
            />
          </Form.Item>
        </Flex>
        <Flex gap={16} className={styles.fullWidth}>
          <Form.Item
            name="marks"
            label="Marks (Final/Current)"
            rules={[{ required }]}
            className={styles.midWidth}
          >
            <InputNumber placeholder="Enter Marks" addonAfter={selectAfter} />
          </Form.Item>
          <Form.Item
            name="graduation_date"
            label="Graduation (Actual/Expected)"
            rules={[{ required }]}
            className={styles.midWidth}
          >
            <DatePicker
              placeholder="Select Graduation Date"
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Flex>
        <Form.Item name="short_description" label="Description">
          <RichTextEditor
            form={form}
            fieldName="short_description"
            placeholder="Enter Description"
            onValuesChange={handleValuesChange}
          />
        </Form.Item>
      </Form>
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        title="Delete Education"
        description="Are you sure you want to delete this education item?"
        style={{ top: 20 }}
      />
    </Card>
  );
};

export default EducationFormItem;
