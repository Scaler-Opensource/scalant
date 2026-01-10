import { Button, Flex, message, Space } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { useResumeSave } from '../../hooks/useResumeSave';
import { initializeForm, updateFormData } from '../../store/formStoreSlice';

import CustomFormItem from './CustomFormItem';
import { FORM_KEYS } from '../../utils/constants';
import { isHtmlEmpty } from '../../utils/formattingUtils';

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
  const { incompleteForms, currentIncompleteForm } = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms
  );
  const markComplete =
    incompleteForms.length === 0 ||
    (incompleteForms.length <= 1 &&
      currentIncompleteForm === FORM_KEYS.achievements);
  const { saveResume, isLoading } = useResumeSave();

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

  }, [dispatch, isFormInitialized]);

  const handleFinish = async () => {
    const achievementsItems = formData?.achievementsItems || [];
    const hasUnsavedItems = achievementsItems.some((item) => !item.saved);

    if (hasUnsavedItems) {
      message.error(
        'Please save all custom form items before marking as complete'
      );
      return;
    }

    const achievements = achievementsItems
      .filter((item) => !isHtmlEmpty(item.formData.description))
      .map((item) => ({
        ...(item.id && { id: item.id }),
        description: item.formData.description,
      }));

    try {
      const payload = {
        form_stage: 'achievement_details_form',
        isPopulated: true,
        achievements: achievements,
        mark_complete: markComplete,
      };

      const updatedResumeData = await saveResume({
        payload,
        optimisticData: {
          achievements: achievements,
        },
      });

      if (!updatedResumeData) return;

      // Fix: If we sent an empty list and backend didn't return the key, force it to []
      if (
        payload.achievements.length === 0 &&
        !updatedResumeData.achievements
      ) {
        updatedResumeData.achievements = [];
      }

      // Force update the form data with the new data from backend (which includes IDs)
      if (updatedResumeData?.achievements) {
        const newFormItems = updatedResumeData.achievements.map((item) => ({
          id: item.id,
          completed: true,
          saved: true,
          formData: {
            description: item.description,
          },
        }));

        dispatch(
          updateFormData({
            formId: FORM_ID,
            data: {
              achievementsItems: newFormItems,
            },
          })
        );
      }

      message.success('Achievements updated successfully');
    } catch (error) {
      message.error(`Failed to update achievements: ${error.message}`);
    }
  };

  const handleSaveAndNext = () => {
    onComplete?.(FORM_KEYS.achievements);
    handleFinish();
  };

  const handleSaveAndCompile = () => {
    onComplete?.(FORM_KEYS.achievements, true);
    handleFinish();
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
            onClick={handleSaveAndCompile}
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
