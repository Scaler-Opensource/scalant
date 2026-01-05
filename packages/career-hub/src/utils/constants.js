import {
  UnlockOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  RiseOutlined,
} from '@ant-design/icons';

export const APPLICATION_STATUS = {
  APPLICATION_FORM: 'application_form',
  RESUME_FITMENT_CHECK: 'resume_fitment_check',
  RESUME_CHOICE_SELECT: 'resume_choice_select',
  SAVED: 'Saved',
  WITHDRAWN: 'Application Withdrawn',
  SUCCESSFULLY_APPLIED: 'successfully_applied',
};

export const SIDER_WIDTH = {
  PROFILE_DETAILS: '25%',
  JOB_DETAILS: '60%',
};

export const JOB_FILTER_TAGS = {
  relevant: {
    label: 'Preferred Jobs',
    icon: UnlockOutlined,
  },
  all: {
    label: 'All Jobs',
    icon: RiseOutlined,
  },
  saved: {
    label: 'Saved',
    icon: DownloadOutlined,
  },
  applied: {
    label: 'Applied',
    icon: CheckCircleOutlined,
  },
};

export const TAG_TO_TAB_MAPPING = {
  relevant: 'relevant',
  all: 'all',
  saved: 'saved',
  applied: 'applications',
};

export const COUNT_TO_TAB_MAPPING = {
  relevant: 'relevant',
  all: 'all',
  saved: 'saved',
  applied: 'applications',
};

export const SORTING_OPTIONS = {
  eligibility: {
    label: 'Eligibility',
    value: 'eligibility',
    mapping: { property: 'eligibility', direction: 'DESC' },
  },
  popularity: {
    label: 'Popularity',
    value: 'popularity',
    mapping: { property: 'popularity', direction: 'DESC' },
  },
  leastApplied: {
    label: 'Least Applied',
    value: 'leastApplied',
    mapping: { property: 'popularity', direction: 'ASC' },
  },
  mostRecent: {
    label: 'Most Recent',
    value: 'mostRecent',
    mapping: { property: 'date_posted_on', direction: 'DESC' },
  },
};

export const JOB_BODY_TABS = {
  ABOUT_ROLE: {
    key: 'about-role',
    label: 'About Role',
  },
  REQUIREMENTS: {
    key: 'requirements',
    label: 'Requirements',
  },
  APPLICATION_TIMELINE: {
    key: 'application-timeline',
    label: 'Application Timeline',
  },
};

export const ALERT_FREQUENCY = {
  REALTIME: 0,
  DAILY: 1,
  ALTERNATE_DAY: 2,
  WEEKLY: 7,
};

export const ALERT_FREQUENCY_LABELS = {
  [ALERT_FREQUENCY.REALTIME]: 'Realtime',
  [ALERT_FREQUENCY.DAILY]: 'Daily',
  [ALERT_FREQUENCY.ALTERNATE_DAY]: 'Every alternate day',
  [ALERT_FREQUENCY.WEEKLY]: 'Weekly',
};

export const ALERT_NOTIFICATION_TYPE = {
  EMAIL: 'email',
  WHATSAPP: 'whatsapp',
  BOTH: 'both',
};

export const ALERT_NOTIFICATION_LABELS = {
  [ALERT_NOTIFICATION_TYPE.EMAIL]: 'On Email',
  [ALERT_NOTIFICATION_TYPE.WHATSAPP]: 'On Whatsapp',
  [ALERT_NOTIFICATION_TYPE.BOTH]: 'On Email & Whatsapp',
};

export const ALERT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const DEFAULT_PROCESS_COUNTS = {
  all: 0,
  relevant: 0,
  draft: 0,
  applications: 0,
  saved: 0,
  archived: 0,
};

export const INDIA = 'in';
export const US = 'us';

export const CURRENCY_FORMATTER = {
  [INDIA]: {
    symbol: '₹',
    suffix: 'LPA',
    ctc_currency: 0,
    showSymbolDefault: false,
    multiplier: 100000, // 1 lakh
    unitName: 'lakh',
    name: 'INR',
  },
  [US]: {
    symbol: '$',
    suffix: ' per annum',
    ctc_currency: 2,
    showSymbolDefault: true,
    unit: 'k',
    unitName: 'thousand',
    multiplier: 1000, // 1k
    name: 'USD',
  },
};

export const HYDRATION_KEY = '__CAREERS_HUB__';

export const MAX_RESUMES = 5;
