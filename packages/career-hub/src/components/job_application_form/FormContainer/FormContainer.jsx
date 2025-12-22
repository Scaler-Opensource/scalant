import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import {
  ApplicationFormProvider,
  useApplicationFormContext,
} from '../../../contexts/ApplicationFormContext';
import { useCreateApplication } from '../../../hooks';
import { APPLICATION_STATUS } from '../../../utils/constants';
import ApplicationForm from '../ApplicationForm';
import Footer from '../Footer';
import FormHeader from '../FormHeader';
import ResumeChoiceSelect from '../ResumeChoiceSelect';
import SuccessScreen from '../SuccessScreen';

function FormStep() {
  const { stepName } = useApplicationFormContext();

  switch (stepName) {
    case APPLICATION_STATUS.APPLICATION_FORM:
      return <ApplicationForm />;
    case APPLICATION_STATUS.RESUME_CHOICE_SELECT:
      return <ResumeChoiceSelect />;
    case APPLICATION_STATUS.SUCCESSFULLY_APPLIED:
      return <SuccessScreen />;
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
  onEditResume,
  onAddResume,
}) {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useCreateApplication({
    jobProfileId,
    utmMedium,
    utmSource,
    currentTab,
    utmId,
  });
  const { applicationId, status } = data || {};

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(!!jobProfileId);
  }, [jobProfileId]);

  return (
    <ApplicationFormProvider
      onUploadFile={onUploadFile}
      stepName={status}
      jobProfileId={jobProfileId}
      applicationId={applicationId}
      onEditResume={onEditResume}
      onAddResume={onAddResume}
    >
      <Drawer
        closable={false}
        loading={isLoading}
        open={open}
        placement="bottom"
        height={600}
        title={<FormHeader onClose={handleClose} />}
        footer={<Footer onCancel={handleClose} />}
      >
        <FormStep />
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
