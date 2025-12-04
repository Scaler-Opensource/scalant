/**
 * Job Card Eligibility Tag Utilities
 * Reference: frontend/src/modules/job_tracker/utils/eligibility_tags.js
 */

/**
 * Determines the eligibility tag to display for a job
 * Reference: frontend/src/modules/job_tracker/utils/eligibility_tags.js (lines 64-165)
 * 
 * @param {Object} jobData - Job data object
 * @param {Object} eligibilityCriteria - Eligibility criteria with reasons
 * @returns {Object} Tag data with text, icon, color, etc.
 */
export const determineJobTag = (jobData, eligibilityCriteria) => {
  const { isRelevant, expiry, jobProfileStatus } = jobData;
  const { isEligible, reasons = [] } = eligibilityCriteria || {};

  // Priority 1: Expired (highest priority)
  const isExpired = expiry && (
    new Date(expiry) < new Date() || 
    jobProfileStatus !== 'active'
  );
  
  if (isExpired) {
    return {
      tag: 'expired',
      text: 'Job Expired',
      icon: 'ClockCircleOutlined',
      color: '#5a2780',
      antdColor: 'default' // Will be styled with custom color
    };
  }

  // Create reasons map for easy lookup
  const reasonsMap = reasons.reduce((acc, reason) => {
    acc[reason.label] = reason;
    return acc;
  }, {});

  const experienceReason = reasonsMap.experience;
  const noticePeriodReason = reasonsMap.notice_period;
  const skillsReason = reasonsMap.skills;
  const techStacksReason = reasonsMap.tech_stacks;

  // Priority 2: Experience Ineligible
  if (experienceReason && !experienceReason.isEligible) {
    return {
      tag: 'ineligible',
      text: 'Ineligible',
      icon: 'CloseCircleOutlined',
      color: '#a42137',
      antdColor: 'error'
    };
  }

  // Priority 3: Notice Period Mismatch
  if (noticePeriodReason && !noticePeriodReason.isEligible) {
    const allOtherMet = checkAllOtherRequirementsMet(reasonsMap, 'notice_period');
    
    if (allOtherMet) {
      return {
        tag: 'notice_period_mismatch',
        text: 'Notice Period Mismatch',
        icon: 'CloseCircleOutlined',
        color: '#a42137',
        antdColor: 'error'
      };
    }
  }

  // Priority 4: Steps To Apply
  const pendingSteps = countPendingSteps(skillsReason, techStacksReason);
  
  if (pendingSteps > 0) {
    const allOtherMet = checkAllOtherRequirementsMet(reasonsMap, 'skills');
    
    if (allOtherMet) {
      return {
        tag: 'steps_to_apply',
        text: `${pendingSteps} ${pendingSteps === 1 ? 'step' : 'steps'} pending`,
        icon: 'RocketOutlined',
        color: '#20a164',
        antdColor: 'success',
        count: pendingSteps
      };
    }
  }

  // Priority 5: Quick Apply
  if (isEligible && isRelevant) {
    return {
      tag: 'quick_apply',
      text: 'Quick Apply',
      icon: 'CheckCircleOutlined',
      color: '#20a164',
      antdColor: 'success'
    };
  }

  // Priority 6: Eligible
  if (isEligible) {
    return {
      tag: 'eligible',
      text: 'Eligible',
      icon: 'CheckCircleOutlined',
      color: '#20a164',
      antdColor: 'success'
    };
  }

  // Fallback: Ineligible
  return {
    tag: 'ineligible',
    text: 'Ineligible',
    icon: 'CloseCircleOutlined',
    color: '#a42137',
    antdColor: 'error'
  };
};

/**
 * Count pending steps (mocks + contests + tech stacks)
 * Reference: frontend/src/modules/job_tracker/utils/eligibility_tags.js (lines 20-39)
 * 
 * @param {Object} skillsReason - Skills reason data
 * @param {Object} techStacksReason - Tech stacks reason data
 * @returns {number} Count of pending steps
 */
export const countPendingSteps = (skillsReason, techStacksReason) => {
  let count = 0;

  // Count skills (mocks + contests)
  if (skillsReason?.data) {
    Object.values(skillsReason.data).forEach((skill) => {
      if (skill.contests && skill.contests.cleared === false) {
        count += 1;
      }
      if (skill.skills && skill.skills.cleared === false) {
        count += 1;
      }
    });
  }

  // Count tech stacks
  if (techStacksReason?.data) {
    Object.values(techStacksReason.data).forEach((techStack) => {
      if (techStack.data && techStack.data.cleared === false) {
        count += 1;
      }
    });
  }

  return count;
};

/**
 * Check if all other requirements are met (excluding specific reason)
 * Reference: frontend/src/modules/job_tracker/utils/eligibility_tags.js (lines 47-56)
 * 
 * @param {Object} reasonsMap - Map of reasons
 * @param {string} excludeReason - Reason to exclude from check
 * @returns {boolean} True if all other requirements met
 */
export const checkAllOtherRequirementsMet = (reasonsMap, excludeReason) => {
  const criticalRequirements = ['experience', 'notice_period'];
  
  return criticalRequirements.every((requirement) => {
    if (requirement === excludeReason) return true;
    
    const reason = reasonsMap[requirement];
    return !reason || reason.isEligible;
  });
};
