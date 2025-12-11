import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  useGetCompaniesQuery,
  useGetTitlesQuery,
  useGetExperienceSkillsQuery,
} from '../services/filterService';
import {
  clearCompanyOptions,
  clearTitleOptions,
  clearExperienceSkillOptions,
} from '../store/filterOptionsSlice';
import { useDebounce } from './useDebounce';

/**
 * Custom hook for managing async filter options (companies, titles, experience skills)
 * Handles RTK Query hooks, debounced search, and clearing options
 */
export const useAsyncFilterOptions = () => {
  const dispatch = useDispatch();

  // Search keywords state
  const [companyKeyword, setCompanyKeyword] = useState('');
  const [titleKeyword, setTitleKeyword] = useState('');
  const [experienceSkillKeyword, setExperienceSkillKeyword] = useState('');

  // RTK Query hooks
  const { isLoading: loadingCompanies, isFetching: fetchingCompanies } =
    useGetCompaniesQuery(companyKeyword, {
      skip: !companyKeyword || companyKeyword.length < 3,
    });

  const { isLoading: loadingTitles, isFetching: fetchingTitles } =
    useGetTitlesQuery(titleKeyword, {
      skip: !titleKeyword || titleKeyword.length < 3,
    });

  const {
    isLoading: loadingExperienceSkills,
    isFetching: fetchingExperienceSkills,
  } = useGetExperienceSkillsQuery(experienceSkillKeyword, {
    skip: !experienceSkillKeyword || experienceSkillKeyword.length < 2,
  });

  // Clear options when search is cleared
  useEffect(() => {
    if (!companyKeyword || companyKeyword.length < 3) {
      dispatch(clearCompanyOptions());
    }
  }, [companyKeyword, dispatch]);

  useEffect(() => {
    if (!titleKeyword || titleKeyword.length < 3) {
      dispatch(clearTitleOptions());
    }
  }, [titleKeyword, dispatch]);

  useEffect(() => {
    if (!experienceSkillKeyword || experienceSkillKeyword.length < 2) {
      dispatch(clearExperienceSkillOptions());
    }
  }, [experienceSkillKeyword, dispatch]);

  // Debounced search handlers
  const handleCompanySearchDebounced = useCallback((searchValue) => {
    setCompanyKeyword(searchValue);
  }, []);

  const handleCompanySearch = useDebounce(handleCompanySearchDebounced, 300);

  const handleTitleSearchDebounced = useCallback((searchValue) => {
    setTitleKeyword(searchValue);
  }, []);

  const handleTitleSearch = useDebounce(handleTitleSearchDebounced, 300);

  const handleExperienceSkillSearchDebounced = useCallback((searchValue) => {
    setExperienceSkillKeyword(searchValue);
  }, []);

  const handleExperienceSkillSearch = useDebounce(
    handleExperienceSkillSearchDebounced,
    300
  );

  return {
    // Search handlers
    handleCompanySearch,
    handleTitleSearch,
    handleExperienceSkillSearch,
    // Loading states
    loadingCompanies: loadingCompanies || fetchingCompanies,
    loadingTitles: loadingTitles || fetchingTitles,
    loadingExperienceSkills:
      loadingExperienceSkills || fetchingExperienceSkills,
  };
};
