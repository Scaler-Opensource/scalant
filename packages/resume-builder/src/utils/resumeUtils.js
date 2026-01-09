import { PROGRAM_TYPES } from './constants';

export const COURSE_PRODUCT = {
  DATA_SCIENCE: 'data_science',
  DEVOPS: 'devops',
  ACADEMY: 'academy',
};

export const getResumeProgram = (courseProduct) => {
  switch (courseProduct) {
    case COURSE_PRODUCT.DATA_SCIENCE:
      return PROGRAM_TYPES.DSML;
    case COURSE_PRODUCT.DEVOPS:
      return PROGRAM_TYPES.DEVOPS;
    default:
      return PROGRAM_TYPES.ACADEMY;
  }
};

export const formatExperience = (years, months, shortFormat = false) => {
  const yearLabel = shortFormat ? 'yrs' : 'years';
  const monthLabel = shortFormat ? 'Mon' : 'months';

  if (years === 0) {
    return `${months} ${monthLabel}`;
  }
  if (months === 0) {
    return `${years} ${yearLabel}`;
  }
  return `${years} ${yearLabel} ${months} ${monthLabel}`;
};
