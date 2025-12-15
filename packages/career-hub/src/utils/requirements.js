/**
 * Returns Experience text to be displayed on Job Card, Preview
 * header and Additional Eligibility section.
 * Does not include flexible experience parameters.
 * @param {number} minExperience - in months
 * @param {number} maxExperience - in months
 * @returns {string}
 * @example getExperienceText(12, 24) => '1y - 2y Experience'
 * @example getExperienceText(12, 0) => '1y+ Experience'
 * @example getExperienceText(15, 25) => '1y 3m - 2y 1m Experience'
 */
export const getExperienceText = (minExperience, maxExperience) => {
  const minExperienceYear = `${Math.floor(minExperience / 12)}y`;
  const minExperienceMonth =
    minExperience % 12 === 0 ? '' : ` ${minExperience % 12}m`;

  const prefix = `${minExperienceYear}${minExperienceMonth}`;

  if (!maxExperience) return `${prefix}+ Experience`;

  const maxExperienceYear = `${Math.floor(maxExperience / 12)}y`;
  const maxExperienceMonth =
    maxExperience % 12 === 0 ? '' : `${maxExperience % 12}m`;

  return `${prefix} - ${maxExperienceYear} ${maxExperienceMonth} Experience`;
};

/**
 * Notice Period text to be displayed in Job Card
 * @param {int} value - No of days for notice period
 * @returns {string} - Returns notice period text
 * @example getNoticePeriodText(0) => "Immediate"
 * @example getNoticePeriodText(30) => "30 days"
 * @example getNoticePeriodText(null) => "NA"
 */
export const getNoticePeriodText = (value) => {
  if (value === 0) return 'Immediate';
  if (value === null || value === undefined) return 'NA';
  return `${value} days`;
};

export const ADDITIONAL_ELIGIBILITY_MAPPING = {
  placed_mentee: () => 'CTC greater than 1.6x of current offer',
  diversity: () => 'Female Candidates Only',
  experience: ({ minExperience, maxExperience }) =>
    getExperienceText(minExperience, maxExperience),
  notice_period: ({ preferredNoticePeriod }) =>
    `${getNoticePeriodText(preferredNoticePeriod)} Notice Period`,
};
