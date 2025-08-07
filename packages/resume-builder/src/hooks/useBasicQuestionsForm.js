import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeForm } from '../store/formStoreSlice';

const FORM_ID = 'basicQuestions';

const initialFormData = {
  totalWorkExperience: {
    yearsExperience: 0,
    monthsExperience: 0,
  },
  totalWorkExperienceInTech: {
    yearsExperienceInTech: 0,
    monthsExperienceInTech: 0,
  },
  currentJobRole: '',
};

export const useBasicQuestionsForm = (basicQuestionsData, jobRoles = []) => {
  const dispatch = useDispatch();
  const isFormInitialized = useSelector(
    (state) => state.scalantResumeBuilder.formStore.initializedForms[FORM_ID]
  );
  
  const initialValues = useMemo(
    () => {
      if (!basicQuestionsData) {
        return initialFormData;
      }
      
      // Check if job title exists in jobRoles list
      const jobTitleExists = jobRoles.some(role => role.value === basicQuestionsData?.job_title);
      
      return {
        totalWorkExperience: {
          yearsExperience: Math.floor(
            basicQuestionsData?.total_experience / 12
          ),
          monthsExperience: basicQuestionsData?.total_experience % 12,
        },
        totalWorkExperienceInTech: {
          yearsExperienceInTech: Math.floor(
            basicQuestionsData?.experience / 12
          ),
          monthsExperienceInTech: basicQuestionsData?.experience % 12,
        },
        currentJobRole: jobTitleExists ? basicQuestionsData?.job_title : '',
      };
    },
    [basicQuestionsData, jobRoles]
  );

  useEffect(() => {
    if (!isFormInitialized) {
      dispatch(
        initializeForm({
          formId: FORM_ID,
          initialData: initialValues,
        })
      );
    }
  }, [dispatch, isFormInitialized, initialValues]);

  return { initialValues, FORM_ID };
};
