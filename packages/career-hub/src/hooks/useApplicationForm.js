import { useGetApplicationQuery } from '../services/createApplicationService';

const useApplicationForm = ({ jobProfileId, applicationId, status }) => {
  const {
    data: applicationData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetApplicationQuery(
    {
      applicationId: applicationId,
      jobProfileId: jobProfileId,
      status: status,
    },
    { skip: !applicationId || !status }
  );

  return {
    retry: refetch,
    data: applicationData?.details?.data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export default useApplicationForm;

