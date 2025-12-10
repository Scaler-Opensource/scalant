import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom hook to get filter state and build query parameters for job queries
 *
 * @returns {Object} Query parameters object ready to be passed to job query hooks
 */
export const useJobFilters = () => {
  const filterState = useSelector(
    (state) => state.scalantCareerHub?.filter || {}
  );

  const queryParams = useMemo(() => {
    const { filters, per_page, page_number, sortings, skip_expired_jobs } =
      filterState;

    return {
      ...(filters || {}),
      per_page,
      page_number,
      sortings,
      skip_expired_jobs,
    };
  }, [filterState]);

  return queryParams;
};

export default useJobFilters;
