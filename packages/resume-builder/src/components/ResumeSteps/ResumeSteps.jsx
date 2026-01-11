import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Timeline, Spin, message, Tour } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import ResumeStepCard from '../ResumeStepCard';
import styles from './ResumeSteps.module.scss';
import { getAllIncompleteForms, getFormSteps } from '../../utils/resumeSteps';
import {
  setIncompleteForms,
  setCurrentIncompleteForm,
  setCompleted,
} from '../../store/resumeFormsSlice';
import { useBasicQuestionsForm } from '../../hooks/useBasicQuestionsForm';
import ResumeProfileCard from '../ResumeProfileCard';
import ResumeReviewOverallSummary from '../ResumeReviewOverallSummary';
import { FORM_KEYS, PARSING_STATUS } from '../../utils/constants';

const ResumeTimeline = ({
  onAiSuggestionClick,
  onFormCompletion,
  onAllFormsComplete,
  enableResumeParsing,
}) => {
  const dispatch = useDispatch();
  const program = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.program
  );
  const [expandedStep, setExpandedStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const resumeData = useSelector(
    (state) => state.scalantResumeBuilder.resumeBuilder.resumeData
  );
  const incompleteForms = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms.incompleteForms
  );
  const currentIncompleteForm = useSelector(
    (state) => state.scalantResumeBuilder.resumeForms.currentIncompleteForm
  );
  const stepRefs = useRef({});
  const [mounted, setMounted] = useState(false);
  const [tourDismissed, setTourDismissed] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const previousResumeIdRef = useRef();
  const resumePersonaData = useSelector(
    (state) => state.scalantResumeBuilder.formStore.forms.basicQuestions
  );
  const reviewData = useSelector(
    (state) => state.scalantResumeBuilder.resumeReview.reviewData
  );
  const parseStatus = useSelector(
    (state) => state.scalantResumeBuilder.resumeParsing.status
  );
  const isReviewLoading = useSelector(
    (state) => state.scalantResumeBuilder.resumeReview.isLoading
  );

  // Initialize form values when resumeData is loaded
  useBasicQuestionsForm(resumeData?.personal_details);

  // Recalculate incomplete forms only when resume ID changes or on initial load
  // This prevents clearing form data when resumeData updates after a save
  useEffect(() => {
    const resumeId = resumeData?.resume_details?.id;

    if (parseStatus === PARSING_STATUS.SUCCESS) {
      // parsing succeeded; mark all steps as incomplete and prepare the flow
      dispatch(setIncompleteForms(Object.values(FORM_KEYS)));
      dispatch(setCurrentIncompleteForm(FORM_KEYS.personal_details));
      setExpandedStep(null);
      setTourDismissed(false);
      previousResumeIdRef.current = resumeId;
    } else if (resumeData) {
      // Only recalculate steps when resume ID changes (different resume)
      // or on initial load (previousResumeIdRef.current is undefined)
      const resumeChanged =
        previousResumeIdRef.current === undefined ||
        previousResumeIdRef.current !== resumeId;

      const newIncompleteForms = getAllIncompleteForms(resumeData);

      if (resumeChanged) {
        setSteps([]);
        batch(() => {
          dispatch(setIncompleteForms(newIncompleteForms));
          if (newIncompleteForms.length > 0) {
            dispatch(setCurrentIncompleteForm(newIncompleteForms[0]));
            setExpandedStep(newIncompleteForms[0]);
          } else {
            setExpandedStep(null);
          }
        });
        previousResumeIdRef.current = resumeId;
      } else {
        // For existing resume, just sync the incomplete list based on actual data
        // This ensures the progress reflects the actual data state without resetting the UI flow
        dispatch(setIncompleteForms(newIncompleteForms));
      }
    }
  }, [resumeData, dispatch, parseStatus]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && expandedStep !== null && stepRefs.current[expandedStep]) {
      const element = stepRefs.current[expandedStep];
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [expandedStep, mounted]);

  // Control opening of Tour after refs are populated and DOM is ready
  useEffect(() => {
    const hasParsed = parseStatus === PARSING_STATUS.SUCCESS;
    if (tourDismissed || expandedStep !== null || !hasParsed) {
      if (tourOpen) setTourOpen(false);
      return;
    }
    const firstKey = steps?.[0]?.key;
    // wait a tick so ref callbacks run and DOM nodes are attached
    const id = globalThis.requestAnimationFrame(() => {
      const el = firstKey ? stepRefs.current[firstKey] : null;
      setTourOpen(Boolean(el));
    });
    return () => globalThis.cancelAnimationFrame(id);
  }, [steps, expandedStep, tourDismissed, parseStatus, tourOpen]);

  const handleStepClick = useCallback(
    (key) => {
      // Dismiss the tour when user interacts with a step
      if (!tourDismissed) setTourDismissed(true);

      setExpandedStep((prev) => (prev === key ? null : key));
      if (incompleteForms.includes(key)) {
        dispatch(setCurrentIncompleteForm(key));
      }
    },
    [dispatch, incompleteForms, tourDismissed]
  );

  const handleFormCompletion = useCallback(
    (formType, skipNextStep = false) => {
      // Use thunk to access the absolute latest state (updated by the child form)
      // This prevents stale closures from overwriting the store or acting on old data
      dispatch((dispatch, getState) => {
        const state = getState();
        const currentIncompleteForms =
          state.scalantResumeBuilder.resumeForms.incompleteForms;
        const latestCurrentIncompleteForm =
          state.scalantResumeBuilder.resumeForms.currentIncompleteForm;

        // Navigation Logic
        if (!skipNextStep && currentIncompleteForms.length > 0) {
          // If we are currently completing the form that is marked as "current",
          // move to the next one in the updated list
          if (expandedStep === latestCurrentIncompleteForm) {
            const nextForm = currentIncompleteForms[0];
            dispatch(setCurrentIncompleteForm(nextForm));
            setExpandedStep(nextForm);
          } else {
            // If we finished a form that wasn't the "current" one (e.g. jumped ahead),
            // just stick to the current plan or stay where we are?
            // Actually, the new list `currentIncompleteForms` already has the finished one removed.
            // So `currentIncompleteForms[0]` is indeed the next thing to do.
            const nextForm = currentIncompleteForms[0];
            dispatch(setCurrentIncompleteForm(nextForm));
            setExpandedStep(nextForm);
          }
        } else if (!skipNextStep) {
          setExpandedStep(null);
        }

        onFormCompletion?.(formType);

        if (currentIncompleteForms.length === 0) {
          onAllFormsComplete?.();
        }

        if (
          currentIncompleteForms.length === 0 &&
          resumeData.application_stage !== 4
        ) {
          // if the form is complete and the application stage is not 4,
          // then reload the page as the status will be updated to active after reload
          dispatch(setCompleted(true));
          message.success(
            'Resume completed successfully. Redirecting to career hub...'
          );
          // eslint-disable-next-line no-undef
          setTimeout(() => {
            // eslint-disable-next-line no-undef
            window.location.reload();
          }, 5000); // 5 seconds delay to ensure the status is updated
        }
      });
    },
    [
      expandedStep,
      onFormCompletion,
      resumeData?.application_stage,
      dispatch,
      onAllFormsComplete,
    ]
  );

  useEffect(() => {
    if (resumePersonaData) {
      const formSteps = getFormSteps(
        resumePersonaData,
        incompleteForms,
        handleFormCompletion,
        program,
        reviewData,
        isReviewLoading,
        onAiSuggestionClick,
        enableResumeParsing
      );
      setSteps(formSteps);
    }
  }, [
    resumePersonaData,
    incompleteForms,
    handleFormCompletion,
    program,
    reviewData,
    isReviewLoading,
    onAiSuggestionClick,
    enableResumeParsing,
  ]);

  return (
    <div className={styles.container}>
      <Tour
        key={steps?.[0]?.key || 'tour'}
        open={tourOpen}
        onClose={() => setTourDismissed(true)}
        steps={[
          {
            title: 'Data from your resume has been successfully added',
            description:
              'Open the section and click on save once you validate the data',
            target: () => {
              const firstKey = steps?.[0]?.key;
              return firstKey ? stepRefs.current[firstKey] : null;
            },
          },
        ]}
      />
      <ResumeReviewOverallSummary
        reviewData={reviewData}
        isReviewLoading={isReviewLoading}
      />
      <ResumeProfileCard
        className={styles.profileCard}
        resumePersonaData={resumePersonaData}
      />
      {steps && steps.length > 0 ? (
        <Timeline
          mode="left"
          pending={false}
          items={[
            ...steps.map((step) => {
              let dotIcon;
              if (step.key === expandedStep) {
                dotIcon = <LoadingOutlined className={styles.activeIcon} />;
              } else if (step.status === 'complete') {
                dotIcon = (
                  <CheckCircleOutlined className={styles.completeIcon} />
                );
              } else {
                dotIcon = (
                  <ClockCircleOutlined className={styles.incompleteIcon} />
                );
              }

              return {
                dot: dotIcon,
                children: (
                  <div ref={(el) => (stepRefs.current[step.key] = el)}>
                    <ResumeStepCard
                      key={step.key}
                      title={step.title}
                      subtitle={step.subtitle}
                      icon={step.icon}
                      status={step.status}
                      reviewStatus={step.reviewStatus}
                      isActive={step.key === expandedStep}
                      expanded={step.key === expandedStep}
                      onClick={() => handleStepClick(step.key)}
                      required={step.required}
                    >
                      {step.component}
                    </ResumeStepCard>
                  </div>
                ),
              };
            }),
          ]}
        />
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default ResumeTimeline;
