import { RESUME_BUILDER_STEPS } from './constants';

const ONBOARDING_COMPLETED_KEY = 'resume_builder_onboarding_completed';
const RESUME_TEMPLATES_VISITED_KEY = 'resume_builder_resume_templates_visited';
const RESUME_TEMPLATES_VISITED_NUDGE_COUNT = 3;

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-undef
    return window.localStorage;
  }
  return null;
};

/**
 * Checks if onboarding is completed for a specific resume
 * @param {string} resumeId - The ID of the resume
 * @returns {boolean} - Whether onboarding is completed
 */
export const isOnboardingCompleted = (resumeId) => {
  if (!resumeId) return false;
  const storage = getLocalStorage();
  if (!storage) return false;
  const completedResumes = JSON.parse(
    storage.getItem(ONBOARDING_COMPLETED_KEY) || '[]'
  );
  return completedResumes.includes(resumeId);
};

/**
 * Marks onboarding as completed for a specific resume
 * @param {string} resumeId - The ID of the resume
 */
export const markOnboardingCompleted = (resumeId) => {
  if (!resumeId) return;
  const storage = getLocalStorage();
  if (!storage) return;
  const completedResumes = JSON.parse(
    storage.getItem(ONBOARDING_COMPLETED_KEY) || '[]'
  );
  if (!completedResumes.includes(resumeId)) {
    completedResumes.push(resumeId);
    storage.setItem(ONBOARDING_COMPLETED_KEY, JSON.stringify(completedResumes));
  }
};

/**
 * Checks if the current step is the final onboarding step (RESUME_STEPS)
 * @param {string} currentStepKey - The key of the current step
 * @returns {boolean} - Whether the current step is the final onboarding step
 */
export const isFinalOnboardingStep = (currentStepKey) => {
  return currentStepKey === RESUME_BUILDER_STEPS.RESUME_STEPS.key;
};

/**
 * Determines if onboarding should be shown based on resume ID
 * @param {string} resumeId - The ID of the resume
 * @returns {boolean} - Whether onboarding should be shown
 */
export const shouldShowOnboarding = (resumeId) => {
  return !isOnboardingCompleted(resumeId);
};

/**
 * Checks if the resume templates have been visited
 * @returns {boolean} - Whether the resume templates have been visited
 */
export const areResumeTemplatesVisited = () => {
  const storage = getLocalStorage();
  if (!storage) return false;
  const visitedResumes = storage.getItem(RESUME_TEMPLATES_VISITED_KEY);
  return visitedResumes ? true : false;
};

/**
 * Marks the resume templates as visited
 */
export const markResumeTemplatesVisited = () => {
  const storage = getLocalStorage();
  if (!storage) return;
  const currentCount = parseInt(
    storage.getItem(RESUME_TEMPLATES_VISITED_KEY) || '0',
    10
  );
  if (currentCount <= RESUME_TEMPLATES_VISITED_NUDGE_COUNT) {
    storage.setItem(
      RESUME_TEMPLATES_VISITED_KEY,
      (currentCount + 1).toString()
    );
  }
};

/**
 * Checks if the resume templates nudge should be shown
 * @returns {boolean} - Whether the resume templates nudge should be shown
 */
export const shouldShowResumeTemplateNudge = () => {
  const storage = getLocalStorage();
  if (!storage) return false;
  const visitedResumes = parseInt(
    storage.getItem(RESUME_TEMPLATES_VISITED_KEY) || '0',
    10
  );
  return (
    visitedResumes > 1 && visitedResumes < RESUME_TEMPLATES_VISITED_NUDGE_COUNT
  );
};
