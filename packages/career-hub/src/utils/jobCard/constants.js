/**
 * Job Card Constants
 * Reference: frontend/src/modules/job_tracker/utils/list.js (lines 25-74)
 */

import { convertArraySingletonsToObject } from '../form';

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
    isApplicationStatusAvailable: false,
  },
  all: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false,
  },
  eligible: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false,
  },
  saved: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: false,
  },
  applications: {
    isExperienceCtcAvailable: false,
    isNoticePeriodAvailable: false,
    isAppliedDateAvailable: true,
    isArchivedStatusAvailable: false,
    isApplicationStatusAvailable: true,
  },
  archived: {
    isExperienceCtcAvailable: true,
    isNoticePeriodAvailable: true,
    isAppliedDateAvailable: false,
    isArchivedStatusAvailable: true,
    isApplicationStatusAvailable: false,
  },
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
  ARCHIVED: 'Archived',
};

/**
 * Job profile status constants
 */
export const JOB_PROFILE_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  INACTIVE: 'inactive',
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
  ARCHIVED: 'archived',
};

export const WITHDRAW_REASONS = convertArraySingletonsToObject([
  'Got another offer',
  "Company didn't match expectations",
  'Need more prep time',
  'Applied by mistake',
  'Other',
]);
