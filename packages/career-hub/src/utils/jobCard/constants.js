/**
 * Job Card Constants
 * Reference: frontend/src/modules/job_tracker/utils/list.js (lines 25-74)
 */

/**
 * Job card configuration per tab
 * Determines which details to show/hide in job cards
 */
export const JOB_CARD_CONFIG = {
  home: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false
  },
  all: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false
  },
  eligible: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false
  },
  saved: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false
  },
  applications: {
    isExperienceCtcAvailable: false,
    isNoticePeriodAvailable: false,
    isAppliedDateAvailable: true,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: true
  },
  archived: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: true,
    isApplicationStatusAvailable: false
  }
};

/**
 * Application status constants
 * Reference: frontend/src/modules/job_tracker/utils/constants.js
 */
export const APPLICATION_STATUS = {
  NOT_APPLIED: 'Not Applied',
  SAVED: 'Saved',
  APPLIED: 'Applied',
  IN_PIPELINE: 'In Pipeline',
  ARCHIVED: 'Archived'
};

/**
 * Job profile status constants
 */
export const JOB_PROFILE_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  INACTIVE: 'inactive'
};

/**
 * Tab constants
 */
export const TABS = {
  HOME: 'home',
  ALL: 'all',
  ELIGIBLE: 'eligible',
  SAVED: 'saved',
  APPLICATIONS: 'applications',
  ARCHIVED: 'archived'
};

/**
 * Icon name constants for eligibility tags
 */
export const ELIGIBILITY_ICONS = {
  CHECK_CIRCLE_OUTLINED: 'CheckCircleOutlined',
  CHECK_CIRCLE_TWO_TONE: 'CheckCircleTwoTone',
  CLOSE_CIRCLE_OUTLINED: 'CloseCircleOutlined',
  CLOCK_CIRCLE_OUTLINED: 'ClockCircleOutlined',
  ROCKET_TWO_TONE: 'RocketTwoTone',
  UNLOCK_TWO_TONE: 'UnlockTwoTone'
};

/**
 * Eligibility tag type constants
 */
export const ELIGIBILITY_TAG_TYPES = {
  QUICK_APPLY: 'quick_apply',
  ELIGIBLE: 'eligible',
  STEPS_TO_APPLY: 'steps_to_apply',
  INELIGIBLE: 'ineligible',
  NOTICE_PERIOD_MISMATCH: 'notice_period_mismatch',
  EXPIRED: 'expired'
};

