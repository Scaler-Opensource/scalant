import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { ApplicationFormProvider } from '../../../contexts/ApplicationFormContext';
import { useCreateApplication } from '../../../hooks';
import { APPLICATION_STATUS } from '../../../utils/constants';
import ApplicationForm from '../ApplicationForm';
import FormHeader from '../FormHeader';

function FormStep({ jobProfileId, applicationData }) {
  const { applicationId, status } = applicationData;

  switch (status) {
    case APPLICATION_STATUS.APPLICATION_FORM:
      return (
        <ApplicationForm
          jobProfileId={jobProfileId}
          applicationId={applicationId}
          status={status}
        />
      );
    default:
      return null;
  }
}

function FormContainer({
  onClose,
  currentTab,
  jobProfileId,
  utmId,
  utmMedium,
  utmSource,
  onUploadFile,
}) {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useCreateApplication({
    jobProfileId,
    utmMedium,
    utmSource,
    currentTab,
    utmId,
  });

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(!!jobProfileId);
  }, [jobProfileId]);

  return (
    <ApplicationFormProvider onUploadFile={onUploadFile}>
      <Drawer
        closable={{ placement: 'end' }}
        loading={isLoading}
        onClose={handleClose}
        open={open}
        placement="bottom"
        height={600}
        title={
          <FormHeader
            currentStep={1}
            icon={InfoCircleFilled}
            title="Required Details"
            totalSteps={2}
          />
        }
      >
        <FormStep jobProfileId={jobProfileId} applicationData={data} />
      </Drawer>
    </ApplicationFormProvider>
  );
}

FormContainer.propTypes = {
  currentTab: PropTypes.string.isRequired,
  jobProfileId: PropTypes.number.isRequired,
  utmId: PropTypes.string,
  utmMedium: PropTypes.string,
  utmSource: PropTypes.string,
};

export default FormContainer;
