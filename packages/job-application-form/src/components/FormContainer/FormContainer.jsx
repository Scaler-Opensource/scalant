import React, { useState } from 'react';
import { Drawer } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { APPLICATION_STATUS } from '../../utils/constants';
import { useCreateApplication } from '../../hooks';
import FormHeader from '../FormHeader';

function FormStep({ applicationData }) {
  const status = applicationData.status;

  switch (status) {
    case APPLICATION_STATUS.APPLICATION_FORM:
      return <>Application Form</>;
    default:
      return null;
  }
}

function ApplicationForm({
  currentTab,
  jobProfileId,
  utmId,
  utmMedium,
  utmSource,
}) {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useCreateApplication({
    jobProfileId,
    utmMedium,
    utmSource,
    currentTab,
    utmId,
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      closable={{ placement: 'end' }}
      loading={isLoading}
      onClose={handleClose}
      open={open}
      placement="bottom"
      title={
        <FormHeader
          currentStep={1}
          icon={InfoCircleFilled}
          title="Required Details"
          totalSteps={2}
        />
      }
    >
      <FormStep applicationData={data} />
    </Drawer>
  );
}

ApplicationForm.propTypes = {
  currentTab: PropTypes.string.isRequired,
  jobProfileId: PropTypes.number.isRequired,
  utmId: PropTypes.string,
  utmMedium: PropTypes.string,
  utmSource: PropTypes.string,
};

export default ApplicationForm;
