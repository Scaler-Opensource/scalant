import React, { createContext, useContext, useEffect, useState } from 'react';

export const ApplicationFormContext = createContext();

/**
 * FormProvider - Provides form data to child components
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function ApplicationFormProvider({
  children,
  onUploadFile = () => {
    console.log('Method not implemented. We should get it from MIT');
    return '';
  },
  onEditResume = () => {
    console.log('Method not implemented. We should get it from MIT');
    return '';
  },
  onAddResume = () => {
    console.log('Method not implemented. We should get it from MIT');
    return '';
  },
  stepName: initialStepName,
  jobProfileId,
  applicationId,
}) {
  const [formInstance, setFormInstance] = useState(null);
  const [stepName, setStepName] = useState(initialStepName);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    setStepName(initialStepName);
  }, [initialStepName]);

  return (
    <ApplicationFormContext.Provider
      value={{
        onUploadFile,
        formInstance,
        setFormInstance,
        stepName,
        setStepName,
        jobProfileId,
        applicationId,
        selectedResume,
        setSelectedResume,
        onEditResume,
        onAddResume,
      }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
}

export const useApplicationFormContext = () => {
  const context = useContext(ApplicationFormContext);

  if (!context) {
    throw new Error(
      'useApplicationForm must be used within a ApplicationFormProvider'
    );
  }

  return context;
};
