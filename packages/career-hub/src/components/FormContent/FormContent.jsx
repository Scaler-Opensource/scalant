import React from 'react';
import PropTypes from 'prop-types';
import { APPLICATION_STATUS } from '../../utils/constants';

function FormContent({ applicationData }) {
  const status = applicationData.status;

  switch (status) {
    case APPLICATION_STATUS.APPLICATION_FORM:
      return <>Application Form</>;
    default:
      return null;
  }
}

FormContent.propTypes = {
  applicationData: PropTypes.object.isRequired,
};

export default FormContent;

