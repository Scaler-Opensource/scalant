import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { updateFormData } from '../../store/formStoreSlice';
import RichTextEditor from '../RichTextEditor';
import { isHtmlEmpty } from '../../utils/formattingUtils';

const CustomFormItem = ({ item, formId }) => {
  const dispatch = useDispatch();
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[formId]
  );
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues, allValues) => {
    // Sanitize description field
    const sanitizedValues = { ...allValues };
    if (isHtmlEmpty(sanitizedValues.description)) {
      sanitizedValues.description = '';
    }

    // Get current items from formData or initialize with current item if empty
    const currentItems = formData?.achievementsItems || [item];

    // Find the index of the current item
    const itemIndex = currentItems.findIndex(
      (achievementItem) => achievementItem.id === item.id
    );

    let updatedItems;
    if (itemIndex === -1) {
      // If item not found, add it to the array
      updatedItems = [
        ...currentItems,
        { ...item, formData: sanitizedValues, saved: true },
      ];
    } else {
      // Update existing item
      updatedItems = currentItems.map((achievementItem) =>
        achievementItem.id === item.id
          ? { ...achievementItem, formData: sanitizedValues, saved: true }
          : achievementItem
      );
    }

    dispatch(
      updateFormData({
        formId,
        data: { achievementsItems: updatedItems },
      })
    );
  };

  const sanitizedInitialValues = {
    ...item.formData,
    description: isHtmlEmpty(item.formData?.description)
      ? ''
      : item.formData?.description,
  };

  return (
    <Form
      key={item.id}
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={sanitizedInitialValues}
    >
      <Form.Item name="description" label="">
        <RichTextEditor
          form={form}
          fieldName="description"
          placeholder="Enter your achievements description"
          onValuesChange={handleValuesChange}
        />
      </Form.Item>
    </Form>
  );
};

export default CustomFormItem;
