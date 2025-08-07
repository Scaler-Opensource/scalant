import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setResumeData,
  setProgram,
  resetSteps,
  setCurrentStep,
} from '../../store/resumeBuilderSlice';
import { setReviewData, setIsLoading } from '../../store/resumeReviewSlice';
import { resetAllForms } from '../../store/formStoreSlice';
import { getResumeProgram } from '../../utils/resumeUtils';
import { LoadingOutlined } from '@ant-design/icons';

import {
  RESUME_BUILDER_STEPS,
  PREFERENCE_SETTINGS_IMAGE,
} from '../../utils/constants';
import ResumeLayout from '../../layout/ResumeLayout';
import PreferenceSettings from '../PreferenceSettings';
import ResumeBasicQuestions from '../ResumeBasicQuestions';
import ResumeHighlightPreview from '../ResumeHighlightPreview';
import styles from './PreferenceForm.module.scss';

const PreferenceForm = ({
  resumeData,
  onBackButtonClick,
  courseProduct,
  isLoading = false,
}) => {
  const dispatch = useDispatch();
  const { currentStep, steps } = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder
  );

  const renderComponent = () => {
    const currentStepData = steps[currentStep];
    switch (currentStepData.component) {
      case RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS.component:
        return <PreferenceSettings />;
      case RESUME_BUILDER_STEPS.RESUME_BASIC_QUESTIONS.component:
        return <ResumeBasicQuestions />;
      default:
        return null;
    }
  };

  const previewUi = () => {
    const currentStepData = steps[currentStep];
    switch (currentStepData.component) {
      case RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS.component:
        return (
          <img
            src={PREFERENCE_SETTINGS_IMAGE}
            className={styles.previewImage}
            alt="preference-settings"
          />
        );
      case RESUME_BUILDER_STEPS.RESUME_BASIC_QUESTIONS.component:
        return <ResumeHighlightPreview />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (resumeData) {
      const resumeEvaluationDetails = resumeData?.resume_evaluation_details;

      dispatch(setResumeData(resumeData));
      dispatch(setProgram(getResumeProgram(courseProduct)));
      dispatch(resetSteps());
      dispatch(resetAllForms());
      dispatch(setReviewData(resumeEvaluationDetails));

      if (resumeEvaluationDetails?.evaluation_state === 'ongoing') {
        dispatch(setIsLoading(true));
      } else {
        dispatch(setIsLoading(false));
      }

      const resumeStepsIndex = steps.findIndex(
        (step) => step.key === RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS.key
      );
      dispatch(setCurrentStep(resumeStepsIndex));
    }
  }, [resumeData, dispatch, courseProduct, steps]);

  useEffect(() => {
    const lastStepIndex = steps.findIndex(
      (step) => step.key === RESUME_BUILDER_STEPS.RESUME_BASIC_QUESTIONS.key
    );

    if (lastStepIndex < currentStep) {
      onBackButtonClick();
    }
  }, [steps, dispatch, currentStep, onBackButtonClick]);

  if (!resumeData || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingOutlined className={styles.loadingIcon} size="large" />
        <h1>Loading your preferences...</h1>
      </div>
    );
  }

  return (
    <ResumeLayout onBackButtonClick={onBackButtonClick} preview={previewUi()}>
      {renderComponent()}
    </ResumeLayout>
  );
};

export default PreferenceForm;
