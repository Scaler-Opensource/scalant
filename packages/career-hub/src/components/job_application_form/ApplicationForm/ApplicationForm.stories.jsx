import React from 'react';
import ApplicationForm from './ApplicationForm';

export default {
  title: 'Components/JobApplicationForms/ApplicationForm',
  component: ApplicationForm,
};

export const Default = () => (
  <ApplicationForm
    jobProfileId={49697}
    applicationId={123}
    status="application_form"
  />
);
