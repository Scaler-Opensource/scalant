import ResumePreview from './ResumePreview';
import ResumeLayout from '../../layout/ResumeLayout';

export default {
  title: 'ResumePreview',
  component: ResumePreview,
};

const dummyResumeList = [
  { id: 1, name: 'Resume 1', default: true },
  { id: 2, name: 'Resume 2', default: false },
  { id: 3, name: 'Resume 3', default: false },
];

export const Default = () => (
  <ResumeLayout preview={<ResumePreview resumeList={dummyResumeList} />}>
    Dummy Content
  </ResumeLayout>
);
