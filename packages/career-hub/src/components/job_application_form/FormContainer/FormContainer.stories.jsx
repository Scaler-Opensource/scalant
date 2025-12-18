import React from 'react';
import FormContainer from './FormContainer';

export default {
  title: 'Components/JobApplicationForms/FormContainer',
  component: FormContainer,
};

export function Default() {
  return (
    <FormContainer
      jobProfileId={49697}
      currentTab="all"
    />
  );
}
