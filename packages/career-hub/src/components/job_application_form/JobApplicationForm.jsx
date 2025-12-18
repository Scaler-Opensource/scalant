import React from 'react';
import FormContainer from './FormContainer';
import { useJobPreview } from '../../contexts';

const JobApplicationForm = ({ currentTab, onUploadFile }) => {
  const { activeApplicationId, setActiveApplicationId } = useJobPreview();

  const handleClose = () => {
    setActiveApplicationId(null);
  };

  if (!activeApplicationId) {
    return null;
  }

  return (
    <FormContainer
      onUploadFile={onUploadFile}
      jobProfileId={activeApplicationId}
      onClose={handleClose}
      currentTab={currentTab}
    />
  );
};

export default JobApplicationForm;
