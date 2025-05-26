import { Button, Flex, message, Space } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateResumeDetailsMutation } from '../../services/resumeBuilderApi';
import { initializeForm } from '../../store/formStoreSlice';
import CustomFormItem from './CustomFormItem';

const FORM_ID = 'achievementsForm';

const initialFormData = {
  achievementsItems: [
    {
      id: null,
      completed: false,
      saved: false,
      formData: {
        description: '',
      },
    },
  ],
};
const CustomForm = ({ onComplete }) => {
  const dispatch = useDispatch();
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const formData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms[FORM_ID]
  );
  const isFormInitialized = useSelector(
    (state) => state.scalantResumeBuilder.formStore.initializedForms[FORM_ID]
  );
  const [updateResumeDetails, { isLoading }] = useUpdateResumeDetailsMutation();

  const initialValues = useMemo(
    () =>
      resumeData?.achievements
        ? {
            achievementsItems: resumeData.achievements.map((achievement) => ({
              id: achievement.id,
              completed: true,
              saved: true,
              formData: {
                description: achievement.description,
              },
            })),
          }
        : initialFormData,
    [resumeData?.achievements]
  );

  useEffect(() => {
    if (!isFormInitialized) {
      dispatch(initializeForm({ formId: FORM_ID, initialData: initialValues }));
    }
  }, [dispatch, isFormInitialized, initialValues]);

  const handleFinish = async () => {
    const achievementsItems = formData?.achievementsItems || [];
    const hasUnsavedItems = achievementsItems.some((item) => !item.saved);

    if (hasUnsavedItems) {
      message.error(
        'Please save all custom form items before marking as complete'
      );
      return;
    }

    const achievements = achievementsItems.map((item) => ({
      id: item.id,
      description: item.formData.description,
    }));

    try {
      const payload = {
        form_stage: 'achievement_details_form',
        isPopulated: true,
        achievements: achievements,
      };
      onComplete?.();

      await updateResumeDetails({
        resumeId: resumeData?.resume_details?.id,
        payload,
      }).unwrap();

      message.success('Achievements updated successfully');
    } catch (error) {
      message.error(`Failed to update achievements: ${error.message}`);
    }
  };

  const handleSaveAndNext = () => {
    handleFinish();
    onComplete?.();
  };

  return (
    <Flex vertical gap={16}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex vertical gap={16}>
          {(formData?.achievementsItems?.length
            ? formData.achievementsItems
            : [
                {
                  id: null,
                  completed: false,
                  saved: false,
                  formData: {
                    description: '',
                  },
                },
              ]
          ).map((item) => (
            <CustomFormItem key={item.id} item={item} formId={FORM_ID} />
          ))}
        </Flex>
        <Flex gap={16}>
          <Button
            type="primary"
            block
            onClick={handleFinish}
            disabled={isLoading}
          >
            Save and Compile
          </Button>
          <Button
            type="default"
            onClick={handleSaveAndNext}
            block
            disabled={isLoading}
          >
            Save and Next
          </Button>
        </Flex>
      </Space>
    </Flex>
  );
};

export default CustomForm;
