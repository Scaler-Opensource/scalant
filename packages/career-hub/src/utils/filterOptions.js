// Filter options utility functions
// Similar to myinterviewtrainer/frontend/src/modules/job_tracker/utils/filter_options.js

// Helper function to convert array to select options format
// Similar to convertToSelectOption in myinterviewtrainer
export const convertToSelectOption = (array, key, value = key) => {
  if (!array || !Array.isArray(array)) return [];
  return array.map((item) => ({
    key: item[key],
    value: item[value],
  }));
};

const minCtcOptions = new Array(5)
  .fill(1)
  .map((v, i) => ({ value: (v + i) * 5, label: `>= ${(v + i) * 5} Lakhs` }));

const minCtcUSOptions = [
  { value: 20, label: '>= 20K' },
  { value: 30, label: '>= 30K' },
  { value: 50, label: '>= 50K' },
  { value: 75, label: '>= 75K' },
  { value: 100, label: '>= 100K' },
];

const mockInterviewSkillOptions = [
  { value: 0, label: 'Must to Have' },
  { value: 1, label: 'Good to Have' },
  { value: 2, label: 'Bar Raiser' },
  { value: 3, label: 'Must to Have (Eligibility)' },
];

const datePostedOnOptions = [
  { value: 1, label: 'Last 24 hours' },
  { value: 3, label: 'Last 3 days' },
  { value: 7, label: 'Last 7 days' },
  { value: 30, label: 'Last 30 days' },
];

const seniorityLevelOptions = [
  { value: 202948, label: 'Fresher' },
  { value: 202949, label: 'Entry - Mid' },
  { value: 202950, label: 'Mid - Senior' },
  { value: 202951, label: 'Senior' },
];

const stipendOptions = [
  { value: 10000, label: '>= 10K' },
  { value: 20000, label: '>= 20K' },
  { value: 30000, label: '>= 30K' },
  { value: 40000, label: '>= 40K' },
  { value: 50000, label: '>= 50K' },
  { value: 60000, label: '>= 60K' },
];

const internshipDurationOptions = [
  { value: 3, label: '>= 3 months' },
  { value: 6, label: '>= 6 months' },
  { value: 9, label: '>= 9 months' },
  { value: 12, label: '>= 12 months' },
];

const jobTypeOptions = [
  { value: 'Full time roles', key: 'full_time' },
  { value: 'Internship roles', key: 'internship' },
];

const MONTH_OPTIONS = new Array(3).fill(1).map((v, i) => ({
  value: ((v + i + 1) * 30).toString(),
  label: `greater than ${v + i + 1} Months`,
}));

const NOTICE_PERIOD_OPTIONS = [
  {
    value: 'not filled',
    label: 'Not Available',
  },
  {
    value: '0',
    label: '0 Days',
  },
  {
    value: '15',
    label: 'greater than 15 Days',
  },
  {
    value: '30',
    label: 'greater than 30 Days',
  },
  {
    value: '45',
    label: 'greater than 45 Days',
  },
  ...MONTH_OPTIONS,
];

const getMinCtcOptions = (isUS) => (isUS ? minCtcUSOptions : minCtcOptions);

// Helper function to convert proficiency mapping to options
export const getProficiencyOptions = (proficiencyMapping) => {
  if (!proficiencyMapping) return mockInterviewSkillOptions;
  return Object.entries(proficiencyMapping).map(([label, value]) => ({
    value,
    label,
  }));
};

// Helper function to convert merit based skills to options
export const getMeritBasedSkillOptions = (meritBasedSkills) => {
  if (!meritBasedSkills || !Array.isArray(meritBasedSkills)) return [];
  return meritBasedSkills.map((skill) => ({
    value: skill.id,
    label: skill.title,
  }));
};

// Helper function to convert skill_data to experience skill options
export const getExperienceSkillOptions = (skillData) => {
  if (!skillData || !Array.isArray(skillData)) return [];
  return skillData.map((skill) => ({
    value: skill.subtopic_id,
    label: skill.subtopic,
    type: skill.eligible_class || 'SubTopic',
  }));
};

export default {
  minCtcOptions,
  minCtcUSOptions,
  getMinCtcOptions,
  mockInterviewSkillOptions,
  datePostedOnOptions,
  seniorityLevelOptions,
  stipendOptions,
  internshipDurationOptions,
  jobTypeOptions,
  NOTICE_PERIOD_OPTIONS,
  convertToSelectOption,
  getProficiencyOptions,
  getMeritBasedSkillOptions,
  getExperienceSkillOptions,
};
