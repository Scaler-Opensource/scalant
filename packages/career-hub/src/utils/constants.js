// Career Hub Constants
// LLD: This file contains all constants, enums, and configuration values used across the Career Hub

// Navigation Tabs
// LLD: These tabs appear in the main navigation bar (Home, Jobs, My Resume, Preferences)
export const NAVIGATION_TABS = {
  HOME: 'home',
  JOBS: 'jobs',
  MY_RESUME: 'my-resume',
  PREFERENCES: 'preferences',
};

// Job List Tabs
// LLD: These are the filter tabs shown on the Jobs page (Unlocked, All, Saved, Applied)
export const JOB_LIST_TABS = {
  UNLOCKED: 'unlocked',
  ALL: 'all',
  SAVED: 'saved',
  APPLIED: 'applied',
  ELIGIBLE: 'eligible',
  RECOMMENDED: 'recommended',
  EXCEPTIONAL: 'exceptional',
  PIPELINE: 'pipeline',
};

// Route Paths
// LLD: These are the route paths for the Career Hub SPA
export const ROUTES = {
  HOME: '/home',
  JOBS: '/jobs',
  ALL_JOBS: '/jobs/all',
  RELEVANT_JOBS: '/jobs/relevant',
  SAVED_JOBS: '/jobs/saved',
  APPLIED_JOBS: '/jobs/applied',
  ELIGIBLE_JOBS: '/jobs/eligible',
  RECOMMENDED_JOBS: '/jobs/recommended',
  EXCEPTIONAL_JOBS: '/jobs/exceptional',
  MY_RESUME: '/my-resume',
  PREFERENCES: '/preferences',
};

// Job Eligibility Status
// LLD: These statuses determine how a job card is displayed and what actions are available
export const JOB_ELIGIBILITY_STATUS = {
  PERFECT_MATCH: 'perfect-match',      // Green badge, can apply immediately
  ELIGIBLE: 'eligible',                // Green badge, can apply
  PENDING_STEPS: 'pending-steps',      // Blue badge, shows "X steps pending"
  NOT_ELIGIBLE: 'not-eligible',        // Red badge, blocked from applying
  APPLIED: 'applied',                  // Green badge, already applied
};

// Job Alert Frequency
// LLD: Used in job alert creation modal
export const ALERT_FREQUENCY = {
  REALTIME: 'realtime',
  DAILY: 'daily',
  ALTERNATE_DAY: 'alternate-day',
  WEEKLY: 'weekly',
};

// Job Alert Modes
// LLD: How alerts are delivered to users
export const ALERT_MODE = {
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  BOTH: 'both',
};

// API Base Path
// LLD: Base path for all Career Hub API endpoints (from backend)
export const API_BASE_PATH = '/jobs/job-tracker';

// API Endpoints
// LLD: All API endpoints used by Career Hub components
export const API_ENDPOINTS = {
  // Job Listings
  ALL_JOBS: '/fetch-all-jobs/',
  RELEVANT_JOBS: '/relevancy/',
  ELIGIBLE_JOBS: '/fetch-eligible-jobs/',
  RECOMMENDED_JOBS: '/fetch-recommended-jobs/',
  EXCEPTIONAL_JOBS: '/fetch-exceptional-jobs/',
  DRAFT_JOBS: '/draft/',
  PIPELINE_JOBS: '/fetch-pipeline-jobs/',
  
  // Job Details
  JOB_PROFILE: '/job_profile/:jobId/',
  
  // Applications
  UPDATE_APPLICATION: '/update-application/',
  JOB_APPLICATION_FORM: '/v1/job-applications/',
  
  // Alerts
  CREATE_ALERT: '/alerts/',
  LIST_ALERTS: '/alerts/list',
  UPDATE_ALERT: '/alerts/:id',
  JOB_ALERTS: '/job-alerts/',
  
  // User & Resume
  USER_DATA: '/v1/user/',
  RESUME_DATA: '/v1/resume/',
  USER_RESUMES: '/api/v3/user-resumes/',
  RESUME_ELIGIBILITY: '/api/v3/user-resumes/eligibility',
  
  // Filters & Metadata
  FILTERS: '/filters/',
  PROCESS_COUNTS: '/fetch-process-counts/',
  
  // Workflow
  WORKFLOW_PROGRESS: '/api/v3/careers-hub/eligibility/progress/',
};

// Pagination
// LLD: Default pagination settings for job lists
export const PAGINATION = {
  PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
};

// Workflow Step Status
// LLD: Status of individual workflow steps in the eligibility checklist
export const WORKFLOW_STEP_STATUS = {
  COMPLETE: 'complete',
  PENDING: 'pending',
  LOCKED: 'locked',
};

// Job Card Actions
// LLD: Available actions on a job card
export const JOB_CARD_ACTIONS = {
  SAVE: 'save',
  UNSAVE: 'unsave',
  APPLY: 'apply',
  VIEW_DETAILS: 'view-details',
};

// Eligibility Banner Types
// LLD: Different types of eligibility banners shown on job detail pages
export const ELIGIBILITY_BANNER_TYPES = {
  ELIGIBLE: 'eligible',                    // Green - can apply
  PENDING_STEPS: 'pending-steps',          // Blue - complete steps to apply
  NOT_ELIGIBLE: 'not-eligible',            // Red/Orange - blocked
  EXEMPTION: 'exemption',                  // Green - exempted from requirements
  SCREENING_CALL: 'screening-call',        // Blue - complete screening call
  RESOURCES: 'resources',                  // Blue - explore interview resources
  JOB_CLOSED: 'job-closed',                // Red - job opening closed
};

// Default Redirect Path
// LLD: Default route to redirect to on Career Hub mount
export const DEFAULT_REDIRECT_PATH = '/home';

// Valid Tabs (for route validation)
// LLD: Valid tab values for the /:tab route
export const VALID_TABS = [
  NAVIGATION_TABS.HOME,
  JOB_LIST_TABS.ALL,
  JOB_LIST_TABS.RELEVANT,
  JOB_LIST_TABS.SAVED,
  JOB_LIST_TABS.APPLIED,
];

// Current Designation Options
// LLD: Options for Current Designation dropdown (from API response or defaults)
export const DESIGNATION_OPTIONS = [
  { label: 'Fresher', value: 'Fresher' },
  { label: 'Non-tech', value: 'Non-tech' },
  { label: 'Tech adjacent', value: 'Tech adjacent' },
  { label: 'DevOps', value: 'DevOps' },
  { label: 'Cloud computing', value: 'Cloud computing' },
];

// Current Intent Options
// LLD: Options for Current Intent dropdown
export const INTENT_OPTIONS = [
  { label: 'Looking for a job', value: 'Looking for a job' },
  { label: 'Need time to prepare', value: 'Need time to prepare' },
  { label: 'Not looking for a job', value: 'Not looking for a job' },
  { label: 'Already secured a job', value: 'Already secured a job' },
];

// Workflow API Endpoint
// LLD: API endpoint for eligibility progress/workflow data
export const WORKFLOW_API_ENDPOINT = '/api/v3/careers-hub/eligibility/progress/';

// Workflow Definition Keys
// LLD: Keys for different workflow definition types
export const WORKFLOW_DEFINITION_KEYS = {
  CERTIFICATION_EXPLANATION: 'workflow_def_mbe_certification_explanation',
  CONTEST: 'workflow_def_mbe_contest',
  EXPERT_MOCK_INTERVIEW: 'workflow_def_mbe_expert_mock_interview',
  RESUME_EXPLANATION: 'workflow_def_mbe_resume_explanation_1',
  CREATE_RESUME: 'workflow_def_create_resume',
  JOB_READINESS_EXPLANATION: 'workflow_def_job_readiness_explanation',
  JOB_READINESS_CODING_TEST_1: 'workflow_def_job_readiness_coding_test_1',
  JOB_READINESS_CODING_TEST_2: 'workflow_def_job_readiness_coding_test_2',
  JOB_READINESS_RESUME_INTERVIEW: 'workflow_def_job_readiness_resume_interview',
};

