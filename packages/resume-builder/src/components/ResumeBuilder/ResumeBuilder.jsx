import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentStep,
  setResumeData,
  setProgram,
  resetSteps,
} from '../../store/resumeBuilderSlice';
import { setReviewData, setIsLoading } from '../../store/resumeReviewSlice';
import { resetAllForms } from '../../store/formStoreSlice';
import { getResumeProgram } from '../../utils/resumeUtils';
import { LoadingOutlined } from '@ant-design/icons';

import {
  RESUME_BUILDER_STEPS,
  PREFERENCE_SETTINGS_IMAGE,
} from '../../utils/constants';
import {
  shouldShowOnboarding,
  markOnboardingCompleted,
  isFinalOnboardingStep,
} from '../../utils/onboardingUtils';
import ResumeLayout from '../../layout/ResumeLayout';
import Acknowledgement from '../Acknowledgement';
import PreferenceSettings from '../PreferenceSettings';
import ResumeBasicQuestions from '../ResumeBasicQuestions';
import ResumeTips from '../ResumeTips';
import ResumeSteps from '../ResumeSteps';
import ResumePreview from '../ResumePreview';
import IntroVideo from '../IntroVideo';
import SampleResumePreview from '../SampleResumePreview';
import ResumeHighlightPreview from '../ResumeHighlightPreview';
import styles from './ResumeBuilder.module.scss';

const ResumeBuilderContent = ({
  isOnboarding = true,
  resumeData,
  onBackButtonClick,
  resumeList,
  onResumeClick,
  onAddResumeClick,
  onManageResumesClick,
  onEditClick,
  onDeleteClick,
  onAiSuggestionClick,
  resumeTemplateConfig,
  courseProduct,
  isLoading = false,
  onDownloadClick,
  enableResumeReview = false,
  onReviewResumeClick,
  onResumeBuilderPageView,
  onFormCompletion,
  onAllFormsComplete,
}) => {
  const dispatch = useDispatch();
  const { currentStep, steps } = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder
  );
  const visitedStepsRef = useRef(new Set());
  const initialStepSetRef = useRef(false);

  useEffect(() => {
    if (resumeData) {
      const resumeId = resumeData?.resume_details?.id;

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

      const shouldShow = isOnboarding ? shouldShowOnboarding(resumeId) : false;
      if (!shouldShow) {
        const resumeStepsIndex = steps.findIndex(
          (step) => step.key === RESUME_BUILDER_STEPS.RESUME_STEPS.key
        );
        dispatch(setCurrentStep(resumeStepsIndex));
      }
    }
  }, [resumeData, dispatch, steps, isOnboarding, courseProduct]);

  useEffect(() => {
    const currentStepData = steps[currentStep];
    if (isFinalOnboardingStep(currentStepData.key)) {
      const resumeId = resumeData?.resume_details?.id;
      if (resumeId) {
        markOnboardingCompleted(resumeId);
      }
    }
  }, [currentStep, steps, resumeData]);

  // Track step changes and call onResumeBuilderPageView with step name
  useEffect(() => {
    if (steps.length > 0 && currentStep >= 0) {
      const currentStepData = steps[currentStep];
      const stepKey = currentStepData?.key;

      // Mark that we've processed the initial step setup
      if (!initialStepSetRef.current) {
        initialStepSetRef.current = true;

        // Only trigger callback for initial step if onboarding should be shown
        const resumeId = resumeData?.resume_details?.id;
        const shouldShow = isOnboarding
          ? shouldShowOnboarding(resumeId)
          : false;

        if (shouldShow && stepKey) {
          visitedStepsRef.current.add(stepKey);
          onResumeBuilderPageView?.(stepKey);
        }
        return; // Don't trigger callback for non-onboarding initial setup
      }

      // Only trigger callback for actual step changes after initial setup
      if (stepKey && !visitedStepsRef.current.has(stepKey)) {
        visitedStepsRef.current.add(stepKey);
        onResumeBuilderPageView?.(stepKey);
      }
    }
  }, [
    currentStep,
    steps,
    onResumeBuilderPageView,
    resumeData?.resume_details?.id,
    isOnboarding,
  ]);

  useEffect(() => {
    return () => {
      dispatch(resetSteps());
      dispatch(resetAllForms());
    };
  }, [dispatch]);

  const renderComponent = () => {
    const currentStepData = steps[currentStep];
    switch (currentStepData.component) {
      case RESUME_BUILDER_STEPS.ACKNOWLEDGEMENT.component:
        return <Acknowledgement />;
      case RESUME_BUILDER_STEPS.PREFERENCE_SETTINGS.component:
        return <PreferenceSettings />;
      case RESUME_BUILDER_STEPS.RESUME_BASIC_QUESTIONS.component:
        return <ResumeBasicQuestions />;
      case RESUME_BUILDER_STEPS.RESUME_TIPS.component:
        return <ResumeTips />;
      case RESUME_BUILDER_STEPS.RESUME_STEPS.component:
        return (
          <ResumeSteps
            onAiSuggestionClick={onAiSuggestionClick}
            onFormCompletion={onFormCompletion}
            onAllFormsComplete={onAllFormsComplete}
          />
        );
      default:
        return null;
    }
  };

  const previewUi = () => {
    const currentStepData = steps[currentStep];
    switch (currentStepData.component) {
      case RESUME_BUILDER_STEPS.ACKNOWLEDGEMENT.component:
        return <IntroVideo />;
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
      case RESUME_BUILDER_STEPS.RESUME_TIPS.component:
        return <SampleResumePreview />;

      case RESUME_BUILDER_STEPS.RESUME_STEPS.component:
        return (
          <ResumePreview
            resumeList={resumeList}
            onResumeClick={onResumeClick}
            onAddResumeClick={onAddResumeClick}
            onManageResumesClick={onManageResumesClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onDownloadClick={onDownloadClick}
            resumeTemplateConfig={resumeTemplateConfig}
          />
        );
      default:
        return null;
    }
  };

  if (!resumeData || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingOutlined className={styles.loadingIcon} size="large" />
        <h1>Loading your resume data...</h1>
      </div>
    );
  }

  return (
    <ResumeLayout
      onBackButtonClick={onBackButtonClick}
      preview={previewUi()}
      enableResumeReview={enableResumeReview}
      onReviewResumeClick={onReviewResumeClick}
    >
      {renderComponent()}
    </ResumeLayout>
  );
};

const ResumeBuilder = ({
  isOnboarding = true,
  resumeData,
  onBackButtonClick,
  resumeManager,
  resumeList,
  onResumeClick,
  onAddResumeClick,
  onManageResumesClick,
  onEditClick,
  onDeleteClick,
  isLoading = false,
  courseProduct,
  onAiSuggestionClick,
  resumeTemplateConfig,
  onDownloadClick,
  onResumeBuilderPageView,
  enableResumeReview = true,
  onReviewResumeClick,
  onFormCompletion,
  onAllFormsComplete,
}) => {
  return (
    <ResumeBuilderContent
      isOnboarding={isOnboarding}
      resumeData={resumeData}
      onBackButtonClick={onBackButtonClick}
      resumeManager={resumeManager}
      resumeList={resumeList}
      onResumeClick={onResumeClick}
      onAddResumeClick={onAddResumeClick}
      onManageResumesClick={onManageResumesClick}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      isLoading={isLoading}
      onAiSuggestionClick={onAiSuggestionClick}
      courseProduct={courseProduct}
      resumeTemplateConfig={resumeTemplateConfig}
      onDownloadClick={onDownloadClick}
      enableResumeReview={enableResumeReview}
      onReviewResumeClick={onReviewResumeClick}
      onResumeBuilderPageView={onResumeBuilderPageView}
      onFormCompletion={onFormCompletion}
      onAllFormsComplete={onAllFormsComplete}
    />
  );
};

export default ResumeBuilder;
