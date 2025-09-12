import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeForm, updateFormData } from '../../store/formStoreSlice';

import { Space, Button, Flex, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProjectFormItem from './ProjectFormItem';

import { useUpdateResumeDetailsMutation } from '../../services/resumeBuilderApi';
import AiSuggestionBanner from '../AiSuggestionBanner/AiSuggestionBanner';
import SectionFeedback from '../SectionFeedback/SectionFeedback';
import { FORM_KEYS } from '../../utils/constants';

const FORM_ID = 'projectForm';

const initialFormData = {
  projectItems: [
    {
      index: 0,
      completed: false,
      expanded: true,
      formData: {
        title: '',
        project_link: '',
        description: '',
      },
    },
  ],
};

const ProjectForm = ({ onComplete, required = false, onAiSuggestionClick }) => {
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
  const reviewData = useSelector(
    (state) => state.scalantResumeBuilder.resumeReview.reviewData
  );
  const projectFeedback = useMemo(() => {
    return (
      reviewData?.resume_evaluation_result?.section_feedback?.projects || []
    );
  }, [reviewData]);
  const { incompleteForms, currentIncompleteForm } = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms
  );
  const markComplete =
    incompleteForms.length === 0 ||
    (incompleteForms.length <= 1 &&
      currentIncompleteForm === FORM_KEYS.projects);
  const [updateResumeDetails, { isLoading }] = useUpdateResumeDetailsMutation();

  const initialValues = useMemo(
    () =>
      resumeData?.projects && resumeData?.projects.length > 0
        ? {
          projectItems: resumeData.projects.map((item, index) => ({
            id: item.id,
            index: index,
            completed: true,
            expanded: false,
            formData: {
              title: item.title,
              project_link: item.project_link,
              description: item.description,
            },
          })),
        }
        : initialFormData,
    [resumeData?.projects]
  );

  useEffect(() => {
    if (!isFormInitialized) {
      dispatch(
        initializeForm({
          formId: FORM_ID,
          initialData: initialValues,
        })
      );
    }
  }, [dispatch, isFormInitialized, initialValues]);

  const handleAddProject = () => {
    const currentItems = formData?.projectItems || [];
    const newIndex = currentItems.length;
    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: {
          projectItems: [
            ...currentItems.map((item) => ({ ...item, expanded: false })),
            {
              index: newIndex,
              completed: false,
              expanded: true,
              formData: {
                title: '',
                project_link: '',
                description: '',
              },
            },
          ],
        },
      })
    );
  };

  const createProjectsPayload = (projectItems) => {
    return projectItems.map((item) => ({
      ...(item.id && { id: item.id }),
      title: item.formData.title,
      description: item.formData.description,
      project_link: item.formData.project_link,
      user_id: resumeData?.user_id,
    }));
  };

  const handleFinish = async () => {
    const projectItems = formData?.projectItems || [];
    const hasUncompletedItems = projectItems.some((item) => !item.completed);

    if (hasUncompletedItems) {
      message.error('Please fill all project items before marking as complete');
      return;
    }

    const projectsPayload = createProjectsPayload(projectItems);

    try {
      const payload = {
        form_stage: 'project_details_form',
        isPopulated: true,
        projects: projectsPayload,
        mark_complete: markComplete,
      };

      await updateResumeDetails({
        resumeId: resumeData?.resume_details?.id,
        payload,
      }).unwrap();
      message.success('Projects updated successfully');
    } catch (error) {
      message.error(`Failed to update projects: ${error.message}`);
    }
  };

  const handleSaveAndCompile = () => {
    onComplete?.(FORM_KEYS.projects, true);
    handleFinish();
  };

  const handleSaveAndNext = () => {
    onComplete?.(FORM_KEYS.projects);
    handleFinish();
  };

  return (
    <Flex vertical gap={16}>
      <AiSuggestionBanner onClick={onAiSuggestionClick} />
      <SectionFeedback feedbackData={projectFeedback} />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex vertical gap={16}>
          {(formData?.projectItems || []).map((item, index) => (
            <ProjectFormItem
              index={index}
              key={index}
              item={item}
              formId={FORM_ID}
              required={required}
            />
          ))}
        </Flex>
        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={handleAddProject}
        >
          Add Project
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

export default ProjectForm;
