import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook to get filter state and build query parameters for job queries
 *
 * @returns {Object} Query parameters object ready to be passed to job query hooks
 * Structure: { per_page, tab, filters: {...}, sortings, page_number, skip_expired_jobs }
 */
export const useJobFilters = () => {
  const filterState = useSelector(
    (state) => state.scalantCareerHub?.filter || {}
  );

  const queryParams = useMemo(() => {
    const { filters, per_page, tab, page_number, sortings, skip_expired_jobs } =
      filterState;

    return {
      per_page,
      tab,
      filters: filters || { keyword: '' },
      sortings,
      page_number,
      skip_expired_jobs,
    };
  }, [filterState]);

  return queryParams;
};

export default useJobFilters;
