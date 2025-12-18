import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { accumulateJobs, accumulateCompaniesMap } from '../utils/filter';

const useAccumulatedJobs = (
  data,
  isFetching = false,
  isLoading = false,
  currentTab = null
) => {
  const pageNumber = useSelector(
    (state) => state.scalantCareerHub?.filter?.page_number || 1
  );
  const processCounts = useSelector(
    (state) => state.scalantCareerHub?.dashboard?.processCounts || {}
  );

  const [accumulatedJobs, setAccumulatedJobs] = useState([]);
  const [accumulatedCompaniesMap, setAccumulatedCompaniesMap] = useState({});

  const currentJobs = useMemo(
    () => data?.jobs || data?.results || [],
    [data?.jobs, data?.results]
  );
  const currentCompaniesMap = useMemo(
    () => data?.companiesMap || {},
    [data?.companiesMap]
  );

  const countKey = useMemo(() => {
    if (!currentTab) return null;
    return currentTab;
  }, [currentTab]);

  const totalCount = useMemo(() => {
    // Prefer totalEntries coming from the API (new jobs_data envelope),
    // fall back to dashboard processCounts for legacy pages.
    if (typeof data?.totalEntries === 'number') {
      return data.totalEntries;
    }

    if (!countKey) return null;
    return processCounts[countKey] || 0;
  }, [countKey, processCounts, data?.totalEntries]);

  useEffect(() => {
    if (pageNumber === 1) {
      setAccumulatedJobs(currentJobs);
      setAccumulatedCompaniesMap(currentCompaniesMap);
    } else if (currentJobs.length > 0) {
      setAccumulatedJobs((prev) => accumulateJobs(prev, currentJobs));
      setAccumulatedCompaniesMap((prev) =>
        accumulateCompaniesMap(prev, currentCompaniesMap)
      );
    }
  }, [currentJobs, currentCompaniesMap, pageNumber]);

  const hasMore = useMemo(() => {
    if (totalCount === null) {
      return currentJobs.length > 0;
    }
    return accumulatedJobs.length < totalCount;
  }, [totalCount, accumulatedJobs.length, currentJobs.length]);

  const isFetchingMore = isFetching && pageNumber > 1;

  return {
    accumulatedJobs,
    accumulatedCompaniesMap,
    hasMore,
    isFetchingMore,
    isLoading: isLoading && pageNumber === 1,
  };
};

export default useAccumulatedJobs;
