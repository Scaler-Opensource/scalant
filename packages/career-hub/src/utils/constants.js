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
