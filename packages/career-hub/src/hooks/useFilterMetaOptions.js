import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import filterOptions from '../utils/filterOptions';
import { convertToSelectOption } from '../utils/filterOptions';

/**
 * Custom hook for getting filter options from metaData and static options
 * Returns all the options needed for filter form fields
 */
export const useFilterMetaOptions = () => {
  const metaData = useSelector(
    (state) => state.scalantCareerHub.metaData?.meta || {}
  );

  // Job Types - static options
  const jobTypes = useMemo(() => filterOptions.jobTypeOptions, []);

  // Functions - from metaData
  const functions = useMemo(
    () => convertToSelectOption(metaData.jobCategories || [], 'value', 'label'),
    [metaData.jobCategories]
  );

  // Seniority Levels - from metaData
  const seniorityLevels = useMemo(
    () =>
      convertToSelectOption(metaData.seniorityLevels || [], 'value', 'label'),
    [metaData.seniorityLevels]
  );

  // Company Categories - from metaData
  const companyCategories = useMemo(
    () =>
      convertToSelectOption(metaData.companyCategories || [], 'value', 'label'),
    [metaData.companyCategories]
  );

  // Locations - from metaData
  const locations = useMemo(
    () => convertToSelectOption(metaData.jobLocations || [], 'label'),
    [metaData.jobLocations]
  );

  // Merit Based Skills - from metaData
  const mbeSkills = useMemo(
    () => convertToSelectOption(metaData.meritBasedSkills || [], 'id', 'title'),
    [metaData.meritBasedSkills]
  );

  // Static options
  const ctcRanges = useMemo(() => filterOptions.getMinCtcOptions(false), []);
  const stipendRanges = useMemo(() => filterOptions.stipendOptions, []);
  const durationRanges = useMemo(
    () => filterOptions.internshipDurationOptions,
    []
  );
  const noticePeriods = useMemo(() => filterOptions.NOTICE_PERIOD_OPTIONS, []);
  const datePostedOptions = useMemo(
    () => filterOptions.datePostedOnOptions,
    []
  );
  const skillRatings = useMemo(
    () => filterOptions.mockInterviewSkillOptions,
    []
  );

  return {
    jobTypes,
    functions,
    seniorityLevels,
    companyCategories,
    locations,
    mbeSkills,
    ctcRanges,
    stipendRanges,
    durationRanges,
    noticePeriods,
    datePostedOptions,
    skillRatings,
  };
};

