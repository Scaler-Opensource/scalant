import React from 'react';
import FormHeader from "./FormHeader";
import { FileTextTwoTone, InfoCircleFilled } from '@ant-design/icons';

export default {
  title: 'FormHeader',
  component: FormHeader,
};

export const Step1 = () => (
  <FormHeader
    currentStep={1}
    icon={InfoCircleFilled}
    title="Required Details"
    totalSteps={2}
  />
);

export const Step2 = () => (
  <FormHeader
    currentStep={2}
    icon={FileTextTwoTone}
    title="Select which Resume to share for this job application"
    totalSteps={2}
  />
);
