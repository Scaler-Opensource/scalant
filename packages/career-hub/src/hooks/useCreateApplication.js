import { useCallback, useEffect, useState } from 'react';
import { useCreateApplicationMutation } from '../services/createApplicationService';

const useCreateApplication = ({
  jobProfileId,
  utmMedium,
  utmSource,
  currentTab,
  utmId,
}) => {
  const [applicationId, setApplicationId] = useState(null);
  const [status, setStatus] = useState(null);

  const [createApplication, { isLoading, isError, error, isSuccess }] =
    useCreateApplicationMutation();

  const fetchApplication = useCallback(async () => {
    const response = await createApplication({
      jobProfileId,
      utmMedium,
      utmSource,
      currentTab,
      utmId,
    });
    setApplicationId(response?.data?.user_company?.id);
    setStatus(response?.data?.user_company?.status);
  }, [
    createApplication,
    jobProfileId,
    utmMedium,
    utmSource,
    currentTab,
    utmId,
  ]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  return {
    retry: fetchApplication,
    data: {
      status: status,
      applicationId: applicationId,
    },
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export default useCreateApplication;

