import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Space, Button, Flex, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EducationFormItem from './EducationFormItem';
import CustomEducationFormItem from './CustomEducationFormItem';
import { useResumeSave } from '../../hooks/useResumeSave';
import { initializeForm, updateFormData } from '../../store/formStoreSlice';
import { setIncompleteForms } from '../../store/resumeFormsSlice';
import dayjs from 'dayjs';
import { FORM_KEYS } from '../../utils/constants';

const FORM_ID = 'educationForm';

const initialFormData = {
  educationItems: [
    {
      completed: false,
      index: 0,
      expanded: true,
      formData: {
        university: '',
        degree: '',
        field: '',
        marks: '',
        marks_type: '',
        graduation_date: '',
        short_description: '',
        custom_section_name: null,
        custom_section_description: null,
      },
    },
  ],
  customEducation: null,
};

const EducationForm = ({ onComplete, required = false }) => {
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
      currentIncompleteForm === FORM_KEYS.education);
  const { saveResume, isLoading } = useResumeSave();

  const initialValues = useMemo(() => {
    let value =
      resumeData?.education && resumeData?.education.length > 0
        ? {
          educationItems: resumeData.education.map((item, index) => ({
            id: item.id,
            index: index,
            completed: true,
            expanded: false,
            formData: {
              university: item.university,
              degree: item.degree,
              field: item.field,
              marks: item.marks,
              marks_type: item.marks_type,
              graduation_date: item.graduation_date
                ? dayjs(item.graduation_date)
                : null,
              short_description: item.short_description,
            },
          })),
        }
        : { ...initialFormData };

    value.customEducation =
      resumeData?.resume_custom_section &&
        Object.keys(resumeData?.resume_custom_section).length
        ? {
          id: resumeData?.resume_custom_section?.id,
          completed: true,
          expanded: true,
          formData: {
            name: resumeData?.resume_custom_section?.name,
            description: resumeData?.resume_custom_section?.description,
            created_at: resumeData?.resume_custom_section?.created_at,
            updated_at: resumeData?.resume_custom_section?.updated_at,
            id: resumeData?.resume_custom_section?.id,
            user_id: resumeData?.resume_custom_section?.user_id,
          },
        }
        : null;

    return { ...value };
  }, [resumeData?.education, resumeData?.resume_custom_section]);

  useEffect(() => {
    if (!isFormInitialized) {
      dispatch(
        initializeForm({
          formId: FORM_ID,
          initialData: initialValues,
        })
      );
    }
    // Don't re-initialize when initialValues changes after form is initialized
    // This prevents overwriting user input when resumeData updates
  }, [dispatch, isFormInitialized]);

  const handleAddEducation = () => {
    const currentItems = formData?.educationItems || [];
    const newIndex = currentItems.length;

    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: {
          educationItems: [
            ...currentItems.map((item) => ({ ...item, expanded: false })),
            {
              index: newIndex,
              completed: false,
              expanded: true,
              formData: {
                university: '',
                degree: '',
                field: '',
                marks: '',
                marks_type: '',
                graduation_date: '',
                short_description: '',
              },
            },
          ],
        },
      })
    );
  };

  const createEducationPayload = (educationItems) => {
    return educationItems.map((item) => ({
      ...(item.id && { id: item.id }),
      university: item.formData.university,
      degree: item.formData.degree,
      field: item.formData.field,
      marks: item.formData.marks,
      marks_type: item.formData.grade_type,
      graduation_date: item.formData.graduation_date,
      short_description: item.formData.short_description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  };

  const handleFinish = async () => {
    const educationItems = formData?.educationItems || [];
    const customEducation = formData?.customEducation;
    const hasUncompletedItems = educationItems.some((item) => !item.completed);

    if (hasUncompletedItems) {
      message.error(
        'Please fill all education items before marking as complete'
      );
      return;
    }

    const educationPayload = createEducationPayload(educationItems);

    try {
      const payload = {
        form_stage: 'education_details_form',
        isPopulated: true,
        mark_complete: markComplete,
        educations: educationPayload,
        resume_custom_section: {
          ...customEducation?.formData,
        },
      };

      const updatedResumeData = await saveResume({
        payload,
        optimisticData: {
          education: educationPayload,
          resume_custom_section: {
            ...customEducation?.formData,
          },
        },
      });

      if (!updatedResumeData) return false;

      // Fix: If we sent an empty list and backend didn't return the key, force it to []
      if (educationPayload.length === 0 && !updatedResumeData.education) {
        updatedResumeData.education = [];
      }

      // Force update the form data with the new data from backend (which includes IDs)
      let value = {};
      if (updatedResumeData?.education) {
        const newFormItems = updatedResumeData.education.map(
          (item, index) => ({
            id: item.id || `temp-${index}`,
            index: index,
            completed: true,
            expanded: false,
            formData: {
              university: item.university,
              degree: item.degree,
              field: item.field, // Added field back
              marks: item.marks, // Added marks back
              marks_type: item.marks_type, // Added marks_type back
              graduation_date: item.graduation_date
                ? dayjs(item.graduation_date)
                : null,
              short_description: item.short_description, // Added short_description back
            },
          })
        );
        value.educationItems = newFormItems;
      } else {
        value.educationItems = { ...initialFormData }.educationItems;
      }

      value.customEducation =
        updatedResumeData?.resume_custom_section &&
          Object.keys(updatedResumeData?.resume_custom_section).length
          ? {
            id: updatedResumeData?.resume_custom_section?.id,
            completed: true,
            expanded: true,
            formData: {
              name: updatedResumeData?.resume_custom_section?.name,
              description:
                updatedResumeData?.resume_custom_section?.description,
              created_at:
                updatedResumeData?.resume_custom_section?.created_at,
              updated_at:
                updatedResumeData?.resume_custom_section?.updated_at,
              id: updatedResumeData?.resume_custom_section?.id,
              user_id: updatedResumeData?.resume_custom_section?.user_id,
            },
          }
          : null;

      dispatch(
        updateFormData({
          formId: FORM_ID,
          data: value,
        })
      );

      message.success('Education details updated successfully');
      return true;
    } catch (error) {
      message.error(`Failed to update education details: ${error.message}`);
      return false;
    }
  };
  const handleSaveAndCompile = async () => {
    try {
      const success = await handleFinish();
      if (success) {
        onComplete?.(FORM_KEYS.education, true);
      }
    } catch (e) {
      // handled
    }
  };
  const handleSaveAndNext = async () => {
    try {
      const success = await handleFinish();
      if (success) {
        onComplete?.(FORM_KEYS.education);
      }
    } catch (e) {
      // handled
    }
  };

  return (
    <Flex vertical gap={16}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex vertical gap={16}>
          {(formData?.educationItems || []).map((item, index) => (
            <EducationFormItem
              index={index}
              key={index}
              item={item}
              formId={FORM_ID}
              required={required}
            />
          ))}

          {formData?.customEducation && (
            <CustomEducationFormItem formId={FORM_ID} />
          )}
        </Flex>
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={handleAddEducation}
        >
          {(formData?.educationItems || []).length === 1
            ? 'Add secondary education'
            : 'Add another education'}
        </Button>
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

export default EducationForm;
