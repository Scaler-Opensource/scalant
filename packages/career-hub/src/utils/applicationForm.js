import {
  CTC,
  Linkedin,
  Company,
  Top5Skills,
  GradYear,
  CurrentLocation,
  NoticePeriod,
  PreferredLocation,
  TotalYearsOfExperience,
} from '../components/job_application_form/fields';
import { HYDRATION_KEY } from './constants';

// This is also the order in which fields will be rendered
const NON_CUSTOM_FIELD_MAP = {
  expected_ctc: 'expected_ctc',
  current_ctc: 'current_ctc',
  orgyear: 'orgyear',
  linkedin: 'linkedin',
  current_company: 'current_company',
  current_location: 'current_location',
  preferred_location: 'preferred_location',
  notice_period: 'notice_period',
  experience: 'experience',
  skills: 'skills',
};

export const CHECKBOX_FIELD_MAP = {
  preferred_location_anywhere_in_india: 'preferred_location_anywhere_in_india',
  notice_period_buyout: 'notice_period_buyout',
};

export const EXPERIENCE_FIELD_MAP = {
  years_of_experience: 'years_of_experience',
  months_of_experience: 'months_of_experience',
};

export const NON_CUSTOM_FIELDS = Object.values(NON_CUSTOM_FIELD_MAP);

export const NON_CUSTOM_FIELD_COMPONENT_MAPPING = {
  [NON_CUSTOM_FIELD_MAP.expected_ctc]: {
    component: CTC,
    props: {
      fieldName: 'expected_ctc',
      label: 'Expected CTC',
      fieldProps: {
        type: 'number',
        min: 0,
      },
    },
  },
  [NON_CUSTOM_FIELD_MAP.current_ctc]: {
    component: CTC,
    props: {
      fieldName: 'current_ctc',
      label: 'Current CTC',
      fieldProps: {
        type: 'number',
        min: 0,
      },
    },
  },
  [NON_CUSTOM_FIELD_MAP.current_location]: {
    component: CurrentLocation,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.current_location,
      label: 'Current Locations',
      fieldProps: {
        options: globalThis?.[HYDRATION_KEY]?.job_locations || [],
        mode: 'multiple',
      },
    },
  },
  [NON_CUSTOM_FIELD_MAP.preferred_location]: {
    component: PreferredLocation,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.preferred_location,
      label: 'Preferred Locations',
      fieldProps: {
        options: globalThis?.[HYDRATION_KEY]?.job_locations || [],
        mode: 'multiple',
      },
    },
  },
  [NON_CUSTOM_FIELD_MAP.orgyear]: {
    component: GradYear,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.orgyear,
      label: 'Graduation Year',
    },
  },
  [NON_CUSTOM_FIELD_MAP.linkedin]: {
    component: Linkedin,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.linkedin,
      label: 'LinkedIn profile',
      fieldProps: {
        type: 'url',
      },
    },
  },
  [NON_CUSTOM_FIELD_MAP.current_company]: {
    component: Company,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.current_company,
      label: 'Company',
    },
  },
  [NON_CUSTOM_FIELD_MAP.notice_period]: {
    component: NoticePeriod,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.notice_period,
      label: 'Notice Period',
    },
  },
  [NON_CUSTOM_FIELD_MAP.experience]: {
    component: TotalYearsOfExperience,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.experience,
      label: 'Total Years of Experience',
    },
  },
  [NON_CUSTOM_FIELD_MAP.skills]: {
    component: Top5Skills,
    props: {
      fieldName: NON_CUSTOM_FIELD_MAP.skills,
      label:
        'Select upto 5 primary skills that you want to share to recruiters',
    },
  },
};

export const YEAR_OPTIONS = new Array(50)
  .fill(0)
  .map((v, i) => ({ label: `${i} Years`, value: i }));

export const MONTH_OPTIONS = new Array(12)
  .fill(0)
  .map((v, i) => ({ label: `${i} Months`, value: i }));

export const NOTICE_PERIOD_OPTIONS = [
  { value: '-1', label: 'Currently Serving' },
  { value: '0', label: 'Immediately Available' },
  { value: '15', label: '15 Days' },
  { value: '30', label: '30 Days' },
  { value: '45', label: '45 Days' },
  { value: '60', label: '60 Days' },
  { value: '90', label: '90 Days' },
];

export const ANYWHERE_IN_INDIA = 'anywhere_in_india';

export const getSkillOptions = (skills) => {
  return (
    skills?.map((skill) => {
      const years =
        skill.proficiency_period?.years || skill.proficiencyPeriod?.years;
      const months =
        skill.proficiency_period?.months || skill.proficiencyPeriod?.months;

      return {
        label: `${skill.name} (${years}Y ${months}M)`,
        value: skill.id,
      };
    }) || []
  );
};

export const CUSTOM_FIELD_TYPE_MAP = {
  text: 'text',
  date_time: 'date_time',
  upload: 'upload',
  number: 'number',
};

export const getInitialFormData = (data) => {
  const initialFormData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      switch (key) {
        case NON_CUSTOM_FIELD_MAP.current_location:
          return [key, value?.split('/')];
        case NON_CUSTOM_FIELD_MAP.preferred_location:
          return [key, value?.split('/')];
        case NON_CUSTOM_FIELD_MAP.skills:
          return [key, value?.map((skill) => skill.skill_id)];
        default:
          return [key, value];
      }
    })
  );

  const noticePeriodFields = data[NON_CUSTOM_FIELD_MAP.notice_period] || {};
  const experienceFields = data[NON_CUSTOM_FIELD_MAP.experience] || {};

  Object.entries(noticePeriodFields).forEach(([key, value]) => {
    initialFormData[key] = value;
  });
  Object.entries(experienceFields).forEach(([key, value]) => {
    initialFormData[key] = value;
  });

  return initialFormData;
};

export const getInitialCustomFormData = (data) => {
  const initialFormData = data.reduce((acc, field) => {
    return {
      ...acc,
      [field.id]: field.response,
    };
  }, {});

  return initialFormData;
};
