import React, { createContext, useContext, useState } from 'react';

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
}) {
  const [defaultFormData, setDefaultFormData] = useState({});
  const [customFormData, setCustomFormData] = useState([]);

  const updateCustomField = (id, response) => {
    setCustomFormData((prev) => [
      ...prev.filter((field) => field.id !== id),
      { id, response },
    ]);
  };

  const updateDefaultField = (fieldName, value) => {
    setDefaultFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <ApplicationFormContext.Provider
      value={{
        defaultFormData,
        updateDefaultField,
        setDefaultFormData,
        customFormData,
        updateCustomField,
        setCustomFormData,
        onUploadFile,
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
