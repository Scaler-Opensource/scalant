import {
  UnlockOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  RiseOutlined,
} from '@ant-design/icons';

export const APPLICATION_STATUS = {
  APPLICATION_FORM: 'application_form',
};

export const SIDER_WIDTH = {
  PROFILE_DETAILS: '25%',
  JOB_DETAILS: '60%',
};

export const JOB_FILTER_TAGS = {
  relevant: {
    label: 'Unlocked Jobs',
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
