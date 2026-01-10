import React from 'react';
import FormContent from './FormContent';
import { APPLICATION_STATUS } from '../../utils/constants';

export default {
  title: 'Components/FormContent',
  component: FormContent,
};

export const Default = () => (
  <FormContent
    applicationData={{
      status: APPLICATION_STATUS.APPLICATION_FORM,
    }}
  />
);

