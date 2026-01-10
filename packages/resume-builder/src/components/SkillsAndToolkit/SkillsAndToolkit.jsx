import {
  Button,
  Checkbox,
  Flex,
  Space,
  message,
  Typography,
  Tooltip,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateResumeDetailsMutation } from '../../services/resumeBuilderApi';
import { initializeForm, updateFormData } from '../../store/formStoreSlice';
import { setResumeData } from '../../store/resumeBuilderSlice';
import SectionFeedback from '../SectionFeedback/SectionFeedback';

import styles from './SkillsAndToolkit.module.scss';
import { FORM_KEYS } from '../../utils/constants';
import SkillDemoVideoModal from './SkillDemoVideoModal';
import { SKILL_VIEW_TOOLTIPS } from './constants';
import SearchableSkillPicker from './SearchableSkillPicker';
import ExperienceModal from './ExperienceModal';
import SelectedSkillsPanel from './SelectedSkillsPanel';
import SuggestedSkillsPanel from './SuggestedSkillsPanel';

const { Text } = Typography;

const FORM_ID = 'skillsForm';

const CATEGORY_TYPE_MAP = {
  language: 0, // Programming Languages
  framework: 1, // Libraries and Frameworks
  tools: 2, // Tools
};

const initialFormData = {
  selectedSkills: [],
  skillExperience: {},
};

const SkillsAndToolkit = ({ onComplete }) => {
  const dispatch = useDispatch();
  const [categorizeSkills, setCategorizeSkills] = useState(false);
  const [pendingSkill, setPendingSkill] = useState(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

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
  const skillsFeedback = useMemo(() => {
    return reviewData?.resume_evaluation_result?.section_feedback?.skills || [];
  }, [reviewData]);

  const { incompleteForms, currentIncompleteForm } = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms
  );
  const markComplete =
    incompleteForms.length === 0 ||
    (incompleteForms.length <= 1 && currentIncompleteForm === FORM_KEYS.skills);
  const {
    resume_builder_skills: resumeBuilderSkills,
    skill_data: skillsData = [],
    course_based_skills: metaCourseBasedSkills = [],
  } = useSelector((state) => state.scalantResumeBuilder.metaData.meta);

  const [updateResumeDetails, { isLoading }] = useUpdateResumeDetailsMutation();

  const initialValues = useMemo(
    () =>
      resumeData?.skills
        ? {
          selectedSkills: resumeData.skills.filter((skill) =>
            skillsData.some((data) => data.subtopic_id === skill.skill_id)
          ),
        }
        : initialFormData,
    [resumeData?.skills, skillsData]
  );

  // Helper to get the view type for Skills section
  const getSkillsSectionView = (resumeData) => {
    const template = resumeData?.scaler_resume_template_structure;
    if (!template) return 'view1';
    const templateKey = Object.keys(template)[0];
    const sections = template[templateKey]?.sections || [];
    const skillsSection = sections.find((section) => section.name === 'Skills');
    return skillsSection?.config?.view || 'view1';
  };

  const selectedSkills = formData?.selectedSkills || [];
  const courseBasedSkills =
    resumeData?.course_based_skills || metaCourseBasedSkills || [];
  const selectedSkillIds = selectedSkills.map((skill) => skill.skill_id);

  const handleExperienceUpdate = (skill, years, months) => {
    if (!skill) return;
    const selectedSkill = selectedSkills.find(
      (s) => s.skill_id === skill.subtopic_id
    );

    if (selectedSkill) {
      // Update existing skill experience
      const updatedSelectedSkills = selectedSkills.map((s) => {
        if (s.skill_id === skill.subtopic_id) {
          return {
            ...s,
            proficiency_period: {
              years,
              months,
            },
          };
        }
        return s;
      });

      dispatch(
        updateFormData({
          formId: FORM_ID,
          data: {
            selectedSkills: updatedSelectedSkills,
          },
        })
      );
    } else {
      // Create new skill with experience
      const newSkill = {
        skill_id: skill.subtopic_id,
        skill_type: 'SubTopic',
        name: skill.subtopic,
        proficiency_period: {
          years,
          months,
        },
      };

      dispatch(
        updateFormData({
          formId: FORM_ID,
          data: {
            selectedSkills: [...selectedSkills, newSkill],
          },
        })
      );
    }
  };

  const handleSkillSelect = (skill) => {
    if (!skill) return;
    const isAlreadySelected = selectedSkills.some(
      (s) => s.skill_id === skill.subtopic_id
    );
    if (isAlreadySelected) {
      message.warning(`${skill.subtopic || skill.name} is already added`);
      return;
    }
    setPendingSkill(skill);
    setIsExperienceModalOpen(true);
  };

  const handleSkillSelectFromSearch = handleSkillSelect;

  const handleExperienceModalSubmit = ({ years, months }) => {
    if (!pendingSkill) return;
    handleExperienceUpdate(pendingSkill, years, months);
    setPendingSkill(null);
    setIsExperienceModalOpen(false);
  };

  const handleExperienceModalCancel = () => {
    setPendingSkill(null);
    setIsExperienceModalOpen(false);
  };

  // Prefill categorizeSkills from resumeData
  useEffect(() => {
    const view = getSkillsSectionView(resumeData);
    setCategorizeSkills(view === 'view2');
  }, [resumeData]);

  const handleCategorizeToggle = (e) => {
    setCategorizeSkills(e.target.checked);
  };

  const getUpdatedTemplateStructure = () => {
    const currentTemplate = resumeData?.scaler_resume_template_structure;
    if (!currentTemplate) return null;

    // Get the first template key (e.g., 'fresher', 'nonTechTemplate', etc.)
    const templateKey = Object.keys(currentTemplate)[0];
    const template = currentTemplate[templateKey];

    // Create a deep copy and update the Skills section view
    const updatedTemplate = {
      ...template,
      sections: template.sections.map((section) => {
        if (section.name === 'Skills') {
          return {
            ...section,
            config: {
              ...section.config,
              view: categorizeSkills ? 'view2' : 'view1',
            },
          };
        }
        return section;
      }),
    };

    return {
      [templateKey]: updatedTemplate,
    };
  };

  const handleRemoveSkill = (skillId) => {
    const updatedSelectedSkills = selectedSkills.filter(
      (s) => s.skill_id !== skillId
    );
    dispatch(
      updateFormData({
        formId: FORM_ID,
        data: {
          selectedSkills: updatedSelectedSkills,
        },
      })
    );
  };

  const handleEditSkill = (skill) => {
    // Find the skill in skillsData or use the skill object directly
    const skillFromData = skillsData.find(
      (s) => s.subtopic_id === skill.skill_id
    );
    const skillToEdit = {
      ...(skillFromData || {
        subtopic_id: skill.skill_id,
        subtopic: skill.name,
      }),
      proficiency_period: skill.proficiency_period,
    };
    setPendingSkill(skillToEdit);
    setIsExperienceModalOpen(true);
  };

  const handleFinish = async () => {
    const updatedTemplateStructure = getUpdatedTemplateStructure();

    try {
      const payload = {
        form_stage: 'skills_details_form',
        skills: selectedSkills.map((skill) => {
          // Try to infer the category from the skill's presence in resumeBuilderSkills
          let category_type = null;
          if (resumeBuilderSkills) {
            if (resumeBuilderSkills.language?.includes(skill.skill_id)) {
              category_type = CATEGORY_TYPE_MAP.language;
            } else if (
              resumeBuilderSkills.framework?.includes(skill.skill_id)
            ) {
              category_type = CATEGORY_TYPE_MAP.framework;
            } else if (resumeBuilderSkills.tools?.includes(skill.skill_id)) {
              category_type = CATEGORY_TYPE_MAP.tools;
            }
          }
          return {
            ...skill,
            category_type,
          };
        }),
        mark_complete: markComplete,
        ...(updatedTemplateStructure && {
          scaler_resume_template_structure: updatedTemplateStructure,
        }),
      };

      const response = await updateResumeDetails({
        resumeId: resumeData?.resume_details?.id,
        payload,
      }).unwrap();

      // Update global resume data with the response OR optimistically
      if (response || !response) { // Always proceed if no error thrown
        let updatedResumeData;

        if (response) {
          updatedResumeData = { ...(response.data || response) };
        } else {
          // Optimistic update if response is empty
          console.warn('SkillsAndToolkit: Response null, performing optimistic update');
          updatedResumeData = {
            ...resumeData,
            skills: payload.skills
          };
        }

        // Fix: If we sent an empty list and backend didn't return the key, force it to []
        // Note: Payload uses 'skills' key constructed from selectedSkills
        if (selectedSkills.length === 0 && !updatedResumeData.skills) {
          updatedResumeData.skills = [];
        }

        dispatch(setResumeData(updatedResumeData));

        // Force update the form data with the new data from backend
        if (updatedResumeData?.skills) {
          const newSelectedSkills = updatedResumeData.skills.filter((skill) =>
            skillsData.some((data) => data.subtopic_id === skill.skill_id)
          );

          dispatch(
            updateFormData({
              formId: FORM_ID,
              data: {
                selectedSkills: newSelectedSkills,
              },
            })
          );
        }
      }

      message.success('Skills and toolkit updated successfully');
      return true;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      if (error?.data?.message) {
        message.error(`Failed to update skills: ${error.data.message}`);
      } else {
        message.error('Failed to update skills and toolkit');
      }
      return false;
    }
  };

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

  // eslint-disable-next-line no-unused-vars
  const handleTagClick = () => { };

  const handleSaveAndCompile = async () => {
    try {
      const success = await handleFinish();
      if (success) {
        onComplete?.(FORM_KEYS.skills, true);
      }
    } catch (e) {
      // handled
    }
  };

  const handleSaveAndNext = async () => {
    try {
      const success = await handleFinish();
      if (success) {
        onComplete?.(FORM_KEYS.skills);
      }
    } catch (e) {
      // handled
    }
  };

  return (
    <Space direction="vertical" size={24} className={styles.container}>
      <SectionFeedback feedbackData={skillsFeedback} />
      <SkillDemoVideoModal />
      <Flex align="center" gap={16}>
        <Checkbox checked={categorizeSkills} onChange={handleCategorizeToggle}>
          <Text>
            Group skills as <strong>Languages, Libraries, Tools.</strong>
          </Text>
        </Checkbox>
        <Tooltip title={SKILL_VIEW_TOOLTIPS.CATEGORIZE}>
          <InfoCircleOutlined style={{ color: '#8c8c8c', cursor: 'pointer' }} />
        </Tooltip>
      </Flex>
      {selectedSkills.length > 0 && (
        <SelectedSkillsPanel
          selectedSkills={selectedSkills}
          onRemove={handleRemoveSkill}
          onEdit={handleEditSkill}
        />
      )}
      <SuggestedSkillsPanel
        courseBasedSkills={courseBasedSkills}
        selectedSkillIds={selectedSkillIds}
        onSkillSelect={handleSkillSelect}
      />
      <SearchableSkillPicker
        skillsData={skillsData}
        selectedSkillIds={selectedSkillIds}
        onSkillSelect={handleSkillSelectFromSearch}
      />
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
          block
          onClick={handleSaveAndNext}
          disabled={isLoading}
        >
          Save and Next
        </Button>
      </Flex>
      <ExperienceModal
        open={isExperienceModalOpen}
        skill={pendingSkill}
        onCancel={handleExperienceModalCancel}
        onSubmit={handleExperienceModalSubmit}
      />
    </Space>
  );
};

export default SkillsAndToolkit;
