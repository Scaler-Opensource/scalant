import CustomForm from './CustomForm';
import ResumeLayout from '../../layout/ResumeLayout';

export default {
  title: 'CustomForm',
  component: CustomForm,
};

export const Default = () => {
  return (
    <ResumeLayout>
      <CustomForm />
    </ResumeLayout>
  );
};
