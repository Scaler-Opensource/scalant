import React from 'react';
import PropTypes from 'prop-types';

import FormContent from '../FormContent';

function ApplicationForm() {
  const { data, isLoading } = useApplicationForm({
    jobProfileId,
    applicationId,
    status,
  });
}

export default ApplicationForm;
