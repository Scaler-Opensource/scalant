import { useDispatch, useSelector } from 'react-redux';
import { useUpdateResumeDetailsMutation } from '../services/resumeBuilderApi';
import { patchResumeData } from '../store/resumeBuilderSlice';

export const useResumeSave = () => {
    const dispatch = useDispatch();
    const resumeId = useSelector(
        (state) => state.scalantResumeBuilder.resumeBuilder.resumeData?.resume_details?.id
    );

    const [updateResumeDetails, { isLoading, error }] = useUpdateResumeDetailsMutation();

    const saveResume = async ({ payload, optimisticData, onSuccess, onError }) => {
        if (!resumeId) {
            console.error('No resume ID found');
            return;
        }

        // Optimistic Update: Patch Redux immediately
        if (optimisticData) {
            dispatch(patchResumeData(optimisticData));
        }

        try {
            const response = await updateResumeDetails({
                resumeId,
                payload,
            }).unwrap();

            // Merge backend response (with real IDs) into Redux
            // Use optional chaining to avoid crash if response is null
            const backendData = response?.data || response;

            if (backendData) {
                dispatch(patchResumeData(backendData));
            }

            const finalData = backendData || optimisticData || {};

            if (onSuccess) onSuccess(finalData);
            return finalData;
        } catch (err) {
            console.error('Save failed', err);
            // Optionally handle revert here if we tracked previous state
            if (onError) onError(err);
            throw err;
        }
    };

    return { saveResume, isLoading, error };
};
