import React from 'react';
import PropTypes from 'prop-types';
import { useApplicationForm } from '../../hooks';
import FormContent from '../FormContent';

function ApplicationForm({ jobProfileId, applicationId, status }) {
  const { data, isLoading } = useApplicationForm({
    jobProfileId,
    applicationId,
    status,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <FormContent applicationData={data || { status }} />;
}

ApplicationForm.propTypes = {
  jobProfileId: PropTypes.number.isRequired,
  applicationId: PropTypes.number,
  status: PropTypes.string,
};

export default ApplicationForm;

