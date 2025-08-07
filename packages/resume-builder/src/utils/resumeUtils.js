import { ADDITIONAL_PROFILES } from './constants';

export const getResumeProgram = (courseProduct) => {
  if (courseProduct === 'data_science') {
    return 'dsml';
  }
  return 'academy';
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
